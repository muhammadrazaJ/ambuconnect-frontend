// src/pages/PatientTripHistory.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PatientService, { Trip } from '../services/PatientService';
import PatientTripCard from '../components/PatientTripCard';

const PatientTripHistory: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const data = await PatientService.getTripHistory();
      setTrips(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load trips');
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/patient/dashboard')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <History className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Trip History</h1>
          </div>
          <p className="text-muted-foreground">View all your past ambulance trips</p>
        </motion.div>

        {error && (
          <div className="text-center p-4">
            <p className="text-red-500 mb-4">{error}</p>
            <button onClick={fetchTrips} className="text-primary hover:underline">
              Try Again
            </button>
          </div>
        )}

        {!error && trips.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <History className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No trips yet</h3>
            <p className="text-muted-foreground">Your completed trips will appear here</p>
          </motion.div>
        )}

        {!error && trips.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {trips.map((trip, index) => (
              <motion.div
                key={trip.tripId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PatientTripCard trip={trip} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientTripHistory;