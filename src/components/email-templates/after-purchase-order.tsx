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

const HeadshotPurchaseConfirmation = (props: { full_name: string, link: string }) => {
  const { full_name = "John", link = "https://headshot.ai/dashboard" } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>
          Success! Your Headshot.ai order is confirmed - Let&apos;s create
          amazing headshots together
        </Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto px-[40px] py-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Text className="text-[24px] font-bold text-gray-900 m-0">
                Headshot.ai
              </Text>
            </Section>

            {/* Success Message */}
            <Section className="text-center mb-[32px]">
              <Text className="text-[32px] m-0 mb-[8px]">✅</Text>
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[16px]">
                Success! Your order is confirmed
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                Welcome aboard the Headshot.ai experience!
              </Text>
            </Section>

            {/* Welcome Message */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-800 m-0 mb-[16px]">
                Hi {full_name},
              </Text>
              <Text className="text-[16px] text-gray-800 m-0 mb-[24px] leading-[24px]">
                We&apos;re thrilled to help you create headshots that truly make
                you shine in the professional world.
              </Text>
            </Section>

            {/* Process Steps */}
            <Section className="mb-[32px]">
              <Heading className="text-[20px] font-bold text-gray-900 m-0 mb-[20px]">
                Here&apos;s what happens next:
              </Heading>

              <Section className="mb-[16px]">
                <Text className="text-[16px] text-gray-800 m-0 mb-[4px] font-semibold">
                  Upload your photos
                </Text>
                <Text className="text-[14px] text-gray-600 m-0 leading-[20px]">
                  Just 6–12 casual selfies are all you need.
                </Text>
              </Section>

              <Section className="mb-[16px]">
                <Text className="text-[16px] text-gray-800 m-0 mb-[4px] font-semibold">
                  AI goes to work
                </Text>
                <Text className="text-[14px] text-gray-600 m-0 leading-[20px]">
                  Our advanced AI will transform them into professional,
                  polished headshots.
                </Text>
              </Section>

              <Section className="mb-[16px]">
                <Text className="text-[16px] text-gray-800 m-0 mb-[4px] font-semibold">
                  Your results are ready
                </Text>
                <Text className="text-[14px] text-gray-600 m-0 leading-[20px]">
                  Get multiple high-quality headshots ready for your
                  professional needs.
                </Text>
              </Section>
            </Section>

            {/* CTA Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={link}
                className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-semibold no-underline box-border"
              >
                👉 Upload Your Photos
              </Button>
            </Section>

            {/* Closing Message */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-800 m-0 mb-[16px] leading-[24px]">
                We can&apos;t wait to show you the magic. Your transformation
                starts now!
              </Text>
              <Text className="text-[16px] text-gray-800 m-0">
                Cheers,
                <br />
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

HeadshotPurchaseConfirmation.PreviewProps = {
  full_name: "John",
  link: "https://headshot.ai/dashboard",
};

export default HeadshotPurchaseConfirmation;
