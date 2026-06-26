import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface ContactEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const ContactEmail = ({ firstName, lastName, email, phoneNumber, message }: ContactEmailProps) => {
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>New Contact Form Submission from {fullName}</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto">
            {/* Header Section */}
            <Section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-[48px] px-[32px] rounded-t-[8px]">
              <Heading className="text-[32px] font-bold m-0 mb-[16px]">
                📬 New Contact Form Submission
              </Heading>
              <Text className="text-[18px] m-0 opacity-90">
                Message from {fullName}
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="px-[32px] py-[40px]">
              <Text className="text-[16px] text-gray-800 mb-[24px] m-0">
                You have received a new contact form submission from a visitor.
              </Text>

              {/* Contact Details */}
              <Section className="mb-[32px]">
                <Heading className="text-[20px] font-bold text-gray-900 mb-[20px] m-0">
                  Contact Information:
                </Heading>

                <Text className="text-[16px] text-gray-800 mb-[8px] m-0">
                  <strong>Full Name:</strong> {fullName}
                </Text>
                <Text className="text-[16px] text-gray-800 mb-[8px] m-0">
                  <strong>Email:</strong> {email}
                </Text>
                <Text className="text-[16px] text-gray-800 mb-[8px] m-0">
                  <strong>Phone Number:</strong> {phoneNumber || 'Not provided'}
                </Text>
              </Section>

              {/* Message */}
              <Section className="mb-[32px]">
                <Heading className="text-[20px] font-bold text-gray-900 mb-[20px] m-0">
                  Message:
                </Heading>

                <Section className="bg-gray-50 p-[16px] rounded-[8px] border-l-4 border-blue-500">
                  <Text className="text-[16px] text-gray-800 m-0 whitespace-pre-wrap">
                    {message}
                  </Text>
                </Section>
              </Section>

              {/* Reply CTA */}
              <Section className="text-center mb-[32px]">
                <Text className="text-[16px] text-gray-800 mb-[16px] m-0">
                  Click below to reply directly to the contact:
                </Text>
                <Text className="text-[16px] m-0">
                  <a
                    href={`mailto:${email}`}
                    className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[8px] text-[16px] font-semibold no-underline box-border hover:bg-blue-700 transition-colors inline-block"
                  >
                    📧 Reply to {fullName}
                  </a>
                </Text>
              </Section>

              <Text className="text-[16px] text-gray-800 mb-[8px] m-0">
                Best regards,
              </Text>
              <Text className="text-[16px] text-gray-800 font-semibold m-0">
                Headshot.ai Support System
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px] text-center">
              <Text className="text-[12px] text-gray-500 m-0">
                <a
                  href="https://headshot.ai"
                  className="text-gray-500 underline"
                >
                  Headshot.ai
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

ContactEmail.PreviewProps = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phoneNumber: "+1 (555) 234-5678",
  message: "I have a question about your AI headshot generation service. Can you provide more information about the different pricing tiers and what each includes?",
};

export default ContactEmail;
