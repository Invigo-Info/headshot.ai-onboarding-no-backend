import * as React from "react";
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
} from "@react-email/components";
import { siteMetaData } from "@/siteMetaData";

const WelcomeEmail = (props: { full_name: string }) => {
  const { full_name = "John" } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Your new professional headshot is just minutes away.</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto">
            {/* Header Section */}
            <Section className="bg-gradient-to-r from-blue-600 to-purple-600 text-center py-[48px] px-[32px] rounded-t-[8px]">
              <Heading className="text-[32px] font-bold m-0 mb-[16px]">
                🎉 Welcome to Headshot.ai!
              </Heading>
              <Text className="text-[18px] m-0 opacity-90">
                Your new professional headshot is just minutes away.
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="px-[32px] py-[40px]">
              <Text className="text-[16px] text-gray-800 mb-[24px] m-0">
                Hey {full_name},
              </Text>

              <Text className="text-[16px] text-gray-800 mb-[24px] m-0">
                Welcome to the Headshot.AI family! 🎉
              </Text>

              <Text className="text-[16px] text-gray-800 mb-[32px] m-0 leading-[24px]">
                We&apos;re excited to have you onboard. With our AI-powered
                technology, you can now create professional, studio-quality
                headshots in just minutes - no need for costly photoshoots or
                scheduling hassles.
              </Text>

              {/* Steps Section */}
              <Section className="mb-[32px]">
                <Heading className="text-[20px] font-bold text-gray-900 mb-[20px] m-0">
                  Here&apos;s what you can do next:
                </Heading>

                <Section className="mb-[16px]">
                  <Text className="text-[16px] text-gray-800 m-0 mb-[8px]">
                    <strong>1. Upload your photos</strong> – a few selfies are
                    enough.
                  </Text>
                </Section>

                <Section className="mb-[16px]">
                  <Text className="text-[16px] text-gray-800 m-0 mb-[8px]">
                    <strong>2. Let our AI do the magic</strong> – your headshots
                    are generated automatically.
                  </Text>
                </Section>

                <Section className="mb-[16px]">
                  <Text className="text-[16px] text-gray-800 m-0 mb-[8px]">
                    <strong>3. Download & share</strong> – get polished images
                    ready for LinkedIn, resumes, or anywhere you need to shine.
                  </Text>
                </Section>
              </Section>

              {/* CTA Button */}
              <Section className="text-center mb-[32px]">
                <Button
                  href={`${siteMetaData.baseUrl}/photos`}
                  className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border hover:bg-blue-700 transition-colors"
                >
                  👉 Get Started Now
                </Button>
              </Section>

              <Text className="text-[16px] text-gray-800 mb-[24px] m-0 leading-[24px]">
                If you ever need help or tips, our support team is here for you.
                Just hit reply to this email.
              </Text>

              <Text className="text-[16px] text-gray-800 mb-[8px] m-0">
                Happy creating,
              </Text>
              <Text className="text-[16px] text-gray-800 font-semibold m-0">
                The Headshot.ai Team
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px] text-center">
              {/* <Text className="text-[12px] text-gray-500 m-0 mb-[8px]">
                Headshot.ai Inc.<br />
                123 AI Street, Tech Valley, CA 94000
              </Text> */}
              <Text className="text-[12px] text-gray-500 m-0">
                {/* <a href="#" className="text-gray-500 underline">Unsubscribe</a> |  */}
                <a
                  href={`${siteMetaData.baseUrl}/privacy-policy`}
                  className="text-gray-500 underline ml-[8px]"
                >
                  Privacy Policy
                </a>
              </Text>
              <Text className="text-[12px] text-gray-500 m-0 mt-[8px]">
                © {new Date().getFullYear()} Headshot.ai. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

WelcomeEmail.PreviewProps = {
  full_name: "John",
};

export default WelcomeEmail;
