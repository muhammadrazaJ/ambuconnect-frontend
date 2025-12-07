// src/pages/PatientDashboard.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, MapPin, Loader2, Plus, History, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PatientService, { ProfileData, Booking } from '../services/PatientService';
import { auth } from '../services/api';

const PatientDashboard: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [profileData, bookingsData] = await Promise.all([
        PatientService.getProfile(),
        PatientService.getBookings(),
      ]);
      setProfile(profileData);
      setBookings(bookingsData.filter(b => b.status === 'pending'));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchDashboardData} className="text-primary hover:underline">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">AmbuConnect</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {profile?.name}!
          </h2>
          <p className="text-muted-foreground">
            Manage your ambulance bookings and trips
          </p>
        </motion.div>

        {/* Current Bookings Summary */}
        {bookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 p-6 bg-primary/10 border border-primary/20 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Active Bookings
            </h3>
            <p className="text-muted-foreground">
              You have {bookings.length} pending booking{bookings.length > 1 ? 's' : ''}
            </p>
          </motion.div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/booking/new')}
            className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all text-left"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">New Booking</h3>
            <p className="text-sm text-muted-foreground">Request an ambulance</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/bookings')}
            className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all text-left"
          >
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">My Bookings</h3>
            <p className="text-sm text-muted-foreground">View current bookings</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/trips')}
            className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all text-left"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <History className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Trip History</h3>
            <p className="text-sm text-muted-foreground">View past trips</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/profile')}
            className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all text-left"
          >
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Profile</h3>
            <p className="text-sm text-muted-foreground">Update your info</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;