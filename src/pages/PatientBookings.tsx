// src/pages/PatientBookings.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PatientService, { Booking } from '../services/PatientService';
import PatientBookingCard from '../components/PatientBookingCard';

const PatientBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await PatientService.getBookings();
      setBookings(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: number) => {
    try {
      await PatientService.cancelBooking(id);
      fetchBookings();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to cancel booking');
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
          onClick={() => navigate('/dashboard')}
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
            <Calendar className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">My Bookings</h1>
          </div>
          <p className="text-muted-foreground">View and manage your ambulance bookings</p>
        </motion.div>

        {error && (
          <div className="text-center p-4">
            <p className="text-red-500 mb-4">{error}</p>
            <button onClick={fetchBookings} className="text-primary hover:underline">
              Try Again
            </button>
          </div>
        )}

        {!error && bookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No bookings yet</h3>
            <p className="text-muted-foreground mb-6">Start by creating a new booking</p>
            <button
              onClick={() => navigate('/booking/new')}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Create Booking
            </button>
          </motion.div>
        )}

        {!error && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PatientBookingCard booking={booking} onCancel={handleCancel} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientBookings;