export const CONVERT_LOGOS = [
  "1.Instagram.png",
  "2.TikTok.png",
  "3.Youtube.png",
  "4.Facebook.png",
  "5.Pinterest.png",
  "6.Shutterfly.png",
  "7.Snapfish.png",
  "8.Printify.png",
  "9.Photobucket.png",
  "10.Mixbook.png",
  "11.Vistaprint.png",
  "12.Zazzle.png",
  "13.Blurb.png",
  "14.Chatbooks.png",
  "15.Mpix.png",
  "16.X-Twitter.png",
  "17.Etsy.png",
  "18.Shopify.png",
  "19.Amazon.png",
];

export const CONVERT_BADGES = ["Free Converter", "No Ads", "No Watermarks", "Fast Conversions"];

export const highlightText = (
  text: string,
  highlights: string[],
  className: string = "text-blue-500"
) => {
  if (!highlights.length) return text;

  const pattern = highlights
    .map((highlight) => highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");

  const parts = text.split(new RegExp(`(${pattern})`, "i"));

  return parts.map((part, index) => {
    const isHighlighted = highlights.some(
      (highlight) => part.toLowerCase() === highlight.toLowerCase()
    );

    return (
      <span key={index}>
        {isHighlighted ? <span className={className}>{part}</span> : part}
      </span>
    );
  });
};
