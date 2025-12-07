// src/components/PatientBookingCard.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, X, Loader2 } from 'lucide-react';
import { Booking } from '../services/PatientService';

interface PatientBookingCardProps {
  booking: Booking;
  onCancel: (id: number) => Promise<void>;
}

const PatientBookingCard: React.FC<PatientBookingCardProps> = ({ booking, onCancel }) => {
  const [cancelling, setCancelling] = useState(false);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }
    setCancelling(true);
    try {
      await onCancel(booking.id);
    } finally {
      setCancelling(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const canCancel = booking.status.toLowerCase() === 'pending';

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Booking #{booking.id}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(booking.requested_at)}</span>
          </div>
        </div>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            booking.status
          )}`}
        >
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-muted-foreground">Pickup Location ID</p>
            <p className="text-foreground font-medium">{booking.pickup_location_id}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-muted-foreground">Drop Location ID</p>
            <p className="text-foreground font-medium">{booking.drop_location_id}</p>
          </div>
        </div>
      </div>

      {canCancel && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCancel}
          disabled={cancelling}
          className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {cancelling ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <X className="w-4 h-4" />
              <span>Cancel Booking</span>
            </>
          )}
        </motion.button>
      )}
    </div>
  );
};

export default PatientBookingCard;