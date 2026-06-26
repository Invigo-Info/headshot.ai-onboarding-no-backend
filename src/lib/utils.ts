import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Download a file from a URL
 */
export function downloadFile(url: string, filename: string) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Download multiple files with a delay between each download
 */
export async function downloadMultipleFiles(
  files: { url: string; filename: string }[],
  delayMs: number = 500
) {
  for (let i = 0; i < files.length; i++) {
    const { url, filename } = files[i]
    downloadFile(url, filename)
    
    // Add delay between downloads (except for the last one)
    if (i < files.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs))
    }
  }
}

/**
 * Format filename for download, removing special characters
 */
export function formatFilename(name: string, index?: number, extension: string = 'png'): string {
  const cleanName = name.replace(/[^a-zA-Z0-9\s-_]/g, '').trim()
  const indexSuffix = index !== undefined ? `_${index + 1}` : ''
  return `${cleanName}${indexSuffix}.${extension}`
}

export function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array]
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
	}
	return shuffled
}


export const toDateStr = (d: Date) => d.toISOString().slice(0, 10);

export const addYears = (d: Date, years: number) => {
  const x = new Date(d);
  x.setFullYear(x.getFullYear() + years);
  return x;
};

export function isNew(createdAt: string) {
  return Date.now() - new Date(createdAt).getTime() < 48 * 60 * 60 * 1000; // 48 hours
}
