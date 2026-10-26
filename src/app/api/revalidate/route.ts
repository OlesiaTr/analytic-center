import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// Sanity webhook (on publish / unpublish / delete): the projection sends
// `{ _type }`, and every query is tagged with the type it reads
// (src/lib/sanity/content.ts), so only those pages refresh.

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: 'SANITY_REVALIDATE_SECRET is not set' },
      { status: 500 },
    );
  }

  // `true` waits for Content Lake to be consistent before pages re-query.
  const { isValidSignature, body } = await parseBody<{ _type?: string }>(
    request,
    secret,
    true,
  );

  if (!isValidSignature) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }
  if (!body?._type) {
    return NextResponse.json({ message: 'Missing _type' }, { status: 400 });
  }

  // 'max': serve the stale page while the fresh one renders in the background.
  revalidateTag(body._type, 'max');
  return NextResponse.json({ revalidated: body._type });
}
