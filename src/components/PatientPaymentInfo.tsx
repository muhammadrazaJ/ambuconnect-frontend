// src/components/PatientPaymentInfo.tsx
import React from 'react';
import { DollarSign, CreditCard, CheckCircle, Clock } from 'lucide-react';
import { TripPayment } from '../services/PatientService';

interface PatientPaymentInfoProps {
  payment: TripPayment;
}

const PatientPaymentInfo: React.FC<PatientPaymentInfoProps> = ({ payment }) => {
  const getPaymentStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Payment Information</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
            <p className="text-2xl font-bold text-foreground">${payment.amount.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
            <p className="text-foreground font-medium capitalize">{payment.method}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            {getPaymentStatusIcon(payment.status)}
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Status</p>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPaymentStatusColor(
                payment.status
              )}`}
            >
              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPaymentInfo;