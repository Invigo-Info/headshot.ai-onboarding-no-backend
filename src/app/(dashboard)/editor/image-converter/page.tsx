import { Suspense } from "react";
import ImageConverterTool from "@/components/dashboard/converter/image-converter-tool";

export const dynamic = "force-dynamic";

export default function ImageConverterPage() {
  return (
    <Suspense>
      <ImageConverterTool />
    </Suspense>
  );
}
