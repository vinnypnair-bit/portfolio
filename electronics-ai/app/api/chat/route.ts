import { NextRequest, NextResponse } from 'next/server';
import { executeAITutor } from '@/lib/ai/tutorEngine';
import { addMessageToConversation } from '@/lib/db/storage';
import { ChatHistoryMessage } from '@/lib/ai/types';

// In-memory rate limiting map: IP -> { count, startTime }
const rateLimitMap = new Map<string, { count: number; startTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 30; // Max 30 requests per minute per IP

export async function POST(req: NextRequest) {
  try {
    // Basic IP-based Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    const now = Date.now();
    const rateData = rateLimitMap.get(ip) || { count: 0, startTime: now };

    if (now - rateData.startTime > RATE_LIMIT_WINDOW_MS) {
      rateData.count = 1;
      rateData.startTime = now;
    } else {
      rateData.count += 1;
    }

    rateLimitMap.set(ip, rateData);

    if (rateData.count > MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment before sending more queries.' },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid JSON request payload' },
        { status: 400 }
      );
    }

    const { query, componentId, history, conversationId } = body as {
      query: string;
      componentId?: string;
      history?: ChatHistoryMessage[];
      conversationId?: string;
    };

    if (!query || typeof query !== 'string' || !query.trim()) {
      return NextResponse.json(
        { error: 'Invalid request: "query" string field is required' },
        { status: 400 }
      );
    }

    const trimmedQuery = query.trim();

    if (trimmedQuery.length > 1000) {
      return NextResponse.json(
        { error: 'Query is too long. Maximum allowed length is 1000 characters.' },
        { status: 400 }
      );
    }

    // Save user message to persistent storage if conversationId provided
    if (conversationId) {
      await addMessageToConversation(conversationId, 'user', trimmedQuery);
    }

    const tutorResponse = await executeAITutor({
      query: trimmedQuery,
      componentId,
      history,
    });

    // Save AI response to persistent storage if conversationId provided
    if (conversationId) {
      await addMessageToConversation(conversationId, 'assistant', tutorResponse.reply);
    }

    return NextResponse.json({
      ...tutorResponse,
      conversationId,
    });
  } catch (error) {
    console.error('Error handling AI Tutor API request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error processing engineering tutor request' },
      { status: 500 }
    );
  }
}
