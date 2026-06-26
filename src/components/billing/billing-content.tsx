"use client";

import React, { useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ExternalLink, Settings } from "lucide-react";
import { createCustomerPortalSession } from "@/actions/payment-actions";

const BillingContent: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  // const [loadingHistory, setLoadingHistory] = useState(true)
  // const [invoices, setInvoices] = useState<Array<{ id: string; created: number; amount: number; currency: string; status: string; url?: string; number?: string | null }>>([])
  // const [receipts, setReceipts] = useState<Array<{ id: string; created: number; amount: number; currency: string; status: string; url?: string; description?: string | null }>>([])

  const handleManageBilling = () => {
    startTransition(async () => {
      try {
        const result = await createCustomerPortalSession();
        if (result.success && result.url) {
          window.location.href = result.url;
        } else {
          toast.error(result.error || "Failed to open customer portal");
        }
      } catch (error) {
        console.error("Error opening customer portal:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  };

  // useEffect(() => {
  //   let isMounted = true
  //   ;(async () => {
  //     try {
  //       const res = await getBillingHistory()
  //       if (isMounted && res.success) {
  //         setInvoices(res.invoices)
  //         setReceipts(res.receipts)
  //       }
  //     } catch (error) {
  //       console.error('Error loading billing history:', error)
  //     } finally {
  //       if (isMounted) setLoadingHistory(false)
  //     }
  //   })()
  //   return () => {
  //     isMounted = false
  //   }
  // }, [])

  return (
    <div className="w-full min-h-screen max-w-full mx-auto px-0 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-semibold tracking-tight mb-1 font-satoshi">
        Billing
      </h1>
      <p className="text-muted-foreground mb-8">
        Manage your invoices and payment methods
      </p>

      <div className="grid gap-2 max-w-4xl">
        <Card className="shadow-none drop-shadow-none gap-2">
          <CardHeader >
            <CardTitle className="flex flex-col gap-4 sm:items-center justify-between sm:flex-row">
              <span>Manage billing</span>
              <Button
                onClick={handleManageBilling}
                disabled={isPending}
                variant="default"
                size="sm"
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
              >
                <Settings className="h-4 w-4" />
                {isPending ? "Opening..." : "Open customer portal"}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground pt-0">
            Access your customer portal to download invoices and update
            payment methods.
          </CardContent>
        </Card>

        {/* <Card className='shadow-none drop-shadow-none'>
          <CardHeader>
            <CardTitle>Payment history</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingHistory ? (
              <div className='text-sm text-muted-foreground'>Loading…</div>
            ) : invoices.length === 0 && receipts.length === 0 ? (
              <div className='text-sm text-muted-foreground'>No payments found.</div>
            ) : (
              <div className='space-y-6'>
                {invoices.length > 0 && (
                  <div>
                    <div className='text-sm font-medium mb-3'>Invoices</div>
                    <ul className='space-y-2'>
                      {invoices.map((inv) => (
                        <li key={inv.id} className='flex items-center justify-between text-sm'>
                          <span>
                            {new Date(inv.created * 1000).toLocaleDateString()} · {inv.currency} {inv.amount.toFixed(2)} · {inv.status}
                          </span>
                          {inv.url && (
                            <a className='text-blue-600 hover:underline' href={inv.url} target='_blank' rel='noreferrer'>View</a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {receipts.length > 0 && (
                  <div>
                    <div className='text-sm font-medium mb-3'>Receipts</div>
                    <ul className='space-y-2'>
                      {receipts.map((rc) => (
                        <li key={rc.id} className='flex items-center justify-between text-sm'>
                          <span>
                            {new Date(rc.created * 1000).toLocaleDateString()} · {rc.currency} {rc.amount.toFixed(2)} · {rc.status}
                          </span>
                          {rc.url && (
                            <a className='text-blue-600 hover:underline' href={rc.url} target='_blank' rel='noreferrer'>View</a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default BillingContent;
