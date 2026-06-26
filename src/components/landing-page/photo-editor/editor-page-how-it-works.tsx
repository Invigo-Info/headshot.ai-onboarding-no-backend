// it should be an array of objects with the following properties:

interface EditorPageHowItWorksProps {
  steps: {
    number: string;
    title: string;
    description: string;
  }[];
  description?: string;
}

const defaultProps = {
  steps: [
    {
      number: "1",
      title: "Upload your image",
      description:
        "Simply upload the photo you want to edit. Image format can be PNG or JPG, and we support all image dimensions.",
    },
    {
      number: "2",
      title: "Choose your background",
      description:
        "Our AI background changer automatically finds your subject, removes the background, and lets you swap in any background of your choice.",
    },
    {
      number: "3",
      title: "Download your image",
      description:
        "Just wait for the results, and you’re good to download your new image.",
    },
  ],
  description: "It’s quick, simple, and hassle-free - just 3 steps!",
};

export default function EditorPageHowItWorks({
  steps = defaultProps.steps,
  description = defaultProps.description,
}: EditorPageHowItWorksProps) {
  return (
    <section className="py-12 md:py-16 max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-8">
          How Does It Work?
        </h2>
        <p className="text-center text-gray-600 mb-10">
		{description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div className="flex flex-col items-start justify-start" key={step.number}>
              <div className="flex items-center justify-center mb-4">
			  <span className="bg-blue-500 font-bold text-lg rounded-full text-white size-8 flex items-center justify-center">
                {step.number}
              </span>
              <h3 className="font-semibold ml-2 text-xl">{step.title}</h3>
			  </div>
              <p className="text-gray-600 text-sm sm:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
