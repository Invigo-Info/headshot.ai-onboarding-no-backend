import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import { siteMetaData } from '@/siteMetaData';

const HeadshotTrainingFailureEmail = (props: { full_name: string, link: string }) => {
  const { full_name = "John", link = "https://headshot.ai" } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>We&apos;re sorry your headshots couldn&apos;t be created - let&apos;s fix this together</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[24px] font-bold text-gray-900 m-0 mb-[8px]">
                Oops! Your headshots couldn&apos;t be created
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                (but we&apos;ll fix it)
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-800 leading-[24px] mb-[16px]">
                Hi {full_name},
              </Text>
              
              <Text className="text-[16px] text-gray-800 leading-[24px] mb-[24px]">
                We&apos;re really sorry - your headshots couldn&apos;t be generated this time. Occasionally, things don&apos;t go as planned due to issues like low-quality input photos or a hiccup in our AI process.
              </Text>

              <Text className="text-[16px] text-gray-800 leading-[24px] mb-[32px]">
                But don&apos;t worry - we&apos;re here to make it right:
              </Text>

              {/* CTA Buttons */}
              <Section className="mb-[24px]">
                <Button
                  href={link}
                  className="bg-blue-600 text-white px-[24px] py-[12px] rounded-[6px] text-[16px] font-semibold no-underline inline-block mr-[16px] mb-[12px] box-border"
                >
                  👉 Try Again Now
                </Button>
                
                <Button
                  href={`mailto:${siteMetaData.supportEmail}`}
                  className="bg-gray-800 text-white px-[24px] py-[12px] rounded-[6px] text-[16px] font-semibold no-underline inline-block box-border"
                >
                  👉 Contact Support
                </Button>
              </Section>

              <Text className="text-[16px] text-gray-800 leading-[24px] mb-[24px]">
                Your satisfaction is our top priority, and we&apos;ll do everything we can to get you the professional headshots you deserve.
              </Text>

              <Text className="text-[16px] text-gray-800 leading-[24px] mb-[24px]">
                Thank you for your patience and for trusting Headshot.ai.
              </Text>

              <Text className="text-[16px] text-gray-800 leading-[24px] mb-[8px]">
                Cheers,
              </Text>
              <Text className="text-[16px] font-semibold text-gray-900 m-0">
                The Headshot.ai Team
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px] mt-[40px]">
              <Text className="text-[12px] text-gray-500 text-center leading-[16px] m-0 mb-[8px]">
                Headshot.ai Inc.
              </Text>
              {/* <Text className="text-[12px] text-gray-500 text-center leading-[16px] m-0 mb-[8px]">
                123 AI Street, Tech Valley, CA 94000
              </Text> */}
              <Text className="text-[12px] text-gray-500 text-center leading-[16px] m-0">
                {/* <Link href="https://headshot.ai/unsubscribe" className="text-gray-500 underline">
                  Unsubscribe
                </Link>
                {" | "} */}
                © {new Date().getFullYear()} Headshot.ai. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

HeadshotTrainingFailureEmail.PreviewProps = {
  full_name: "John",
  link: "https://headshot.ai",
};

export default HeadshotTrainingFailureEmail;