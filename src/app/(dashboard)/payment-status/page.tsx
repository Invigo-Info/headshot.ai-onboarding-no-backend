import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PaymentStatusCheck from "@/components/payment-status/payment-status-check";

export default async function PaymentStatusPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims

  if (!user) {
    redirect("/login");
  }

  return <PaymentStatusCheck userId={user.sub} />;
}
