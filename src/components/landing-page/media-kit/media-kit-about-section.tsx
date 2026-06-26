export default function MediaKitAboutSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[90%]">
        <div className="grid max-w-xl grid-cols-1 gap-x-16 gap-y-10 lg:max-w-none lg:grid-cols-5">
          {/* Left header */}
          <div className="col-span-2 space-y-5">
            <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 sm:text-sm">
              About Headshot.AI
            </span>
            <h2 className="font-mont text-3xl font-semibold leading-tight tracking-tight text-pretty text-gray-900 sm:text-4xl lg:text-5xl">
              The <span className="text-blue-500">Story</span>
            </h2>
          </div>

          {/* Right content */}
          <div className="col-span-3 space-y-6">
            <p className="text-lg leading-[1.75] text-gray-600 sm:text-xl/8">
              Headshot.AI is an AI-powered platform that transforms casual
              selfies into studio-quality professional headshots. Founded in
              2025, the service delivers realistic results in under an
              hour &mdash; without the cost, time, or hassle of traditional
              photography.
            </p>
            <p className="text-base/7 text-gray-600">
              Headshot.AI serves{" "}
              <span className="font-semibold text-gray-900">133,000+</span>{" "}
              professionals across{" "}
              <span className="font-semibold text-gray-900">50+</span>{" "}
              countries, generating over{" "}
              <span className="font-semibold text-gray-900">7.2 million</span>{" "}
              headshots to date. With an average rating of{" "}
              <span className="font-semibold text-gray-900">4.9/5</span>, the
              platform is recognized as the #1 AI headshot generator for
              professionals worldwide.
            </p>
            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 px-7 py-6">
              <p className="text-[0.938rem] font-medium leading-relaxed text-blue-600 sm:text-base">
                <strong>Boilerplate:</strong> Headshot.AI is the #1 AI headshot
                generator, trusted by 133,000+ professionals worldwide. Upload
                selfies, get studio-quality headshots in minutes. Founded 2025,
                San Francisco.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
