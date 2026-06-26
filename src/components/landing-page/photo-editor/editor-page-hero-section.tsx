import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { Check, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import TrustedLogos from "../trusted-logos";

interface EditorPageHeroSectionProps {
  title: string;
  description: string;
  imageOne: string;
  imageTwo: string;
  trustedByText: string;
  trustedByTexthighlight: string[];
  category: string;
  keypoints: string[];
  logos: string[];
}


const logos = [
  "1.LinkedIn.png",
"2.Instagram.png",
"3.Youtube.png",
"4.TikTok.png",
"5.Canva.png",
"6.Shopify.png",
"7.Amazon.png",
"8.Etsy.png",
"9.Facebook.png",
"10.Pinterest.png",
"11.X-Twitter.png",
"12.Figma.png",
"13.Framer.png",
"14.Behance.png",
"15.Dribbble.png",
"16.Notion.png",
"17.Adobe Express.png",
"18.UpWork.png",
"19.Fiverr.png",
"20.Flickr.png",
"21.500Px.png",
"22.SmugMug.png",
"23.Photobucket.png"
];

const keypoints = [
  "75,000+ Backgrounds Changed",
  "Done in Seconds",
  "Privacy Protected",
  "Works on Any Photo",
  "No Editing Skills",
]

// Helper function to highlight multiple words/phrases in text
const highlightText = (text: string, highlights: string[], className: string = "text-blue-500") => {
  if (!highlights.length) return text;
  
  // Create regex pattern for all highlights
  const pattern = highlights
    .map(highlight => highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  
  const parts = text.split(new RegExp(`(${pattern})`, 'i'));
  
  return parts.map((part, index) => {
    const isHighlighted = highlights.some(highlight => 
      part.toLowerCase() === highlight.toLowerCase()
    );
    
    return (
      <span key={index}>
        {isHighlighted ? (
          <span className={className}>{part}</span>
        ) : (
          part
        )}
      </span>
    );
  });
};

export default function EditorPageHeroSection({
  title = defaultProps.title,
  description = defaultProps.description,
  imageOne = defaultProps.imageOne,
  imageTwo = defaultProps.imageTwo,
  trustedByText = defaultProps.trustedByText,
  trustedByTexthighlight = defaultProps.trustedByTexthighlight,
  category = defaultProps.category,
  keypoints = defaultProps.keypoints,
  logos = defaultProps.logos,
}: EditorPageHeroSectionProps) {
  return (
    <section className="w-full flex flex-col ">
      <div className="container mx-auto px-4 py-10 md:py-14 flex flex-col items-center justify-center">
        <div className="flex justify-center mb-4">
          <Badge
            variant="secondary"
            className="bg-blue-50 border-blue-200 text-black px-4 py-2 text-sm sm:text-base font-semibold"
          >
            💙 THE #1 RANKED AI PHOTO EDITOR
          </Badge>
        </div>

        <h1 className="text-3xl text-center xs:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-gray-900 mb-4 max-w-4xl mx-auto">
          {title}
        </h1>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-6">
          {description}
        </p>

        <div className="flex flex-col items-center justify-center overflow-x-scroll lg:overflow-x-hidden no-scrollbar w-full">
              <div className="flex w-fit justify-start items-center gap-4 mx-auto lg:flex-wrap">
                {keypoints.map((point, index) => (
                  <div
                    key={index}
                    className="whitespace-nowrap flex items-center gap-2"
                  >
                    <Check className="size-4 text-green-600" />
                    <span className="font-medium text-gray-700 text-sm md:text-base">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

        {/* ratings row */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mt-6 max-w-5xl mx-auto">
          {/* Upload box */}
          <Link
            href="/login"
            className="w-full h-full group bg-white p-4 rounded-2xl order-2 lg:order-1"
          >
            <Card className="mb-8 border-none shadow-none p-0 w-full h-full">
              <CardContent className="p-0 w-full h-full">
                <div
                  className={`size-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 sm:p-12 text-center cursor-pointer transition-colors group-hover:bg-blue-100 group-hover:border-blue-500`}
                >
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                  <Button className="bg-blue-500 hover:bg-blue-700 text-white mb-4 text-base md:text-lg w-full max-w-full sm:max-w-[80%] py-6 md:py-8">
                    <Upload className="size-4 sm:size-6 mr-2" />
                    Upload your picture
                  </Button>
                  <p className="text-sm text-gray-500">
                    or <span className="text-blue-600">drag and drop</span>{" "}
                    your photo
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, HEIC, WEBP up to 120MB
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Compare slider */}
          <div className="relative overflow-hidden bg-white rounded-2xl order-1 lg:order-2">
            <ReactCompareSlider
              itemOne={<ReactCompareSliderImage src={imageOne} alt="before" />}
              itemTwo={<ReactCompareSliderImage src={imageTwo} alt="after" />}
            />
            {/* <span className="absolute top-2 left-2 text-white text-sm">Before</span> */}
            {/* <span className="absolute top-2 right-2 text-white text-sm">After</span> */}
          </div>
        </div>

        {/* Logos row - simplified placeholder */}
              {/* Trust Section */}
      <div className="text-center my-8 container mx-auto px-4">
        <p className="text-base sm:text-lg text-gray-700 mb-4">
          {highlightText(
            trustedByText, 
            trustedByTexthighlight, 
            "text-blue-500 font-bold"
          )}
        </p>
        {/* Company Logos */}
        <TrustedLogos logos={logos} category={category}  editorPage={true} />
      </div>
      </div>
    </section>
  );
}

const defaultProps = {
  title: "Change or Remove Backgrounds",
  description:
    "Replace and edit your image backgrounds. Just upload your photos or choose a background from our library, and let our editor handle the rest.",
  imageOne: "/assets/editor-page/background-changer/1a.jpg",
  imageTwo: "/assets/editor-page/background-changer/1b.webp",
  trustedByText: "Trusted by Creators Worldwide",
  trustedByTexthighlight: ["Creators"],
  category: "background-changer",
  keypoints: keypoints,
  logos: logos,
};

