/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/retry429.ts

/**
 * Retry function with exponential backoff for handling 429 (rate limit) and 5xx errors
 * Specifically designed for Replicate API rate limits
 * 
 * @param fn - The function to retry
 * @param options - Retry configuration options
 * @returns The result of the function call
 */
export async function with429Retry<T>(
  fn: () => Promise<T>,
  { 
    maxRetries = 4, 
    baseMs = 4000,  // 4 seconds minimum base delay for Replicate
    maxMs = 30000   // 30 seconds max delay
  }: { 
    maxRetries?: number; 
    baseMs?: number; 
    maxMs?: number;
  } = {}
): Promise<T> {
  let attempt = 0;
  
  while (true) {
    try {
      return await fn();
    } catch (err: any) {
      // Extract status code from various error formats
      const status = err?.status ?? err?.response?.status ?? err?.statusCode;
      
      // Only retry on 429 (rate limit) or 5xx (server errors)
      // Don't retry on 4xx errors (except 429)
      if (status !== 429 && (status < 500 || status >= 600)) {
        throw err;
      }
      
      // Check if we've exhausted retries
      if (attempt >= maxRetries) {
        throw err;
      }
      
      // Calculate exponential backoff delay
      let delay = Math.min(maxMs, baseMs * Math.pow(2, attempt));
      
      // Check for Retry-After header (standard HTTP header)
      const retryAfterHdr = err?.response?.headers?.["retry-after"] ?? 
                           err?.headers?.["retry-after"];
      if (retryAfterHdr) {
        const seconds = parseInt(retryAfterHdr, 10);
        if (!Number.isNaN(seconds) && seconds > 0) {
          delay = Math.max(delay, seconds * 1000);
        }
      }
      
      // Parse Replicate-specific error message for wait time
      // Format: "Request was throttled. Expected available in X second(s)."
      const detail: string | undefined = 
        err?.response?.data?.detail || 
        err?.detail || 
        err?.message;
      
      if (detail) {
        // Match patterns like "Expected available in 1 second" or "resets in ~5s"
        const patterns = [
          /Expected available in (\d+)\s*seconds?/i,
          /resets in ~?(\d+)s/i,
          /try again in (\d+)\s*seconds?/i
        ];
        
        for (const pattern of patterns) {
          const match = detail.match(pattern);
          if (match) {
            const waitSeconds = parseInt(match[1], 10);
            if (!Number.isNaN(waitSeconds) && waitSeconds > 0) {
              delay = Math.max(delay, waitSeconds * 1000);
              break;
            }
          }
        }
      }
      
      // Add jitter (0-25% of delay) to prevent thundering herd
      const jitter = Math.random() * delay * 0.25;
      const totalDelay = delay + jitter;
      
      // Log retry attempt (helpful for debugging, especially on Vercel)
      console.warn(
        `Rate limit hit (attempt ${attempt + 1}/${maxRetries}). ` +
        `Retrying in ${Math.round(totalDelay / 1000)}s...`
      );
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, totalDelay));
      
      attempt += 1;
    }
  }
}
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // lib/retry429.ts
// export async function with429Retry<T>(
//     fn: () => Promise<T>,
//     { maxRetries = 4, baseMs = 4000, maxMs = 15000 }: { maxRetries?: number; baseMs?: number; maxMs?: number } = {}
//   ): Promise<T> {
//     let attempt = 0;
//     while (true) {
//       try {
//         return await fn();
//       } catch (err: any) {
//         const status = err?.status ?? err?.response?.status;
//         if (status !== 429 && status < 500) throw err;
  
//         if (attempt >= maxRetries) throw err;
  
//         let delay = Math.min(maxMs, baseMs * 2 ** attempt);
//         const retryAfterHdr = err?.response?.headers?.["retry-after"];
//         if (retryAfterHdr) {
//           const s = parseInt(retryAfterHdr, 10);
//           if (!Number.isNaN(s)) delay = Math.max(delay, s * 1000);
//         }
//         const detail: string | undefined = err?.response?.data?.detail || err?.message;
//         const m = detail?.match(/resets in ~(\d+)s/i);
//         if (m) delay = Math.max(delay, parseInt(m[1], 10) * 1000);
  
//         const jitter = Math.random() * delay * 0.5;
//         await new Promise(r => setTimeout(r, delay + jitter));
//         attempt += 1;
//       }
//     }
//   }
  
