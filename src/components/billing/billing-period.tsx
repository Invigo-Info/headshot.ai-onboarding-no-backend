"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface BillingPeriodProps {
  subscription?: {
    id: string;
    interval: string;
    amount: number;
    currentPeriodStart: string;
    currentPeriodEnd: string;
  };
  onSubscriptionUpdate?: () => void;
}

/**
 * Renders the billing period section with conversion options.
 * Shows current billing cycle and allows conversion to yearly billing if on weekly plan.
 *
 * @param {BillingPeriodProps} props - The component props.
 * @param {object} props.subscription - The current subscription details.
 * @param {function} props.onSubscriptionUpdate - Callback when subscription is updated.
 * @returns {JSX.Element} The rendered billing period component.
 */
const BillingPeriod: React.FC<BillingPeriodProps> = ({
  subscription,
  //   onSubscriptionUpdate
}) => {
  //   const [isPending, startTransition] = useTransition();
  //   const [isDialogOpen, setIsDialogOpen] = useState(false);

  /**
   * Handles conversion from weekly to yearly billing.
   */
  //   const handleConvertToYearly = () => {
  //     startTransition(async () => {
  //       try {
  //         const result = await convertToYearlySubscription();
  //         if (result.success) {
  //           toast.success(result.message || 'Successfully converted to yearly billing', {duration: 10000});
  //           setIsDialogOpen(false);
  //           onSubscriptionUpdate?.();
  //         } else {
  //           toast.error(result.error || 'Failed to convert subscription');
  //         }
  //       } catch (error) {
  //         console.error('Error converting subscription:', error);
  //         toast.error('An unexpected error occurred. Please try again.');
  //       }
  //     });
  //   };

  const formatInterval = (interval: string) => {
    switch (interval) {
      case "week":
        return "Weekly";
      case "year":
        return "Yearly";
      case "month":
        return "Monthly";
      default:
        return interval.charAt(0).toUpperCase() + interval.slice(1);
    }
  };

  const getIntervalColor = (interval: string) => {
    switch (interval) {
      case "year":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "week":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "month":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (!subscription) {
    return (
      <Card className="shadow-none drop-shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Billing Period
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-muted-foreground">
              No active subscription found
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  //   const isWeekly = subscription.interval === 'week';

  return (
    <Card className="shadow-none drop-shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Billing Period
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Billing Cycle */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            Billing Cycle:
          </span>
          <Badge
            variant="secondary"
            className={cn(getIntervalColor(subscription.interval), "text-sm")}
          >
            <Clock className="h-3 w-3 mr-1" />
            {formatInterval(subscription.interval)}
          </Badge>
        </div>

        {/* Current Amount */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            Current Rate:
          </span>
          <span className="text-base font-semibold">
            {formatCurrency(subscription.amount)} / {subscription.interval}
          </span>
        </div>

        {/* Billing Period Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">
              Period Start:
            </span>
            <p className="text-base">
              {formatDate(subscription.currentPeriodStart)}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">
              Period End:
            </span>
            <p className="text-base">
              {formatDate(subscription.currentPeriodEnd)}
            </p>
          </div>
        </div>

        {/* Convert to Yearly Option */}
        {/* isWeekly && (
          <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <h4 className='font-medium text-green-900 mb-2 flex items-center gap-2'>
                  <TrendingUp className="h-4 w-4" />
                  Save with Yearly Billing
                </h4>
                <p className='text-sm text-green-700 mb-3'>
                  Switch to yearly billing.
                  You&apos;ll be charged once the current billing period ends.
                </p>
                
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="default"
                      size="sm"
                      className='bg-green-600 hover:bg-green-700 text-white'
                      disabled={isPending}
                    >
                      Convert to Yearly
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Convert to Yearly Billing?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will convert your weekly subscription to yearly billing. You&apos;ll be charged 
                        once the current billing period ends.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleConvertToYearly}
                        disabled={isPending}
                        className='bg-green-600 hover:bg-green-700'
                      >
                        {isPending ? 'Converting...' : 'Convert to Yearly'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ) */}
      </CardContent>
    </Card>
  );
};

export default BillingPeriod;
