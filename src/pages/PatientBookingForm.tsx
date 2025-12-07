// src/pages/PatientBookingForm.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Loader2, ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PatientService, { Location } from '../services/PatientService';

interface LocationInput {
  address: string;
  latitude: string;
  longitude: string;
}

const PatientBookingForm: React.FC = () => {
  const [pickup, setPickup] = useState<LocationInput>({
    address: '',
    latitude: '',
    longitude: '',
  });
  const [drop, setDrop] = useState<LocationInput>({
    address: '',
    latitude: '',
    longitude: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickup({ ...pickup, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleDropChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDrop({ ...drop, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!pickup.address || !pickup.latitude || !pickup.longitude) {
        throw new Error('Please fill in all pickup location fields');
      }
      if (!drop.address || !drop.latitude || !drop.longitude) {
        throw new Error('Please fill in all drop location fields');
      }

      const pickupData: Location = {
        address: pickup.address,
        latitude: parseFloat(pickup.latitude),
        longitude: parseFloat(pickup.longitude),
      };

      const dropData: Location = {
        address: drop.address,
        latitude: parseFloat(drop.latitude),
        longitude: parseFloat(drop.longitude),
      };

      const pickupResponse = await PatientService.createLocation(pickupData);
      const dropResponse = await PatientService.createLocation(dropData);

      await PatientService.createBooking({
        pickup_location_id: pickupResponse.location_id,
        drop_location_id: dropResponse.location_id,
      });

      navigate('/bookings');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to create booking';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          className="bg-card border border-border rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">New Booking</h1>
              <p className="text-muted-foreground">Request an ambulance service</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Pickup Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Pickup Location
              </h3>
              <div className="space-y-4 pl-7">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={pickup.address}
                    onChange={handlePickupChange}
                    placeholder="e.g., Street 2, San Francisco"
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      name="latitude"
                      value={pickup.latitude}
                      onChange={handlePickupChange}
                      placeholder="e.g., 37.7"
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      name="longitude"
                      value={pickup.longitude}
                      onChange={handlePickupChange}
                      placeholder="e.g., 122.4"
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Drop Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-secondary" />
                Drop Location
              </h3>
              <div className="space-y-4 pl-7">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={drop.address}
                    onChange={handleDropChange}
                    placeholder="e.g., Street 6, San Francisco"
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      name="latitude"
                      value={drop.latitude}
                      onChange={handleDropChange}
                      placeholder="e.g., 39.7"
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      name="longitude"
                      value={drop.longitude}
                      onChange={handleDropChange}
                      placeholder="e.g., 125.4"
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-500 text-sm bg-red-50 p-3 rounded-md border border-red-200"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Create Booking</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PatientBookingForm;