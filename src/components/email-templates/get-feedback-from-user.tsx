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

const GetFeedbackFromUserEmail = (props: { firstName: string; feedbackUrl: string}) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Text className="text-[24px] font-bold text-gray-900 m-0">
                Headshot.ai
              </Text>
            </Section>

            {/* Main Content */}
            <Section>
              <Text className="text-[18px] font-semibold text-gray-900 mb-[16px]">
                Hi {props.firstName},
              </Text>
              
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[20px]">
                We hope you&apos;re enjoying your new professional headshots! Your opinion means a lot to us, and we&apos;d love to know how we did.
              </Text>
              
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[32px]">
                Please take a few seconds to rate your experience-it helps us improve and ensures we deliver the best possible results for you.
              </Text>

              {/* CTA Button */}
              <Section className="text-center mb-[32px]">
                <Button
                  href={props.feedbackUrl}
                  className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border hover:bg-blue-700"
                >
                  👉 Leave Feedback
                </Button>
              </Section>

              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                Thank you so much for helping us grow and serve you better!
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[8px]">
                Cheers,
              </Text>
              <Text className="text-[16px] font-semibold text-gray-900 mb-[40px]">
                The Headshot.ai Team
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[32px]" />

            {/* Footer */}
            <Section className="text-center">
              <Text className="text-[14px] text-gray-500 leading-[20px] m-0 mb-[8px]">
                Headshot.ai
              </Text>
              {/* <Text className="text-[14px] text-gray-500 leading-[20px] m-0 mb-[8px]">
                123 AI Street, Tech Valley, CA 94000
              </Text> */}
              <Text className="text-[14px] text-gray-500 leading-[20px] m-0">
                {' • '}
                © {new Date().getFullYear()} Headshot.ai. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

GetFeedbackFromUserEmail.PreviewProps = {
  firstName: "John",
  feedbackUrl: "https://headshot.ai/feedback",
};

export default GetFeedbackFromUserEmail;