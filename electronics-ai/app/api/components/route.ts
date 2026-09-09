import { NextRequest, NextResponse } from 'next/server';
import { filterComponents, getAllComponents } from '@/data/components';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || 'All';
  const difficulty = searchParams.get('difficulty') || 'All';
  const query = searchParams.get('query') || '';

  const results = filterComponents(category, difficulty, query);

  return NextResponse.json({
    total: getAllComponents().length,
    count: results.length,
    components: results,
  });
}
