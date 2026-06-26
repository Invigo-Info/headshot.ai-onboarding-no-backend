'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CreditCard } from 'lucide-react';

interface NextBillingDateProps {
  subscription?: {
    currentPeriodEnd: string;
    amount: number;
    interval: string;
    status: string;
  };
}

/**
 * Renders the next billing date section.
 * Shows when the next billing will occur and the amount to be charged.
 *
 * @param {NextBillingDateProps} props - The component props.
 * @param {object} props.subscription - The current subscription details.
 * @returns {JSX.Element} The rendered next billing date component.
 */
const NextBillingDate: React.FC<NextBillingDateProps> = ({ subscription }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getDaysUntilNextBilling = (dateString: string) => {
    const nextBillingDate = new Date(dateString);
    const today = new Date();
    const diffTime = nextBillingDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getBillingStatusColor = (daysUntil: number) => {
    if (daysUntil <= 3) {
      return 'bg-red-100 text-red-800 hover:bg-red-100';
    } else if (daysUntil <= 7) {
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
    } else {
      return 'bg-green-100 text-green-800 hover:bg-green-100';
    }
  };

  const getBillingStatusText = (daysUntil: number) => {
    if (daysUntil < 0) {
      return 'Overdue';
    } else if (daysUntil === 0) {
      return 'Due Today';
    } else if (daysUntil === 1) {
      return 'Due Tomorrow';
    } else {
      return `${daysUntil} days remaining`;
    }
  };

  if (!subscription) {
    return (
      <Card className='shadow-none drop-shadow-none'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Calendar className="h-5 w-5" />
            Next Billing Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-center py-6'>
            <p className='text-muted-foreground'>No active subscription found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const daysUntilNextBilling = getDaysUntilNextBilling(subscription.currentPeriodEnd);
  const isActive = subscription.status === 'active';

  return (
    <Card className='shadow-none drop-shadow-none'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Calendar className="h-5 w-5" />
          Next Billing Date
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {isActive ? (
          <>
            {/* Next Billing Date */}
            <div className='space-y-2'>
              <span className='text-sm font-medium text-muted-foreground'>Next billing date:</span>
              <p className='text-lg font-semibold'>{formatDate(subscription.currentPeriodEnd)}</p>
            </div>

            {/* Days Until Next Billing */}
            <div className='flex items-center gap-3'>
              <span className='text-sm font-medium text-muted-foreground'>Status:</span>
              <Badge variant="secondary" className={`${getBillingStatusColor(daysUntilNextBilling)} text-sm`}>
                <Clock className="h-3 w-3 mr-1" />
                {getBillingStatusText(daysUntilNextBilling)}
              </Badge>
            </div>

            {/* Next Billing Amount */}
            <div className='flex items-center gap-3'>
              <span className='text-sm font-medium text-muted-foreground'>Next billing amount:</span>
              <div className='flex items-center gap-2'>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className='text-base font-semibold'>{formatCurrency(subscription.amount)}</span>
              </div>
            </div>

            {/* Billing Summary Card */}
            <div className='mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div>
                  <h4 className='font-medium text-gray-900 mb-1'>Upcoming Charge</h4>
                  <p className='text-sm text-gray-600'>
                    {formatCurrency(subscription.amount)} will be charged on {formatShortDate(subscription.currentPeriodEnd)}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='text-2xl font-bold text-gray-900'>{formatCurrency(subscription.amount)}</p>
                  <p className='text-sm text-gray-500 capitalize'>{subscription.interval}ly</p>
                </div>
              </div>
            </div>

            {/* Warning for Due Soon */}
            {daysUntilNextBilling <= 3 && daysUntilNextBilling >= 0 && (
              <div className='mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
                <div className='flex items-center gap-2'>
                  <Clock className="h-4 w-4 text-blue-600" />
                  <p className='text-sm text-blue-700 font-medium'>
                    Your subscription will renew soon. Please ensure your payment method is up to date.
                  </p>
                </div>
              </div>
            )}

            {/* Overdue Warning */}
            {daysUntilNextBilling < 0 && (
              <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
                <div className='flex items-center gap-2'>
                  <CreditCard className="h-4 w-4 text-red-600" />
                  <p className='text-sm text-red-700 font-medium'>
                    Your payment is overdue. Please update your payment method to continue your subscription.
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className='text-center py-6'>
            <p className='text-muted-foreground mb-2'>Subscription is not active</p>
            <p className='text-sm text-gray-500'>
              Status: <span className='capitalize'>{subscription.status.replace('_', ' ')}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NextBillingDate; 