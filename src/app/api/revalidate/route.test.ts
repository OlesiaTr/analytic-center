// @vitest-environment node
import { encodeSignatureHeader, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const revalidateTag = vi.hoisted(() => vi.fn());
vi.mock('next/cache', () => ({ revalidateTag }));

const { POST } = await import('./route');

const SECRET = 'test-secret';

const request = async (body: object, secret = SECRET) => {
  const payload = JSON.stringify(body);
  const signature = await encodeSignatureHeader(payload, Date.now(), secret);
  return new NextRequest('http://localhost/api/revalidate', {
    method: 'POST',
    body: payload,
    headers: { [SIGNATURE_HEADER_NAME]: signature },
  });
};

beforeEach(() => {
  vi.stubEnv('SANITY_REVALIDATE_SECRET', SECRET);
});

afterEach(() => {
  vi.unstubAllEnvs();
  revalidateTag.mockClear();
});

const respond = (req: NextRequest) => POST(req);

// Valid requests wait 3 s in parseBody (Content Lake consistency).
describe('POST /api/revalidate', { timeout: 10_000 }, () => {
  it('revalidates the tag of the published document type', async () => {
    const response = await respond(await request({ _type: 'news' }));
    expect(response.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledWith('news', 'max');
  });

  it('rejects a request signed with another secret', async () => {
    const response = await respond(
      await request({ _type: 'news' }, 'wrong-secret'),
    );
    expect(response.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it('rejects a body without _type', async () => {
    const response = await respond(await request({}));
    expect(response.status).toBe(400);
  });
});
