import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

/**
 * Renders a card section with support contact information.
 *
 * @returns {JSX.Element} The rendered support section component.
 */
const SupportSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Support</CardTitle>
        <CardDescription>
          Need help with your account or have questions?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Contact our support team at{" "}
          <Link
            prefetch={false}
            href="mailto:support@headshot.ai" // Replace with actual support email
            className="font-medium text-primary underline underline-offset-4"
            target="_blank"
          >
            support@headshot.ai
          </Link>
          {/* TODO: Add link to a help center or FAQ page if available */}
          {/* or visit our <a href="/help-center" className="font-medium text-primary underline underline-offset-4">help center</a>. */}
        </p>
      </CardContent>
    </Card>
  );
};

export default SupportSection;
