// src/components/PatientTripCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, MapPin, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Trip } from '../services/PatientService';

interface PatientTripCardProps {
  trip: Trip;
}

const PatientTripCard: React.FC<PatientTripCardProps> = ({ trip }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/trips/${trip.tripId}`)}
      className="bg-card border border-border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Trip #{trip.tripId}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(trip.startTime)}</span>
          </div>
        </div>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            trip.status
          )}`}
        >
          {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
          <div className="text-sm flex-1">
            <p className="text-muted-foreground">From</p>
            <p className="text-foreground font-medium truncate">
              {trip.pickupLocation.address}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
          <div className="text-sm flex-1">
            <p className="text-muted-foreground">To</p>
            <p className="text-foreground font-medium truncate">
              {trip.dropLocation.address}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          <span className="text-lg font-bold text-foreground">${trip.fare.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-1 text-primary">
          <span className="text-sm font-medium">View Details</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
};

export default PatientTripCard;