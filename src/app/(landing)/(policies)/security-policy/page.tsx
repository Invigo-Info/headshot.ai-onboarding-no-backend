import React from "react";
import Markdown from "react-markdown";
import { securityPolicyContent } from "./security-policy-content";
// import { format } from "date-fns";
import remarkGfm from "remark-gfm";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: 'Security Policy – Protecting Your Data & Privacy | Headshot.ai',
  description: 'Learn how Headshot.ai safeguards your data with encryption, secure storage, and strict access controls. Our Security Policy ensures your information stays private and protected.',
  canonicalPath: '/security-policy',
});

const SecurityPolicyPage = () => {
  return (
    <main className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">Security Policy</h1>
        <div className="mt-8 prose sm:prose-base text-black max-w-5xl mx-auto prose-li:marker:text-blue-500 prose-a:text-blue-500 prose-a:underline prose-a:underline-offset-4 prose-a:decoration-blue-500 prose-a:decoration-2">
          {/* <p className="text-left mt-4">
          <strong className="font-bold">Effective Date:</strong> {format(new Date(), "MMM d, yyyy")}
        </p> */}
          <Markdown remarkPlugins={[remarkGfm]}>
            {securityPolicyContent}
          </Markdown>
        </div>
      </div>
    </main>
  );
};

export default SecurityPolicyPage;
