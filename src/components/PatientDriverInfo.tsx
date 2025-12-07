// src/components/PatientDriverInfo.tsx
import React from 'react';
import { User, Phone, Ambulance, Tag } from 'lucide-react';
import { TripDriver } from '../services/PatientService';

interface PatientDriverInfoProps {
  driver: TripDriver;
}

const PatientDriverInfo: React.FC<PatientDriverInfoProps> = ({ driver }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Driver Information</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Driver Name</p>
            <p className="text-foreground font-medium">{driver.driverName}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
            <p className="text-foreground font-medium">{driver.driverPhone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Ambulance className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Ambulance Number</p>
            <p className="text-foreground font-medium">{driver.ambulanceNumber}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Tag className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Ambulance Type</p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {driver.ambulanceType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDriverInfo;