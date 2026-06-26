export interface ImageFormat {
  key: string;
  label: string;
  fullName: string;
  description: string;
  isPopular: boolean;
}

export const IMAGE_FORMATS: ImageFormat[] = [
  {
    key: "jpg",
    label: "JPG",
    fullName: "Joint Photographic Experts Group",
    description:
      "JPG is the most widely used image format for photographs and web images. It uses lossy compression to reduce file sizes while maintaining acceptable visual quality, making it ideal for sharing and storing photos.",
    isPopular: true,
  },
  {
    key: "png",
    label: "PNG",
    fullName: "Portable Network Graphics",
    description:
      "PNG is a raster graphics format that supports lossless compression and transparency. It preserves image quality perfectly through compression, making it ideal for graphics, logos, and images requiring transparent backgrounds.",
    isPopular: true,
  },
  {
    key: "webp",
    label: "WEBP",
    fullName: "Web Picture Format",
    description:
      "WebP is a modern image format developed by Google that provides superior lossy and lossless compression for web images. It offers significantly smaller file sizes compared to JPG and PNG while maintaining excellent quality.",
    isPopular: true,
  },
  {
    key: "avif",
    label: "AVIF",
    fullName: "AV1 Image File Format",
    description:
      "AVIF is a next-generation image format based on the AV1 video codec. It offers exceptional compression efficiency, delivering high-quality images at significantly smaller file sizes than JPG, PNG, or even WebP.",
    isPopular: true,
  },
  {
    key: "gif",
    label: "GIF",
    fullName: "Graphics Interchange Format",
    description:
      "GIF is a bitmap image format that supports animation and a limited color palette of 256 colors. It is widely used for short animations, simple graphics, and memes across the web.",
    isPopular: true,
  },
  {
    key: "bmp",
    label: "BMP",
    fullName: "Bitmap Image File",
    description:
      "BMP is an uncompressed raster image format that stores image data pixel by pixel. It preserves full image quality without any compression artifacts, resulting in large file sizes but perfect fidelity.",
    isPopular: false,
  },
  {
    key: "tiff",
    label: "TIFF",
    fullName: "Tagged Image File Format",
    description:
      "TIFF is a flexible image format commonly used in professional photography and publishing. It supports lossless compression and high color depths, making it ideal for archival and print-quality images.",
    isPopular: false,
  },
  {
    key: "ico",
    label: "ICO",
    fullName: "Icon File Format",
    description:
      "ICO is an image format used for icons in Microsoft Windows and web favicons. It can contain multiple image sizes and color depths within a single file, allowing icons to display correctly at various resolutions.",
    isPopular: false,
  },
  {
    key: "svg",
    label: "SVG",
    fullName: "Scalable Vector Graphics",
    description:
      "SVG is an XML-based vector image format that scales to any size without losing quality. It is ideal for logos, icons, and illustrations on the web, offering small file sizes and infinite scalability.",
    isPopular: false,
  },
  {
    key: "heic",
    label: "HEIC",
    fullName: "High Efficiency Image Container",
    description:
      "HEIC is a modern image format used by Apple devices that provides superior compression compared to JPG. It stores high-quality photos at roughly half the file size, making it efficient for mobile photography.",
    isPopular: true,
  },
];

export const FORMAT_MAP: Record<string, ImageFormat> = Object.fromEntries(
  IMAGE_FORMATS.map((f) => [f.key, f])
);

export const POPULAR_FORMATS = IMAGE_FORMATS.filter((f) => f.isPopular);

export function getAllConversionSlugs(): string[] {
  const slugs: string[] = [];
  for (const input of POPULAR_FORMATS) {
    for (const output of POPULAR_FORMATS) {
      if (input.key !== output.key) {
        slugs.push(`${input.key}-to-${output.key}`);
      }
    }
  }
  return slugs;
}

const POPULAR_KEYS = new Set(POPULAR_FORMATS.map((f) => f.key));

export function parseConversionSlug(
  slug: string
): { input: ImageFormat; output: ImageFormat } | null {
  const match = slug.match(/^([a-z]+)-to-([a-z]+)$/);
  if (!match) return null;
  const input = FORMAT_MAP[match[1]];
  const output = FORMAT_MAP[match[2]];
  if (!input || !output) return null;
  if (!POPULAR_KEYS.has(input.key) || !POPULAR_KEYS.has(output.key)) return null;
  if (input.key === output.key) return null;
  return { input, output };
}
