import type { ConversionContent } from "./types";

export const pngConversions: Record<string, ConversionContent> = {
  "png-to-jpg": {
    meta: {
      title: "PNG to JPG Converter Free — Reduce File Size Instantly | Headshot.AI",
      description:
        "Convert PNG to JPG online for free. Dramatically reduce file sizes while keeping visual quality intact. Perfect for email attachments, social media, and web uploads. No ads, no watermarks.",
    },
    hero: {
      subheadline:
        "Reduce oversized PNG files into compact JPEG images. Ideal when you need smaller files for email, social media uploads, or websites without needing transparency.",
    },
    benefits: [
      {
        icon: "Zap",
        title: "Fast Conversion",
        description:
          "Drop a file in, get the converted version back in under 3 seconds. Everything runs locally on your device, so there's no upload delay and no waiting in line behind other users.",
      },
      {
        icon: "CircleOff",
        title: "Ad Free",
        description:
          "You won't see a single ad here. No pop-ups, no banners, no video ads that play before your download starts. We don't run ads on the converter and have no plans to start.",
      },
      {
        icon: "Layers",
        title: "Batch Convert",
        description:
          "Need to convert a whole folder? Upload everything at once and the converter processes all of them together. Download files one by one or grab them all in a single ZIP.",
      },
      {
        icon: "Globe",
        title: "Browser Based",
        description:
          "Nothing to install, nothing to sign up for beyond a free account. Open the page, drop your files in, and your browser does the rest. Works on any device with a modern browser.",
      },
      {
        icon: "Minimize2",
        title: "Massive Size Reduction",
        description:
          "PNG files can be 5-10x larger than equivalent JPEGs. Converting to JPG is the fastest way to get your images down to a manageable size for email, social media, and web uploads.",
      },
      {
        icon: "CircleCheck",
        title: "Universal Compatibility",
        description:
          "JPEG is the most widely supported image format in history. Every device, app, printer, and platform handles JPG files natively. You'll never run into a \"format not supported\" error with JPEG.",
      },
    ],
    ctaContent:
      "PNG files are great for quality, but they're often way bigger than they need to be — especially for photos. A 5MB PNG screenshot can become a 500KB JPEG that looks virtually identical. Our converter handles the compression smartly, finding the right balance between file size and visual quality. Drag in your PNGs, get compact JPEGs back. The whole thing runs in your browser, so nothing gets uploaded and it takes just seconds.",
    whenToConvert: [
      {
        title: "Sending photos via email",
        description:
          "Your PNG photo is 8MB and your email provider caps attachments at 10MB. Converting to JPG can drop that to under 1MB, letting you attach multiple photos without hitting size limits or annoying the recipient with massive downloads.",
      },
      {
        title: "Social media uploads",
        description:
          "Platforms like Instagram and Facebook convert PNG to JPEG on their end anyway — and their compression is often aggressive. Uploading a JPEG directly gives you more control over the final quality and avoids the double-compression problem.",
      },
      {
        title: "Printing photos",
        description:
          "Most photo printing services — Shutterfly, Costco, Snapfish, local print shops — prefer JPEG files. They're built to handle JPG. Converting from PNG before uploading avoids format compatibility headaches and ensures your prints look the way you intended.",
      },
      {
        title: "Website photographs",
        description:
          "For photographic content on websites, JPEG provides the best balance of quality and file size. A full-width hero image at 1920px wide might be 2MB as PNG but only 300KB as JPEG. That difference directly impacts your page load speed and visitor experience.",
      },
    ],
    faqs: [
      {
        question: "How fast are files processed?",
        answer:
          "Barely any wait. Most conversions complete in 1-3 seconds because everything runs locally in your browser. There's no file upload, no server processing queue, and no waiting for remote systems. Drop your file in, and the converted version is ready almost immediately. Even batch jobs finish quickly on modern devices.",
      },
      {
        question: "Is a subscription required?",
        answer:
          "No subscription required. You just need a free account — signing up takes about 30 seconds. After that, you have full access to every conversion format with no limits on files, no daily caps, and no features held back. There's no monthly fee, no annual plan, and no upgrade path because there's nothing to upgrade to. It's just free.",
      },
      {
        question: "Is my data safe?",
        answer:
          "Yes. Everything happens locally in your browser. Your files are never uploaded to any server, and we have zero access to your images. The conversion is powered by client-side technology — your browser does all the work. There's no cloud processing, no temporary storage, and no data collection. Your files stay yours.",
      },
      {
        question: "Can I convert unlimited files?",
        answer:
          "Yes — unlimited files, unlimited conversions, no restrictions whatsoever. There's no daily cap, no monthly limit, and no throttling based on usage. Since the conversion runs in your browser rather than on our servers, there's nothing to meter or limit. Use it as much as you need.",
      },
      {
        question: "Does the conversion damage my original PNG file?",
        answer:
          "No. Your original PNG stays completely untouched. The converter creates a new JPEG copy. Think of it like making a photocopy at a different size — the original document is unaffected. You'll have both files afterward and can delete whichever you don't need.",
      },
      {
        question: "Can I control the compression quality of the JPEG output?",
        answer:
          "Our converter uses an optimized quality setting that balances file size with visual quality. It's calibrated to produce JPEGs that look great at a fraction of the PNG's file size. For most use cases, this default works well. If you need specific quality control for professional workflows, a desktop image editor like Photoshop gives you granular compression settings.",
      },
      {
        question: "Will I lose the transparent background when converting PNG to JPG?",
        answer:
          "Yes. JPEG does not support transparency at all. Any transparent areas in your PNG will be filled with a solid color (usually white) in the JPEG output. If you need to keep the transparent background, use WebP or keep the file as PNG. JPG is the right choice when transparency isn't needed and file size matters more.",
      },
      {
        question: "How much smaller will my files be after converting?",
        answer:
          "It varies by image, but the reduction is usually substantial. A 4MB PNG photo can easily become a 400-600KB JPEG — that's a 6-10x reduction. Screenshots and graphics with flat colors see slightly less dramatic reductions (maybe 3-5x), but the savings are still significant in every case.",
      },
      {
        question: "Should I convert PNG screenshots to JPG?",
        answer:
          "It depends on the content. Screenshots with text, code, or UI elements are better kept as PNG because JPEG compression can blur text edges. Screenshots of photos, videos, or visual content convert well to JPEG with good results. If the screenshot is mostly text and sharp lines, keep it as PNG. If it's mostly images, JPEG is fine.",
      },
      {
        question: "Why not just keep everything as PNG?",
        answer:
          "File size. PNG files are great for quality, but they're significantly larger than JPEG for photographic content. A website full of PNG photos will load slowly. An email full of PNG attachments will hit size limits. A phone full of PNG screenshots will eat storage faster. JPEG exists because smaller files matter in practice.",
      },
    ],
  },

  "png-to-webp": {
    meta: {
      title: "Convert PNG to WebP Online Free — Smaller Files, Same Quality | Headshot.AI",
      description:
        "Convert PNG to WebP for free and cut file sizes by up to 45%. Preserve transparency support while optimizing for web performance. Browser-based, private, and instant.",
    },
    hero: {
      subheadline:
        "Convert your PNG graphics to WebP and cut file sizes by up to 45% while keeping transparency intact. The smart choice for faster-loading web pages.",
    },
    benefits: [
      {
        icon: "Zap",
        title: "Fast Conversion",
        description:
          "Your browser handles the entire conversion in 1-3 seconds flat. No files are sent to a server, which means zero upload time and zero waiting. It's as fast as your device can process it.",
      },
      {
        icon: "CircleOff",
        title: "Ad Free",
        description:
          "Other converters are plastered with ads. Ours has zero. No pop-ups interrupting your workflow, no banners eating screen space, no forced ad views before downloading your files.",
      },
      {
        icon: "Layers",
        title: "Batch Convert",
        description:
          "Upload as many files as you need — there's no limit per batch. The converter handles them all at the same time, and you can download each file separately or everything as one ZIP.",
      },
      {
        icon: "Globe",
        title: "Browser Based",
        description:
          "Your files never leave your device. The converter runs entirely inside your browser — no server uploads, no cloud processing, no third-party access. Privacy isn't a setting here, it's how the tool works.",
      },
      {
        icon: "Sparkles",
        title: "Transparent and Smaller",
        description:
          "WebP supports transparent backgrounds just like PNG, but at significantly smaller file sizes. You get the best of both worlds — clean cutouts that don't slow down your pages.",
      },
      {
        icon: "Gauge",
        title: "Speed Up Your Website",
        description:
          "WebP images load faster than PNG, directly improving your page speed scores, user experience, and search engine rankings. Google's own PageSpeed tool recommends this exact switch.",
      },
    ],
    ctaContent:
      "PNG is fantastic for quality, but it comes with a weight problem — especially for web use. Large transparent PNGs are often the single heaviest asset on a page. WebP fixes that by delivering the same transparency and visual quality at 30-45% less file size. Our converter handles the switch without touching your transparency channels or degrading quality. Drop your PNGs in, get lighter WebP files back, and watch your page speed scores jump.",
    whenToConvert: [
      {
        title: "Web design assets with transparency",
        description:
          "Your transparent navigation icons, product cutouts, and UI elements are large PNG files dragging down your page speed. WebP keeps the transparency at a fraction of the size — it's the single biggest quick win for most websites.",
      },
      {
        title: "E-commerce product images on transparent backgrounds",
        description:
          "Product photos with cutout backgrounds load noticeably faster as WebP. For stores with hundreds or thousands of products, that size reduction translates directly into better mobile experience and lower bounce rates.",
      },
      {
        title: "Google PageSpeed optimization",
        description:
          "Running PageSpeed Insights and seeing \"Serve images in next-gen formats\" flagged? Replacing PNG with WebP is the most straightforward fix for that warning, and it often bumps your performance score by 5-15 points.",
      },
      {
        title: "App UI assets",
        description:
          "Mobile and web applications ship faster with lighter assets. Converting your PNG icons, buttons, and UI graphics to WebP means smaller app bundles, quicker initial loads, and less data usage for your users.",
      },
    ],
    faqs: [
      {
        question: "How fast is the conversion?",
        answer:
          "Most images convert in 1-3 seconds. Since the processing happens locally in your browser rather than on a remote server, there's no upload wait, no queue, and no server processing time. The speed depends on your device and the image size, but for typical web and phone images, it's nearly instant.",
      },
      {
        question: "Is this tool really free?",
        answer:
          "Yes, completely free. There's no paid version, no premium tier, no \"pro\" upgrade lurking behind a button. You get the full tool — all formats, batch processing, unlimited conversions — without paying anything. We monetize through our AI headshot service, not through the converter. So the converter stays free, no strings attached.",
      },
      {
        question: "Are my files safe?",
        answer:
          "Completely. Your files never leave your device. The entire conversion runs locally in your browser using client-side processing. We don't upload, store, or even see your images. There's no server involved in the conversion — it's just your browser doing the work. This is the most private way to convert images online.",
      },
      {
        question: "Are there conversion limits?",
        answer:
          "No. There are no daily limits, monthly caps, or per-session restrictions. Convert one file or five hundred — it makes no difference. There are no file count limits, no watermarks added after a certain number, and no throttling. The tool is free and unlimited, period.",
      },
      {
        question: "Is it better to use lossless or lossy WebP when converting from PNG?",
        answer:
          "For graphics with transparency, text, and sharp edges (the typical PNG use case), lossless WebP preserves every detail and still achieves significant size reduction. For photographic PNGs, lossy WebP produces much smaller files with no visible quality difference. Our converter picks the optimal approach based on the image content.",
      },
      {
        question: "Does WebP keep the transparent background from my PNG?",
        answer:
          "Yes, completely. WebP has full alpha channel support, just like PNG. Your transparent backgrounds, semi-transparent overlays, and soft anti-aliased edges all carry over perfectly. The only difference is the file is smaller. You won't see any visual change in the transparency.",
      },
      {
        question: "How much smaller are WebP files compared to PNG?",
        answer:
          "For typical web graphics, expect 30-45% size reduction. A 500KB transparent PNG might become a 275-350KB WebP. For photographic content, the savings can be even larger — sometimes 50%+. The exact reduction depends on the image complexity, but you'll always see a meaningful difference.",
      },
      {
        question: "Will WebP work in older versions of Safari?",
        answer:
          "Safari added WebP support in version 14 (released September 2020). Anything older than that won't display WebP natively. If a meaningful portion of your audience uses pre-2020 Safari, you can use the HTML picture element to serve WebP with a PNG fallback. For most sites today, Safari coverage isn't an issue.",
      },
      {
        question: "Can I convert back to PNG later if I need to?",
        answer:
          "Yes, WebP to PNG conversion is one of our 30 converter options. Keep in mind that if you used lossy WebP compression, converting back to PNG won't restore any data that was compressed away — you'd be getting a lossless copy of the lossy version. For this reason, it's good practice to keep your original PNGs archived if you might need them later.",
      },
      {
        question: "Can I use WebP images in emails and documents?",
        answer:
          "It depends on the app. Most modern email clients and document editors now support WebP, but some older versions don't. If you're attaching images to emails or embedding them in documents and want guaranteed compatibility, PNG or JPG is still the safer bet.",
      },
    ],
  },

  "png-to-avif": {
    meta: {
      title: "PNG to AVIF Converter Free — Ultra-Compressed Lossless Images | Headshot.AI",
      description:
        "Convert PNG to AVIF format online for free. Achieve the smallest file sizes with next-gen compression while preserving transparency. No uploads to servers, fully browser-based.",
    },
    hero: {
      subheadline:
        "Transform your PNG images into ultra-efficient AVIF files. Preserve transparency and lossless quality at a fraction of the original file size — the future of web images.",
    },
    benefits: [
      {
        icon: "Zap",
        title: "Fast Conversion",
        description:
          "Conversions finish in 1-3 seconds — faster than most online tools because nothing gets uploaded to a server. The tool runs entirely in your browser, so there are no queues, no delays, and no waiting.",
      },
      {
        icon: "CircleOff",
        title: "Ad Free",
        description:
          'Completely ad-free — no banners, no pop-ups, no "click here to close" overlays. Your screen stays clean and the converter stays focused on one thing: converting your images.',
      },
      {
        icon: "Layers",
        title: "Batch Convert",
        description:
          "Don't convert files one at a time. Drag in your entire batch, let the converter process them simultaneously, and download individually or as a single ZIP. Handles dozens of files without slowing down.",
      },
      {
        icon: "Globe",
        title: "Browser Based",
        description:
          "Works on Chrome, Safari, Firefox, Edge — any modern browser on any device. No desktop app needed, no plugins to install. Just open the page and start converting.",
      },
      {
        icon: "Diamond",
        title: "Smallest Transparencies",
        description:
          "AVIF with transparency produces the tiniest file sizes available for images that need transparent backgrounds. If you've been using PNG for transparent web graphics, the reduction will be dramatic.",
      },
      {
        icon: "Rocket",
        title: "Future-Proof",
        description:
          "AVIF adoption is accelerating fast. Chrome, Firefox, Safari, and Edge all support it. Converting now means your images are ready for the next generation of browsers, apps, and devices without needing another round of optimization later.",
      },
    ],
    ctaContent:
      "If PNG is the quality king, AVIF is the efficiency king — and it doesn't ask you to sacrifice quality to earn that title. AVIF handles transparency, supports lossless compression, and delivers file sizes that make even WebP look bloated. For web developers dealing with heavy transparent PNGs that crush page speed scores, this is the format switch that makes the biggest difference. Our converter does it in your browser. No uploads, no server processing, no waiting in queues.",
    whenToConvert: [
      {
        title: "Cutting-edge web projects",
        description:
          "You're building for modern browsers and want the smallest possible transparent images. AVIF with alpha channels beats WebP and PNG for size on virtually every image. If your audience is on current browsers, there's no reason not to use it.",
      },
      {
        title: "Large graphic archives",
        description:
          "Storing thousands of PNG files for a design team, stock library, or content pipeline? Converting to AVIF can reclaim enormous amounts of storage. We're talking 50-70% reduction on many graphics while keeping lossless quality intact.",
      },
      {
        title: "Detailed web graphics",
        description:
          "Charts, infographics, data visualizations, and complex illustrations with lots of color and fine detail benefit hugely from AVIF's compression. These images are often heavy as PNG — AVIF makes them manageable without sacrificing any visible detail.",
      },
      {
        title: "Progressive enhancement strategy",
        description:
          "Serve AVIF to the ~93% of browsers that support it and fall back to PNG for the rest. You get the performance benefit for the vast majority of your traffic while maintaining compatibility for everyone.",
      },
    ],
    faqs: [
      {
        question: "How long does it take?",
        answer:
          "Seconds. Most files convert in 1-3 seconds because the processing happens right in your browser — there's no upload delay, no server queue, and no waiting for remote processing. Larger files or batch jobs take proportionally longer, but for typical images, the result is practically instant.",
      },
      {
        question: "Do I have to pay anything?",
        answer:
          "No. The image converter is 100% free. There are no hidden charges, no credit card prompts, and no premium features locked behind a paywall. Everything you see is everything you get — unlimited conversions across all formats. Our business model is built around our AI headshot tools, so the converter doesn't need to generate revenue. It's free because it genuinely is.",
      },
      {
        question: "Is it safe to use?",
        answer:
          "Absolutely. Your images never leave your device. The conversion runs entirely in your browser using client-side processing — no server uploads, no cloud processing, no third-party access. We physically cannot see your files because they're never transmitted anywhere. Your privacy isn't a policy; it's how the technology works.",
      },
      {
        question: "Is there a conversion limit?",
        answer:
          "None at all. There are no daily limits, monthly caps, or usage quotas of any kind. Whether you convert 5 files or 5,000, the experience is exactly the same. We don't throttle heavy users, we don't add watermarks after a certain count, and we don't lock features behind usage tiers.",
      },
      {
        question: "Is AVIF lossless like PNG?",
        answer:
          "AVIF supports both lossless and lossy compression — you get to choose. In lossless mode, the output is mathematically identical to your PNG source, just smaller. In lossy mode, you sacrifice a bit of invisible detail for even more dramatic size reduction. Our converter defaults to the mode that makes the most sense for each image.",
      },
      {
        question: "Does AVIF preserve transparency from my PNG files?",
        answer:
          "Yes, fully. AVIF supports alpha channels with the same precision as PNG. Your transparent backgrounds, semi-transparent gradients, and soft edges all convert perfectly. The visual result is identical — just in a much smaller file.",
      },
      {
        question: "How much smaller are AVIF files compared to PNG?",
        answer:
          "Significantly. For transparent graphics, expect 50-70% reduction. A 1MB PNG logo or graphic might become 300-500KB as AVIF with no visible change. For complex images with lots of colors and detail, AVIF's advantage is even more pronounced. The savings are consistently the best of any format.",
      },
      {
        question: "Which browsers support AVIF right now?",
        answer:
          "Chrome (since version 85), Firefox (since version 93), Safari (since version 16.4), Edge, and Opera all support AVIF. That covers roughly 92-95% of global web users. The main gap is older browser versions — if your analytics show significant traffic from very old browsers, serve AVIF with a PNG fallback using the HTML picture element.",
      },
      {
        question: "Should I use AVIF or WebP to replace my PNG files?",
        answer:
          "AVIF produces smaller files, but WebP has slightly wider browser support (97% vs ~93%). If absolute performance matters most, go with AVIF. If you need to support a broader range of older browsers without fallbacks, WebP is the safer choice. Many sites serve both using picture elements — AVIF for browsers that support it, WebP as the fallback.",
      },
      {
        question: "Will converting to AVIF affect my image colors?",
        answer:
          "Not in any way you'd notice. AVIF actually supports higher color depth than PNG — up to 12-bit compared to PNG's typical 8-bit. This means AVIF can represent colors more accurately, not less. Gradients appear smoother, and subtle color variations are preserved better than in PNG. Your colors are in good hands.",
      },
    ],
  },

  "png-to-gif": {
    meta: {
      title: "PNG to GIF Converter Online Free — Transparent GIFs in Seconds | Headshot.AI",
      description:
        "Convert PNG images to GIF format for free. Preserve transparency and create web-ready GIF files from your PNG graphics. Fast, browser-based, no registration needed.",
    },
    hero: {
      subheadline:
        "Convert your PNG images to GIF format for universal sharing. GIF's wide compatibility means your images display perfectly in emails, chat apps, and legacy systems.",
    },
    benefits: [
      {
        icon: "Zap",
        title: "Fast Conversion",
        description:
          "Images convert in 1-3 seconds using your browser's built-in processing power. No upload wait, no server queue, no spinning progress bars.",
      },
      {
        icon: "CircleOff",
        title: "Ad Free",
        description:
          'No banner ads, no pop-ups, no interstitials, no "watch this ad to continue" walls. The converter is completely ad-free and always will be.',
      },
      {
        icon: "Layers",
        title: "Batch Convert",
        description:
          "Convert one image or a hundred at once. Upload multiple files simultaneously and download them individually or as a single ZIP file.",
      },
      {
        icon: "Globe",
        title: "Browser Based",
        description:
          "The conversion runs locally in your browser. You don't need to download software, install plugins, or give any app access to your files.",
      },
      {
        icon: "Mail",
        title: "Email Safe Format",
        description:
          "GIF is one of the few image formats that renders reliably in every email client — Outlook, Gmail, Apple Mail, Yahoo, Thunderbird, all of them. When you need images to display in emails, GIF is the safest choice.",
      },
      {
        icon: "History",
        title: "Legacy Compatible",
        description:
          "Older platforms, CMS systems, and enterprise applications that struggle with PNG transparency often handle GIF transparency without issues. GIF works where other formats don't.",
      },
    ],
    ctaContent:
      "Need your images to work absolutely everywhere — even on platforms built in the early 2000s? GIF is the answer. It's not the fanciest format, but its compatibility is unmatched. Our converter takes your PNG files (including ones with transparency) and outputs clean GIF images that work in every email client, every browser, every messaging app, and every legacy system you'll ever encounter. It runs in your browser, takes a few seconds, and doesn't cost anything.",
    whenToConvert: [
      {
        title: "Email campaign assets",
        description:
          "You're building an email newsletter and need images that render identically in Outlook 2016, Gmail, Apple Mail, and whatever obscure client your CEO uses. GIF is the format that never breaks across email clients — especially for logos, icons, and simple graphics.",
      },
      {
        title: "Animated banner requirements",
        description:
          "A platform requires images in GIF format specifically. Maybe it's an ad network, a forum, or a digital signage system. Converting your PNG source to GIF meets the requirement without losing the essential visual content.",
      },
      {
        title: "Older web platforms",
        description:
          "Internal wikis, legacy CMS installations, ticketing systems from 2010 — they all speak GIF fluently. If you're uploading images to a system that chokes on modern formats, GIF is the universal translator.",
      },
      {
        title: "Favicon creation",
        description:
          "Many older browsers and bookmark managers still expect GIF for favicons. Converting your PNG icon to GIF ensures the widest possible favicon compatibility across browsers, devices, and platforms.",
      },
    ],
    faqs: [
      {
        question: "How quickly do I get my files?",
        answer:
          "Within seconds for standard images. Because the converter runs in your browser — not on a server — there's no upload delay. The file goes straight from your device into the conversion engine and comes out the other side in 1-3 seconds. Batch jobs are a bit longer, but individual files are nearly instant.",
      },
      {
        question: "Will I ever need to pay?",
        answer:
          "Never. There's no trial period that expires, no usage cap that triggers an upgrade screen, and no \"free tier\" with limitations. The converter is fully free and will stay that way. We don't use it as a funnel to sell you something else. Our revenue comes from other products — the converter is simply a free tool we offer.",
      },
      {
        question: "Are my photos protected?",
        answer:
          "Yes. The conversion process is entirely browser-based. Your photos stay on your device and are never uploaded anywhere. We don't have servers processing your images — your own browser handles everything. This means your photos are as safe during conversion as they are sitting in your local folder.",
      },
      {
        question: "Will I get restricted?",
        answer:
          "No. There are no conversion limits — daily, monthly, or otherwise. You won't encounter a paywall, a usage cap, or a speed restriction no matter how many files you process. Since the conversion runs in your own browser, there's nothing for us to throttle even if we wanted to.",
      },
      {
        question: "Why would I use GIF instead of PNG if PNG is higher quality?",
        answer:
          "Compatibility. There are systems, email clients, and platforms that handle GIF more reliably than PNG — particularly when it comes to transparency. Outlook is a common example: GIF transparency renders more consistently across Outlook versions than PNG transparency. When quality matters most, keep PNG. When you need something that works everywhere, go with GIF.",
      },
      {
        question: "Will my PNG transparency carry over to GIF?",
        answer:
          "Yes, but with a difference in how it works. PNG supports smooth, gradual transparency (alpha channel) — meaning pixels can be partially transparent with soft edges. GIF only supports binary transparency — each pixel is either fully transparent or fully opaque. This means soft, anti-aliased edges around transparent areas may look slightly jagged in GIF. For simple shapes with clean edges, the result looks nearly identical.",
      },
      {
        question: "Are GIF files bigger or smaller than PNG?",
        answer:
          "It depends entirely on the image. For simple graphics with few colors and flat areas, GIF files can be smaller than PNG. For complex images with many colors, gradients, and photographic content, PNG typically produces smaller files because its compression algorithm handles complexity better. As a rule: simple graphics favor GIF, complex images favor PNG.",
      },
      {
        question: "Can I make the GIF file animated from a single PNG?",
        answer:
          "No, this converter creates static GIF files from PNG inputs. An animated GIF requires multiple frames (separate images). This tool converts your single PNG image into a single-frame GIF. If you need animated GIFs, you'd need multiple source images and an animation tool to sequence them together.",
      },
      {
        question: "Will my image lose colors when converting to GIF?",
        answer:
          "Potentially, yes. GIF supports a maximum of 256 colors per image, while PNG supports millions. For simple graphics, logos, and icons that use fewer than 256 colors, you won't notice any difference. For complex images with gradients, color photographs, or subtle color variations, you'll see some color reduction and banding. GIF works best with flat, limited-color graphics.",
      },
      {
        question: "Can I share GIF files on any messaging app?",
        answer:
          "Yes. GIF is one of the most universally supported formats. Every major messaging app — iMessage, WhatsApp, Telegram, Discord, Slack, Facebook Messenger — displays GIF files without any issues. It's one of the main reasons people still convert to GIF.",
      },
    ],
  },

  "png-to-heic": {
    meta: {
      title: "Convert PNG to HEIC Free Online — Compress Without Quality Loss | Headshot.AI",
      description:
        "Convert PNG to HEIC format for free. Get superior compression with transparency support, ideal for Apple devices. Browser-based converter with batch processing.",
    },
    hero: {
      subheadline:
        "Compress your PNG files into Apple's space-saving HEIC format. Retain outstanding visual quality with significantly smaller file sizes across your Apple devices.",
    },
    benefits: [
      {
        icon: "Zap",
        title: "Fast Conversion",
        description:
          "Drop a file in, get the converted version back in under 3 seconds. Everything runs locally on your device, so there's no upload delay and no waiting in line behind other users.",
      },
      {
        icon: "CircleOff",
        title: "Ad Free",
        description:
          "You won't see a single ad here. No pop-ups, no banners, no video ads that play before your download starts. We don't run ads on the converter and have no plans to start.",
      },
      {
        icon: "Layers",
        title: "Batch Convert",
        description:
          "Need to convert a whole folder? Upload everything at once and the converter processes all of them together. Download files one by one or grab them all in a single ZIP.",
      },
      {
        icon: "Globe",
        title: "Browser Based",
        description:
          "Nothing to install, nothing to sign up for beyond a free account. Open the page, drop your files in, and your browser does the rest. Works on any device with a modern browser.",
      },
      {
        icon: "Smartphone",
        title: "Save Apple Storage",
        description:
          "HEIC compresses images far more efficiently than PNG. Converting a library of PNG screenshots and graphics to HEIC can free up significant storage space on your iPhone, iPad, and Mac.",
      },
      {
        icon: "ShieldCheck",
        title: "Quality Maintained",
        description:
          "HEIC preserves remarkable detail even at small file sizes. Your converted images will look virtually identical to the PNG originals on Apple's Retina displays — you'd struggle to tell them apart.",
      },
    ],
    ctaContent:
      "PNG files look great, but they take up a lot of room — especially when you've got hundreds of screenshots, design exports, and graphics stored on your Apple devices. HEIC gives you the same visual quality in a much smaller package, and it plays nicely with everything in the Apple ecosystem. Our converter handles the switch entirely in your browser. Drop your PNGs in, get HEIC files back, move them to your iPhone or Mac, and enjoy the extra storage space.",
    whenToConvert: [
      {
        title: "iPhone photo library management",
        description:
          "Your camera roll is full of PNG screenshots taking up more space than they need to. Converting them to HEIC frees up storage without deleting anything — the images look the same but weigh a lot less.",
      },
      {
        title: "AirDrop ready graphics",
        description:
          "HEIC files transfer quickly via AirDrop between Apple devices. If you regularly share images between your Mac and iPhone, HEIC keeps the transfers fast and the files light.",
      },
      {
        title: "iMessage sharing",
        description:
          "HEIC images are handled natively by iMessage with optimal quality and minimal data usage. Your contacts on Apple devices will receive the best possible image quality without unnecessary file bloat.",
      },
      {
        title: "macOS photo workflows",
        description:
          "Apple's Photos app and Preview are both optimized for HEIC. Editing, organizing, and browsing HEIC files is smoother and faster than working with heavy PNG files, especially in large libraries.",
      },
    ],
    faqs: [
      {
        question: "Is the conversion instant?",
        answer:
          "Close to it. Most files convert in 1-3 seconds. Because the processing runs locally in your browser, there's no waiting for server uploads or processing queues. You drop the file in, the conversion happens on your machine, and the output is ready almost immediately. Batch conversions take proportionally longer but are still fast.",
      },
      {
        question: "Is there a premium version?",
        answer:
          "No. What you see is the full product. There's no locked feature set, no watermark that disappears when you pay, and no limit that increases with a subscription. Every user gets the same experience: unlimited conversions, all formats, batch processing, no ads, no watermarks. There is no premium version because the free version already does everything.",
      },
      {
        question: "How secure is this tool?",
        answer:
          "As secure as it gets. The conversion is 100% browser-based, meaning your files stay on your own device throughout the entire process. Nothing is uploaded to any server — ours or anyone else's. No one at Headshot.AI can see, access, or store your images. Your privacy isn't just a policy here; it's built into how the tool works.",
      },
      {
        question: "How many files can I convert?",
        answer:
          "As many as you want. There's no daily cap, no monthly quota, and no usage throttle. We don't track how many files you convert or limit your access based on volume. Whether you're converting 5 images today or 500, the tool works the same way every time.",
      },
      {
        question: "Is HEIC quality as good as PNG?",
        answer:
          "For viewing on Apple Retina displays, the difference is essentially invisible. PNG is technically lossless while HEIC uses advanced compression that discards imperceptible data. At normal viewing distances on normal screens, you won't see a difference. For pixel-level editing or professional print work, PNG's lossless quality is still preferable.",
      },
      {
        question: "Will my PNG transparency be preserved in HEIC?",
        answer:
          "Yes, HEIC supports transparency. Your transparent backgrounds and alpha channels will carry over from your PNG files. This is one of HEIC's advantages over JPEG, which doesn't support transparency at all. Your transparent graphics will work correctly in Apple's ecosystem.",
      },
      {
        question: "How much space will I save compared to PNG?",
        answer:
          "Expect 50-70% file size reduction for most images. A 2MB PNG screenshot might become 600KB-1MB as HEIC with no visible quality change. For a library of 500 screenshots averaging 2MB each (1GB total), that could free up 500-700MB of storage. The savings add up fast on devices with limited space.",
      },
      {
        question: "Can I open HEIC files on a Windows PC?",
        answer:
          "With some effort, yes. Windows 10 and 11 can handle HEIC if you install the HEIC codec extension from the Microsoft Store. But native support is inconsistent across Windows applications. If you plan to share these files with Windows users, converting to JPG or PNG would be more practical. HEIC is best used within the Apple ecosystem.",
      },
      {
        question: "Does Apple Photos handle HEIC files better than PNG?",
        answer:
          "Yes, noticeably. Apple's Photos app, Preview, and the entire macOS/iOS photo pipeline are optimized for HEIC. Thumbnails generate faster, metadata is handled more elegantly, and iCloud sync is more efficient with HEIC files. If you live in the Apple ecosystem, HEIC is the format Apple designed everything around.",
      },
      {
        question: "Can I convert HEIC back to PNG later?",
        answer:
          "Absolutely — HEIC to PNG is one of our 30 conversion options. Keep in mind that since HEIC uses lossy compression, converting back to PNG gives you a lossless copy of the compressed version, not a perfect copy of the original PNG. If pixel-perfect fidelity matters for future use, keep your original PNG files backed up alongside the HEIC versions.",
      },
    ],
  },
};
