// src/services/PatientService.ts
import api from './api';

export interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

export interface LocationResponse {
  location_id: number;
  message: string;
}

export interface ProfileData {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface UpdateProfileData {
  name: string;
  phone: string;
}

export interface Booking {
  id: number;
  user_id: number;
  pickup_location_id: number;
  drop_location_id: number;
  status: string;
  requested_at: string;
  updated_at: string;
}

export interface CreateBookingData {
  pickup_location_id: number;
  drop_location_id: number;
}

export interface TripLocation {
  address: string;
  lat: number;
  lng: number;
}

export interface TripUser {
  name: string;
  phone: string;
}

export interface TripDriver {
  driverName: string;
  driverPhone: string;
  ambulanceNumber: string;
  ambulanceType: string;
}

export interface TripPayment {
  amount: number;
  method: string;
  status: string;
}

export interface Trip {
  tripId: number;
  startTime: string;
  endTime: string;
  fare: number;
  status: string;
  pickupLocation: TripLocation;
  dropLocation: TripLocation;
  user: TripUser;
  driver: TripDriver;
  payment: TripPayment;
}

class PatientService {
  async getProfile(): Promise<ProfileData> {
    const response = await api.get<ProfileData>('/patient/profile');
    return response.data;
  }

  async updateProfile(data: UpdateProfileData): Promise<ProfileData> {
    const response = await api.put<ProfileData>('/patient/profile', data);
    return response.data;
  }

  async getBookings(): Promise<Booking[]> {
    const response = await api.get<Booking[]>('/bookings');
    return response.data;
  }

  async createLocation(data: Location): Promise<LocationResponse> {
    const response = await api.post<LocationResponse>('/location', data);
    return response.data;
  }

  async createBooking(data: CreateBookingData): Promise<Booking> {
    const response = await api.post<Booking>('/bookings', data);
    return response.data;
  }

  async cancelBooking(id: number): Promise<Booking> {
    const response = await api.put<Booking>(`/patient/bookings/${id}/cancel`);
    return response.data;
  }

  async getTripHistory(): Promise<Trip[]> {
    const response = await api.get<Trip[]>('/patient/trips');
    return response.data;
  }

  async getTripDetails(id: number): Promise<Trip> {
    const response = await api.get<Trip>(`/trips/${id}`);
    return response.data;
  }
}

export default new PatientService();