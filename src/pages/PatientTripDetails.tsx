// src/pages/PatientTripDetails.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, MapPin } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import PatientService, { Trip } from '../services/PatientService';
import PatientDriverInfo from '../components/PatientDriverInfo';
import PatientPaymentInfo from '../components/PatientPaymentInfo';
import PatientLocationMap from '../components/PatientLocationMap';

const PatientTripDetails: React.FC = () => {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetchTripDetails(parseInt(id));
    }
  }, [id]);

  const fetchTripDetails = async (tripId: number) => {
    try {
      setLoading(true);
      const data = await PatientService.getTripDetails(tripId);
      setTrip(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load trip details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate('/trips')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Trips</span>
          </button>
          <div className="text-center p-4">
            <p className="text-red-500 mb-4">{error || 'Trip not found'}</p>
            <button onClick={() => navigate('/trips')} className="text-primary hover:underline">
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/trips')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Trips</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Trip Details</h1>
          <p className="text-muted-foreground">Trip ID: {trip.tripId}</p>
        </motion.div>

        <div className="grid gap-6">
          {/* Trip Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">Trip Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Start Time</p>
                <p className="text-foreground font-medium">{formatDate(trip.startTime)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">End Time</p>
                <p className="text-foreground font-medium">{formatDate(trip.endTime)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                  {trip.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Fare</p>
                <p className="text-foreground font-bold text-lg">${trip.fare.toFixed(2)}</p>
              </div>
            </div>
          </motion.div>

          {/* Locations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">Locations</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Pickup</p>
                  <p className="text-muted-foreground">{trip.pickupLocation.address}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {trip.pickupLocation.lat}, {trip.pickupLocation.lng}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Drop</p>
                  <p className="text-muted-foreground">{trip.dropLocation.address}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {trip.dropLocation.lat}, {trip.dropLocation.lng}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <PatientLocationMap
              pickupLat={trip.pickupLocation.lat}
              pickupLng={trip.pickupLocation.lng}
              dropLat={trip.dropLocation.lat}
              dropLng={trip.dropLocation.lng}
            />
          </motion.div>

          {/* Driver Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <PatientDriverInfo driver={trip.driver} />
          </motion.div>

          {/* Payment Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <PatientPaymentInfo payment={trip.payment} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PatientTripDetails;