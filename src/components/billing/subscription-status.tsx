'use client';

import React, { useTransition } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createCustomerPortalSession } from '@/actions/payment-actions';
import { toast } from 'sonner';
import { ExternalLink, Settings } from 'lucide-react';

interface SubscriptionStatusProps {
  subscription?: {
    id: string;
    status: string;
    plan: string;
    maxModels: number;
    packsPerPeriod: number;
  };
}

/**
 * Renders the subscription status section with manage subscription button.
 * Shows current subscription details and provides access to Stripe customer portal.
 *
 * @param {SubscriptionStatusProps} props - The component props.
 * @param {object} props.subscription - The current subscription details.
 * @returns {JSX.Element} The rendered subscription status component.
 */
const SubscriptionStatus: React.FC<SubscriptionStatusProps> = ({ subscription }) => {
  const [isPending, startTransition] = useTransition();

  /**
   * Handles opening the Stripe customer portal for subscription management.
   */
  const handleManageSubscription = () => {
    startTransition(async () => {
      try {
        const result = await createCustomerPortalSession();
        if (result.success && result.url) {
          window.location.href = result.url;
        } else {
          toast.error(result.error || 'Failed to open customer portal');
        }
      } catch (error) {
        console.error('Error opening customer portal:', error);
        toast.error('An unexpected error occurred. Please try again.');
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'canceled':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
  };

  return (
    <Card className='shadow-none drop-shadow-none'>
      <CardHeader>
        <CardTitle className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
          <span>Subscription Status</span>
          {subscription && (
            <Button
              onClick={handleManageSubscription}
              disabled={isPending}
              variant="default"
              size="sm"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            >
              <Settings className="h-4 w-4" />
              {isPending ? 'Opening...' : 'Manage Subscription'}
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {subscription ? (
          <>
            {/* Status Badge */}
           <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
           <div className='flex flex-col items-start gap-3'>
              <span className='text-sm font-medium text-muted-foreground'>Status:</span>
              <Badge variant="secondary" className={`${getStatusColor(subscription.status)} text-sm`}>
                {formatStatus(subscription.status)}
              </Badge>
            </div>

            <div className='space-y-2'>
                <span className='text-sm font-medium text-muted-foreground'>Plan:</span>
                <p className='text-base font-medium capitalize'>{subscription.plan}</p>
              </div>
           </div>

            {/* Plan Details */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              
              
              <div className='space-y-2'>
                <span className='text-sm font-medium text-muted-foreground'>Max Models:</span>
                <p className='text-base font-medium'>{subscription.maxModels}</p>
              </div>
              
              <div className='space-y-2'>
                <span className='text-sm font-medium text-muted-foreground'>Packs per Period:</span>
                <p className='text-base font-medium'>{subscription.packsPerPeriod}</p>
              </div>
            </div>
          </>
        ) : (
          <div className='text-center py-6'>
            <p className='text-muted-foreground mb-4'>No active subscription found</p>
            <Button variant="outline" asChild>
              <a href="/pricing">View Plans</a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionStatus; 