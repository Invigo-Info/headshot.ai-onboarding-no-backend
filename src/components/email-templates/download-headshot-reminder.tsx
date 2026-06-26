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

const HeadshotExpirationWarningEmail = (props: { firstName: string; galleryUrl: string }) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-lg max-w-[600px] mx-auto">
            {/* Header Section - Warning Colors */}
            <Section className="bg-gradient-to-r from-red-600 to-orange-600 rounded-t-[8px] px-[32px] py-[40px] text-center">
              <Text className="text-[28px] font-bold m-0 leading-tight">
                ⚠️ Download Your Headshots Now!
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="px-[32px] py-[32px]">
              <Text className="text-gray-800 text-[16px] leading-relaxed mb-[24px]">
                Hello {props.firstName},
              </Text>

              <Text className="text-red-700 text-[18px] font-bold leading-relaxed mb-[24px]">
                URGENT: Your AI-generated headshots will be permanently deleted in less than 24 hours!
              </Text>

              <Text className="text-gray-700 text-[16px] leading-relaxed mb-[24px]">
                This is your final reminder to download your professional headshots before they are automatically removed from our servers. Once deleted, these photos cannot be recovered.
              </Text>

              <Text className="text-gray-700 text-[16px] leading-relaxed mb-[32px]">
                🚨 Don&apos;t miss out - download all your headshots now:
              </Text>

              {/* CTA Button - Urgent Styling */}
              <Section className="text-center mb-[32px]">
                <Button
                  href={props.galleryUrl}
                  className="bg-red-600 text-white px-[40px] py-[16px] rounded-[8px] text-[18px] font-bold no-underline box-border"
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#dc2626',
                    color: '#ffffff',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    padding: '16px 40px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    border: 'none'
                  }}
                >
                  Download My Headshots Now
                </Button>
              </Section>

              <Text className="text-gray-700 text-[16px] leading-relaxed mb-[24px]">
                We recommend downloading all variations of your headshots to ensure you have the perfect professional photos for your needs. Each image is high-resolution and ready for immediate use.
              </Text>

              <Text className="text-orange-700 text-[16px] font-semibold leading-relaxed mb-[24px] bg-orange-50 p-[16px] rounded-[8px] border-l-[4px] border-orange-500">
                💡 Pro Tip: Save all your headshots to multiple locations to ensure you never lose access to your professional photos.
              </Text>

              <Text className="text-gray-700 text-[16px] leading-relaxed mb-[32px]">
                If you need any assistance with downloading your photos, please send your query to support@headshot.ai. 
              </Text>

              <Text className="text-gray-800 text-[16px] font-medium mb-[8px]">
                Act fast - time is running out!
              </Text>

              <Text className="text-red-600 text-[16px] font-semibold m-0">
                The Headshot.ai Team
              </Text>
            </Section>

            <Hr className="border-gray-200 mx-[32px]" />

            {/* Footer */}
            <Section className="px-[32px] py-[24px] text-center">
              <Text className="text-gray-500 text-[12px] leading-relaxed m-0 mb-[8px]">
                Headshot.ai - Professional AI-Generated Headshots
              </Text>
              <Text className="text-gray-500 text-[12px] leading-relaxed m-0">
                ©{new Date().getFullYear()} Headshot.ai. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

HeadshotExpirationWarningEmail.PreviewProps = {
  firstName: "John",
  galleryUrl: "https://headshot.ai/albums",
};

export default HeadshotExpirationWarningEmail;