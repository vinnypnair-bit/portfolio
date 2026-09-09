import { NextRequest, NextResponse } from 'next/server';
import {
  getConversationsForSession,
  createConversation,
} from '@/lib/db/storage';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId') || 'anonymous-session';
    const componentId = searchParams.get('componentId') || undefined;

    const conversations = await getConversationsForSession(sessionId, componentId);
    return NextResponse.json({ conversations });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json(
      { error: 'Internal Server Error loading conversations' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const sessionId = body?.sessionId || 'anonymous-session';
    const componentId = body?.componentId || 'resistor';
    const title = body?.title;

    const conversation = await createConversation(sessionId, componentId, title);
    return NextResponse.json({ conversation });
  } catch (error) {
    console.error('Error creating conversation:', error);
    return NextResponse.json(
      { error: 'Internal Server Error creating conversation' },
      { status: 500 }
    );
  }
}
