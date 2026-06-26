import type { ConversionContent } from "./types";

export const gifConversions: Record<string, ConversionContent> = {
  "gif-to-jpg": {
    meta: {
      title: "GIF to JPG Converter Free — Extract Frames as JPEG | Headshot.AI",
      description:
        "Convert GIF to JPG online for free. Extract high-quality static frames from GIF animations or convert static GIFs to compact JPEG files. Fast, browser-based, no ads.",
    },
    hero: {
      subheadline:
        "Extract clean, static images from your GIF files in compact JPEG format. Perfect for pulling still frames, creating thumbnails, or reducing file size for uploads.",
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
        title: "Ad-Free",
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
        title: "Browser-Based",
        description:
          "The conversion runs locally in your browser. You don't need to download software, install plugins, or give any app access to your files.",
      },
      {
        icon: "Minimize2",
        title: "Smaller, Sharper Stills",
        description:
          "GIF is limited to 256 colors. JPG produces smoother gradients and richer colors with superior visual quality. Convert to JPG and see the difference in color depth and smoothness.",
      },
      {
        icon: "Crop",
        title: "Extract the Best Frame",
        description:
          "Pull a clean still image from GIF files. Perfect for thumbnails, social media posts, and featured images. No need to manually capture frames — the converter does it instantly.",
      },
    ],
    ctaContent:
      "GIF is great for animation and universal compatibility, but for static images, JPG is smaller and sharper. Convert your GIF files to JPG when you need compact files that look great, when you're creating thumbnails from GIF animations, or when you want to reclaim storage space. The converter extracts the first frame as a crisp JPEG. If you have an animated GIF and want a specific frame, the first frame is usually the safest choice. Processing happens instantly in your browser — your files stay private.",
    whenToConvert: [
      {
        title: "Creating thumbnails",
        description:
          "Animated GIFs make poor thumbnails — they don't display animations in thumbnail view. Convert to JPG to get a clean, compressed thumbnail that's smaller and cleaner than the original GIF.",
      },
      {
        title: "Reducing static GIF file sizes",
        description:
          "You have a static (non-animated) GIF that's taking up storage or slowing down uploads? JPG compression dramatically reduces file size. A 5MB static GIF often becomes 500KB in JPG.",
      },
      {
        title: "Profile photos and avatars",
        description:
          "GIF works as a profile photo, but JPG is smaller and loads faster. Convert when you're uploading profile pictures to social media, forums, or messaging apps.",
      },
      {
        title: "Blog featured images",
        description:
          "Most blogging platforms optimize JPG better than GIF. Converting to JPG ensures your blog images load quickly and display consistently across all devices.",
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
        question: "Will colors look better or worse in JPG compared to the original GIF?",
        answer:
          "Better, actually. GIF is limited to 256 colors, while JPG supports millions. When you convert GIF to JPG, the converter can represent colors much more smoothly and accurately. Gradients that look blocky in GIF become smooth in JPG. Solid colors remain identical.",
      },
      {
        question: "How much smaller will the JPG file be compared to the original GIF?",
        answer:
          "Depends on the content. Simple graphics might see 50% reduction. Photographs see even larger reductions. Static GIFs commonly shrink to 10-30% of their original size when converted to JPG. Animated GIFs that extract just the first frame see dramatic size reduction because animation data is removed.",
      },
      {
        question: "What happens to animation when I convert GIF to JPG?",
        answer:
          "Animation is lost. JPG is a static image format — it can't store animation. The converter extracts a single frame (the first frame by default) and converts that to JPG. If you need to preserve animation, keep the GIF or convert to a format that supports animation like WebP or AVIF.",
      },
      {
        question: "Can I get multiple frames from an animated GIF as separate JPG files?",
        answer:
          "Not directly through this converter — this tool converts format (GIF to JPG), not extract frames. To get separate JPG files for each frame in an animated GIF, you'd need a frame extraction tool. Then you could convert each extracted frame to JPG if needed.",
      },
      {
        question: "Can I convert multiple GIF files at once?",
        answer:
          "Yes. Upload as many GIF files as you need and the converter processes them all in batch. Each file converts to JPG independently. Download them one by one or grab the full set as a single ZIP file.",
      },
      {
        question: "When should I use PNG instead of JPG?",
        answer:
          "PNG is better when you need transparency, sharpness for text and graphics, or lossless quality. JPG is better when you need small file sizes for photographs and don't need transparency. GIFs converted to PNG look crisp but are larger than JPG. GIFs converted to JPG are smaller and look smoother — it's the better choice for most static GIFs.",
      },
    ],
  },

  "gif-to-png": {
    meta: {
      title: "Convert GIF to PNG Online Free — Crystal-Clear Static Images | Headshot.AI",
      description:
        "Convert GIF images to PNG format for free. Get lossless quality static images from your GIF files with transparency preserved. Browser-based, private, no watermarks.",
    },
    hero: {
      subheadline:
        "Convert your GIF files into crystal-clear PNG images with lossless quality. Preserve transparency and sharp edges for graphics, icons, and design assets.",
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
        title: "Ad-Free",
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
        icon: "Palette",
        title: "Full Color Depth",
        description:
          "GIF supports 256 colors, PNG supports millions. Converting gives dramatically richer, more accurate color representation.",
      },
      {
        icon: "Eye",
        title: "Better Transparency",
        description:
          "GIF transparency is binary (on/off), PNG supports smooth alpha transparency. Convert for cleaner anti-aliased edges.",
      },
    ],
    ctaContent:
      "GIF files are limited to 256 colors and basic transparency. When you convert to PNG, you unlock millions of colors and smooth, anti-aliased edges that make your images look professional. The conversion happens entirely in your browser—your GIF files stay private on your device. Whether you're converting a single image or batch processing dozens of files, you'll get lossless PNG output in seconds.",
    whenToConvert: [
      {
        title: "Better color quality needed",
        description:
          "Your GIF looks washed out or limited. PNG's support for millions of colors captures the full visual richness of your original image.",
      },
      {
        title: "Improved transparency for design",
        description:
          "You need smooth, anti-aliased edges for logos, icons, or design assets. GIF's binary transparency creates harsh, jagged edges—PNG's alpha transparency is smooth and professional.",
      },
      {
        title: "Graphic design work (logos, icons)",
        description:
          "Design assets need the highest quality and cleanest transparency. PNG is the standard format for professional graphics, UI elements, and design files.",
      },
      {
        title: "Archiving at full quality",
        description:
          "You're keeping images for long-term use or plan to edit them repeatedly. PNG preserves every detail without quality loss, unlike GIF's color limitations.",
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
        question: "Does PNG keep GIF transparency?",
        answer:
          "Yes. When you convert from GIF to PNG, transparency is preserved. In fact, PNG's transparency is better—it supports smooth alpha transparency instead of GIF's basic on/off transparency. This means edges will look cleaner and more professional.",
      },
      {
        question: "How does file size compare?",
        answer:
          "PNG files are typically slightly larger than GIF files because PNG preserves more color information. However, the difference is usually small—maybe 10-20% larger. You're trading minimal size for significant quality improvements.",
      },
      {
        question: "Will an animated GIF become static?",
        answer:
          "Yes. This converter takes a single frame (usually the first frame) and converts it to PNG. If you need to preserve animation, convert to WebP or AVIF instead, which support animation with better compression than GIF.",
      },
      {
        question: "When should I keep GIF instead of converting?",
        answer:
          "Keep GIF if you need animation and file size is critical, or if you're certain your image only needs 256 colors. For everything else—logos, icons, graphics, screenshots—PNG is the better choice.",
      },
      {
        question: "Will the color improvement be visible?",
        answer:
          "Yes, if your GIF is using the full 256-color palette. PNG can display millions of colors, so gradients, shadows, and color gradations will appear smoother and more accurate. If your GIF only uses a few solid colors, the difference is less noticeable.",
      },
      {
        question: "Is PNG best for logos?",
        answer:
          "Yes. PNG is the gold standard for logos because it supports millions of colors, smooth transparency, and lossless compression. Your logo will look sharp and professional on any background or device.",
      },
    ],
  },

  "gif-to-webp": {
    meta: {
      title: "GIF to WebP Converter Free — Smaller Animations, Same Quality | Headshot.AI",
      description:
        "Convert GIF to WebP online for free. Reduce animated file sizes by up to 60% while preserving animation and quality. Perfect for faster web pages. Browser-based converter.",
    },
    hero: {
      subheadline:
        "Shrink your GIF files by up to 60% by converting to WebP. Keep your animations smooth while dramatically cutting load times for web pages and apps.",
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
        icon: "TrendingDown",
        title: "60% Smaller Animations",
        description:
          "Animated WebP files are dramatically smaller than animated GIFs while preserving smooth playback. Massive bandwidth savings.",
      },
      {
        icon: "Play",
        title: "Smoother Playback",
        description:
          "WebP animations support more colors and smoother gradients than GIF's 256-color limit.",
      },
    ],
    ctaContent:
      "GIF animations eat up bandwidth and slow down web pages. WebP is engineered specifically for the web and cuts file sizes by 25-35% compared to JPEG—but animated WebP can be even smaller than static WebP. Convert your GIF animations to WebP and watch your page load times drop. The conversion happens right in your browser, your animations stay private, and your output is production-ready in seconds.",
    whenToConvert: [
      {
        title: "Website animation optimization (slow-loading GIFs)",
        description:
          "Your pages load slowly because of large GIF animations. Converting to WebP cuts the file size dramatically while keeping the animation smooth.",
      },
      {
        title: "Mobile performance (large GIFs kill mobile speed)",
        description:
          "Mobile users face slow page loads with large GIF files. WebP's better compression means faster loading and less data consumption for mobile visitors.",
      },
      {
        title: "Social media optimization",
        description:
          "Platforms like Twitter, Facebook, and Slack support WebP. Converting animated GIFs to WebP means faster uploads and faster playback for your audience.",
      },
      {
        title: "Ad creative optimization (faster loading = better metrics)",
        description:
          "Ad networks favor faster-loading creative. WebP animations load quicker, which can improve click-through rates and reduce cost per impression.",
      },
    ],
    faqs: [
      {
        question: "Do I have to wait long?",
        answer:
          "Not at all. Typical images convert in a couple of seconds. The tool runs in your browser, so there's no upload delay and no server queue to wait in. You'll see your converted file ready to download almost as soon as you start the process. Even batches of 10-20 files complete in under a minute on most devices.",
      },
      {
        question: "Why is this free?",
        answer:
          "No catch. Headshot.AI is primarily an AI headshot platform — that's where our business model lives. The image converter is a free tool we built because our users needed it. It costs us very little to run since the conversion happens in your browser, not on our servers. So there's no reason to charge for it, and we don't.",
      },
      {
        question: "Are my images stored anywhere?",
        answer:
          "No. Our converter runs entirely in your browser. Your images are never uploaded to any server — not ours, not a third party's, not anyone's. The conversion happens locally on your device using client-side technology. When you close the page, there's nothing to delete because nothing was ever transmitted.",
      },
      {
        question: "Is there a usage cap?",
        answer:
          "Never. There is no premium tier, no upgrade prompt after X conversions, and no feature gating. The free account gives you full access to everything — unlimited conversions, all formats, batch processing. We don't limit free users to push paid upgrades because there is no paid tier.",
      },
      {
        question: "Will the animation look smoother or will colors look better?",
        answer:
          "Both. WebP supports millions of colors instead of GIF's 256-color limit, so gradients and color transitions appear smoother. The animation framerate is also preserved perfectly.",
      },
      {
        question: "How much smaller will my animated WebP be compared to the original GIF?",
        answer:
          "Typically 40-60% smaller. An animated GIF that's 5MB might compress down to 2-3MB as WebP. The exact reduction depends on the animation complexity and color palette, but WebP's superior compression always wins against GIF.",
      },
      {
        question: "Does animation transfer when I convert GIF to WebP?",
        answer:
          "Yes. WebP supports animation, so your moving GIF becomes an animated WebP with all frames intact. The animation will play smoothly on modern browsers.",
      },
      {
        question: "What's the browser support for animated WebP?",
        answer:
          "Modern browsers handle animated WebP very well—Chrome, Edge, Firefox, and Safari (on newer versions) all support it. For older browsers, you can use fallback techniques, but most visitors will see the WebP animation directly.",
      },
      {
        question: "Is there a limit on animation length?",
        answer:
          "No hard limit. However, extremely long animations will create large files even in WebP. Most web animations (5-30 seconds) convert beautifully with great size savings.",
      },
      {
        question: "Can I convert back to GIF if needed?",
        answer:
          "Yes, you can convert WebP back to GIF using our reverse converter. However, converting back will increase file size again, so only do this if you really need GIF format for compatibility.",
      },
    ],
  },

  "gif-to-avif": {
    meta: {
      title: "Convert GIF to AVIF Free — Next-Gen Animated Images | Headshot.AI",
      description:
        "Convert GIF animations to AVIF format for free. Get dramatically smaller animated files with superior color depth and quality. Browser-based, no registration, instant results.",
    },
    hero: {
      subheadline:
        "Transform your GIF animations into next-gen AVIF format with dramatically smaller file sizes, better color depth, and smoother playback on modern browsers.",
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
        title: "Ad-Free",
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
        title: "Browser-Based",
        description:
          "Works on Chrome, Safari, Firefox, Edge — any modern browser on any device. No desktop app needed, no plugins to install. Just open the page and start converting.",
      },
      {
        icon: "Diamond",
        title: "Tiniest Animations",
        description:
          "AVIF animated files are a fraction of GIF size. Faster loading, less bandwidth, better UX.",
      },
      {
        icon: "Sparkles",
        title: "Modern Color Support",
        description:
          "Break free from GIF's 256-color limitation. AVIF supports millions of colors with HDR for vivid animations.",
      },
    ],
    ctaContent:
      "GIF is old technology. AVIF is the future. AVIF animations can be 50% smaller than JPEG and still preserve animation, color depth, and transparency. Convert your GIF files to AVIF and get next-generation compression with modern color support. The conversion runs entirely in your browser, your files stay private, and you get production-ready animated AVIF files in seconds.",
    whenToConvert: [
      {
        title: "Maximum animation compression",
        description:
          "You need the smallest possible file sizes. AVIF animated files are unmatched in compression efficiency.",
      },
      {
        title: "Higher quality animations (millions of colors)",
        description:
          "Your GIF animations are suffering from 256-color limitation. AVIF unleashes millions of colors and HDR support for vivid, detailed animations.",
      },
      {
        title: "Progressive web apps (fast first-paint)",
        description:
          "Every millisecond matters for app performance. AVIF animations load faster, improving perceived performance and user experience.",
      },
      {
        title: "Video-like image sequences (AV1 heritage)",
        description:
          "You're using image sequences as a lightweight video alternative. AVIF's AV1 codec heritage makes it perfect for this use case with tiny file sizes.",
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
        question: "Will the quality improvement be visible?",
        answer:
          "Yes, if your GIF uses the full 256-color palette. AVIF supports millions of colors, so you'll see smoother gradients, richer colors, and better detail. The file will also be dramatically smaller.",
      },
      {
        question: "How much smaller is animated AVIF compared to GIF?",
        answer:
          "Animated AVIF files are typically 50-70% smaller than equivalent GIF files while preserving animation and often improving color quality. A 10MB animated GIF might compress to 3-5MB as AVIF.",
      },
      {
        question: "Does animation survive the conversion to AVIF?",
        answer:
          "Yes. AVIF fully supports animation, so all frames from your GIF are preserved and will play smoothly in supporting browsers.",
      },
      {
        question: "What's the browser support for animated AVIF?",
        answer:
          "Modern browsers support AVIF—Chrome, Edge, and Firefox all handle it. Safari support is improving. For older browsers, you might use fallback formats, but the majority of users will see AVIF directly.",
      },
      {
        question: "How does animated AVIF compare to WebP for animations?",
        answer:
          "AVIF animated files are typically 20-30% smaller than WebP animated files while maintaining the same or better quality. If file size is your priority, AVIF wins.",
      },
      {
        question: "Can I convert my files back to GIF if needed?",
        answer:
          "Yes. You can convert between GIF and AVIF in both directions using this site. If you need the GIF version back for compatibility reasons, just run the reverse conversion. The animation transfers both ways.",
      },
    ],
  },

  "gif-to-heic": {
    meta: {
      title: "GIF to HEIC Converter Free Online — Compact GIF Conversion | Headshot.AI",
      description:
        "Convert GIF to HEIC format online for free. Create compact, Apple-friendly image files from your GIF images. Browser-based, private, supports batch processing.",
    },
    hero: {
      subheadline:
        "Convert your GIF images into Apple's compact HEIC format. Reduce file sizes for iPhone and iPad storage while maintaining the visual quality of your images.",
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
        title: "Ad-Free",
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
        title: "Browser-Based",
        description:
          "The conversion runs locally in your browser. You don't need to download software, install plugins, or give any app access to your files.",
      },
      {
        icon: "Smartphone",
        title: "Compact for Apple",
        description:
          "Convert GIF files into HEIC for space-efficient storage on Apple devices. Ideal for building image libraries on iPhone and iPad.",
      },
      {
        icon: "ShieldCheck",
        title: "Quality at Less Size",
        description:
          "HEIC's advanced compression keeps images sharp while using less storage than GIF format.",
      },
    ],
    ctaContent:
      "GIF files can waste valuable storage space, especially on iPhones and iPads. HEIC is Apple's modern image format that compresses files to about half the size of GIF while maintaining visual quality. Convert your GIF files to HEIC and reclaim storage space on your Apple devices. The conversion happens entirely in your browser, your files stay private, and your output is ready for immediate use.",
    whenToConvert: [
      {
        title: "Apple device storage optimization",
        description:
          "Your iPhone or iPad is running low on storage. HEIC files use significantly less space than GIF, freeing up gigabytes of storage for apps and other files.",
      },
      {
        title: "Photo library cleanup (GIF→HEIC for tidier library)",
        description:
          "You have GIF files scattered through your photo library. Converting to HEIC keeps them organized and saves storage space in one operation.",
      },
      {
        title: "iMessage sharing (HEIC shares more efficiently)",
        description:
          "You're sending images via iMessage to other Apple users. HEIC files send faster and take up less data than GIF.",
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
        question: "How does file size compare between GIF and HEIC?",
        answer:
          "HEIC is typically 30-50% smaller than GIF files while maintaining better visual quality. A 2MB GIF might become a 1MB HEIC file.",
      },
      {
        question: "Does animation transfer to HEIC?",
        answer:
          "No. This converter converts the first frame of your GIF to HEIC. If you need to preserve animation, use WebP or AVIF instead, which support animated images.",
      },
      {
        question: "Will this work on Windows?",
        answer:
          "The conversion works on Windows, but HEIC files don't open natively on Windows. You'd need a third-party app or converter to view them. For cross-platform sharing, stick with JPEG or PNG instead.",
      },
      {
        question: "Can I view HEIC files on Android?",
        answer:
          "Android doesn't natively support HEIC. You'd need a third-party app to open HEIC files on Android phones. For Android users, convert to JPEG or PNG instead.",
      },
      {
        question: "What are practical use cases for GIF to HEIC conversion?",
        answer:
          "Mainly Apple-only workflows: archiving old GIF files on iPhone, saving storage space in your photo library, or sharing images within Apple ecosystem. If you need to share with Windows or Android users, JPEG is more practical.",
      },
      {
        question: "Can I convert HEIC back to GIF later?",
        answer:
          "Yes, you can convert HEIC back to GIF using our reverse converter. However, the animation won't come back (since it was lost in the first conversion). The image data will be preserved as a static GIF.",
      },
    ],
  },
};
