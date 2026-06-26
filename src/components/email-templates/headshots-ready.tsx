import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from '@react-email/components';

const HeadshotDeliveryEmail = (props: { firstName: string; galleryUrl: string }) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-lg max-w-[600px] mx-auto">
            {/* Header Section */}
            <Section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-[8px] px-[32px] py-[40px] text-center">
              <Text className="text-[28px] font-bold m-0 leading-tight">
                Your Headshots Are Ready! 🎉
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="px-[32px] py-[32px]">
              <Text className="text-gray-800 text-[16px] leading-relaxed mb-[24px]">
                Hello {props.firstName},
              </Text>

              <Text className="text-gray-700 text-[16px] leading-relaxed mb-[24px]">
                Thank you for trusting us with your professional headshots. We&apos;re excited to let you know that your photos have been successfully processed and are now ready to view and download.
              </Text>

              <Text className="text-gray-700 text-[16px] leading-relaxed mb-[32px]">
                👉 Click the button below to access your gallery:
              </Text>

              {/* CTA Button - Fixed */}
              <Section className="text-center mb-[32px]">
                <Button
                  href={props.galleryUrl}
                  className="bg-blue-600 text-white px-[40px] py-[16px] rounded-[8px] text-[18px] font-bold no-underline box-border"
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    padding: '16px 40px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    border: 'none'
                  }}
                >
                  View & Download My Headshots
                </Button>
              </Section>

              <Text className="text-gray-700 text-[16px] leading-relaxed mb-[24px]">
                We&apos;ve generated multiple high-quality headshots so you can choose the ones that best fit your professional style.
              </Text>

              <Text className="text-gray-700 text-[16px] leading-relaxed mb-[32px]">
                If you have any questions, our team is always here to help-just reply to this email.
              </Text>

              <Text className="text-gray-800 text-[16px] font-medium mb-[8px]">
                Enjoy your new headshots!
              </Text>

              <Text className="text-blue-600 text-[16px] font-semibold m-0">
                The Headshot.ai Team
              </Text>
            </Section>

            <Hr className="border-gray-200 mx-[32px]" />

            {/* Footer */}
            <Section className="px-[32px] py-[24px] text-center">
              <Text className="text-gray-500 text-[12px] leading-relaxed m-0 mb-[8px]">
                Headshot.ai - Professional AI-Generated Headshots
              </Text>
              {/* <Text className="text-gray-500 text-[12px] leading-relaxed m-0 mb-[8px]">
                123 Tech Street, San Francisco, CA 94105
              </Text> */}
              <Text className="text-gray-500 text-[12px] leading-relaxed m-0">
                {/* <a href="#" className="text-gray-500 underline">Unsubscribe</a> |  */}
                ©{new Date().getFullYear()} Headshot.ai. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

HeadshotDeliveryEmail.PreviewProps = {
  firstName: "",
  galleryUrl: "https://headshot.ai/albums",
};

export default HeadshotDeliveryEmail;