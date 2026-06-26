export type { ConversionContent } from "./types";

import { jpgConversions } from "./jpg-conversions";
import { pngConversions } from "./png-conversions";
import { webpConversions } from "./webp-conversions";
import { avifConversions } from "./avif-conversions";
import { gifConversions } from "./gif-conversions";
import { heicConversions } from "./heic-conversions";
import type { ConversionContent } from "./types";

export const CONVERSION_CONTENT: Record<string, ConversionContent> = {
  ...jpgConversions,
  ...pngConversions,
  ...webpConversions,
  ...avifConversions,
  ...gifConversions,
  ...heicConversions,
};

export function getConversionContent(
  slug: string
): ConversionContent | undefined {
  return CONVERSION_CONTENT[slug];
}
