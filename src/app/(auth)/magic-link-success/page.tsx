import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Page() {
  return (
    <div className="flex w-full items-center justify-center p-0">
      <div className="w-full max-w-lg">
        <div className="flex flex-col gap-6 w-full">
          <Card className="shadow-none border-none max-w-full">
            <CardHeader className="flex flex-col items-center justify-center gap-2">
              <BadgeCheck className="size-16 mr-2 text-green-500 border-0 bg-green-50 rounded-full p-2" />
              <CardTitle className="text-2xl font-mont">
                Check your email{" "}
              </CardTitle>
              <CardDescription className="text-center">
                A link has been sent to your email to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-2 text-center">
              <p className="text-sm text-muted-foreground">
                This link will expire in 60 minutes. Make sure to check your
                spam folder.
              </p>
              <Button variant="default" className="w-full mt-4" asChild>
                <Link href="/login">Back to login </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
