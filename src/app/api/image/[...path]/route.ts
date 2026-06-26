import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  // Reconstruct full path from catch-all segments (e.g., ['folder1', 'folder2', 'file.png'] -> 'folder1/folder2/file.png')
  const { path } = await params;
  const fullPath = path?.join('/') || '';

  if (!fullPath) {
    return new Response('Path required', { status: 400 });
  }

  // Extract bucket name from query params (e.g., ?bucket=output-images), with fallback
  const url = new URL(request.url);
  const bucket = url.searchParams.get('from') || 'output-images';

  // Generate a signed URL valid for 30 days (adjust as needed)
  const { data, error } = await supabase
    .storage
    .from(bucket)
    .createSignedUrl(fullPath, 60 * 60 * 24 * 30);

  if (error || !data?.signedUrl) {
    return new Response('Image not found', { status: 404 });
  }

  // Fetch image from signed URL
  const imageResponse = await fetch(data.signedUrl);

  if (!imageResponse.ok) {
    return new Response('Could not fetch image', { status: 502 });
  }

  // Prepare headers
  const headers = new Headers();
  headers.set('Content-Type', imageResponse.headers.get('content-type') || '');
  headers.set('Cache-Control', 'public, max-age=2592000, immutable'); // 30 days

  // Stream the image bytes to the response
  return new Response(imageResponse.body, { headers, status: 200 });
}