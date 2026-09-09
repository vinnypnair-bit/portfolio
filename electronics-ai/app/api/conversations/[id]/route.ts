import { NextRequest, NextResponse } from 'next/server';
import {
  getMessagesForConversation,
  renameConversation,
  deleteConversation,
  getConversationById,
} from '@/lib/db/storage';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const conversation = await getConversationById(id);

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    const messages = await getMessagesForConversation(id);
    return NextResponse.json({ conversation, messages });
  } catch (error) {
    console.error('Error fetching conversation messages:', error);
    return NextResponse.json(
      { error: 'Internal Server Error loading messages' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title } = body;

    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Field "title" is required' }, { status: 400 });
    }

    const updated = await renameConversation(id, title);
    if (!updated) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    return NextResponse.json({ conversation: updated });
  } catch (error) {
    console.error('Error renaming conversation:', error);
    return NextResponse.json(
      { error: 'Internal Server Error updating conversation' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await deleteConversation(id);

    if (!success) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    return NextResponse.json(
      { error: 'Internal Server Error deleting conversation' },
      { status: 500 }
    );
  }
}
