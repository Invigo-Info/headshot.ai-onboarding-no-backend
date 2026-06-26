import { EditorToolCard } from "./editor-tool-card"
import { EditorTool, EditorToolsProps } from "@/types/editor.types"

const defaultTools: EditorTool[] = [
  {
    id: "background-changer",
    name: "Background Changer",
    description: "Change the background of your images to create the perfect backdrop.",
    beforeSrc: "/assets/editor-page/background-changer/1b.webp",
    afterSrc: "/assets/editor-page/background-changer/1a.jpg",
    category: "background",
    href: "/editor/background-changer",
  },
  {
    id: "blemish-remover",
    name: "Blemish Remover",
    description: "Erase acne, spots, or redness for smooth, natural-looking skin.",
    beforeSrc: "/assets/editor-page/blemish-remover/1b.webp",
    afterSrc: "/assets/editor-page/blemish-remover/1a.jpeg",
    category: "enhancement",
    href: "/editor/blemish-remover",
  },
  {
    id: "magic-eraser",
    name: "Magic Eraser",
    description: "Remove unwanted objects, people, or distractions with one click.",
    beforeSrc: "/assets/editor-page/magic-eraser/1b.webp",
    afterSrc: "/assets/editor-page/magic-eraser/1a.jpg",
    category: "editing",
    href: "/editor/magic-eraser",
  },
  {
    id: "image-extender",
    name: "Image Extender",
    description: "Expand your photo's frame to fix awkward crops or fit any layout.",
    beforeSrc: "/assets/editor-page/image-extender/1b.jpg",
    afterSrc: "/assets/editor-page/image-extender/1a.webp",
    category: "background",
    href: "/editor/image-extender",
  },
    {
    id: "image-upscaler",
    name: "Image Upscaler",
    description: "Instantly boost resolution for sharper, high-quality images.",
    beforeSrc: "/assets/editor-page/image-upscaler/1b.jpg",
    afterSrc: "/assets/editor-page/image-upscaler/1a.jpg",
    category: "enhancement",
    href: "/editor/image-upscaler",
  },
  {
    id: "text-remover",
    name: "Text Remover",
    description: "Erase text, watermarks, or captions without harming the background.",
    beforeSrc: "/assets/editor-page/text-remover/1b.webp",
    afterSrc: "/assets/editor-page/text-remover/1a.jpg",
    category: "editing",
    href: "/editor/text-remover",
  },
  {
    id: "unblur-image",
    name: "Unblur Image",
    description: "Sharpen soft or out-of-focus shots for a crisp, professional finish.",
    beforeSrc: "/assets/editor-page/unblur-image/1b.png",
    afterSrc: "/assets/editor-page/unblur-image/1a.webp",
    category: "enhancement",
    href: "/editor/unblur-image",
  },
  {
    id: "photo-restoration",
    name: "Photo Restoration",
    description: "Revive old, faded, or damaged photos and restore their charm.",
    beforeSrc: "/assets/editor-page/photo-restoration/1b.webp",
    afterSrc: "/assets/editor-page/photo-restoration/1a.jpg",
    category: "restoration",
    href: "/editor/photo-restoration",
  },
  {
    id: "color-correction",
    name: "Color Correction",
    description: "Fix tones, lighting, and exposure to restore vibrant, balanced colors.",
    beforeSrc: "/assets/editor-page/color-correction/1b.jpg",
    afterSrc: "/assets/editor-page/color-correction/1a.webp",
    category: "enhancement",
    href: "/editor/color-correction",
  },
  {
    id: "face-restorer",
    name: "Face Restoration",
    description: "Repair blurry or low-quality faces to bring back clear details.",
    beforeSrc: "/assets/editor-page/face-restorer/1b.webp",
    afterSrc: "/assets/editor-page/face-restorer/1a.png",
    category: "enhancement",
    href: "/editor/face-restorer",
  },
]

export function AIEditorTools({ tools = defaultTools, selectedToolId }: EditorToolsProps) {
  return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        role="grid"
        aria-label="AI editing tools"
      >
        {tools.map((tool) => (
          <div key={tool.id} role="gridcell">
            <EditorToolCard tool={tool} isSelected={selectedToolId === tool.id} />
          </div>
        ))}
      </div>
  )
}
