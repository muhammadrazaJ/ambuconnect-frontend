// src/components/PatientLocationMap.tsx
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface PatientLocationMapProps {
  pickupLat: number;
  pickupLng: number;
  dropLat: number;
  dropLng: number;
}

// Fix for default marker icons in Leaflet with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PatientLocationMap: React.FC<PatientLocationMapProps> = ({
  pickupLat,
  pickupLng,
  dropLat,
  dropLng,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(
      [(pickupLat + dropLat) / 2, (pickupLng + dropLng) / 2],
      12
    );

    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Create custom icons
    const pickupIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: #3b82f6; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
        <span style="color: white; font-weight: bold; font-size: 14px;">P</span>
      </div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    const dropIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: #10b981; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
        <span style="color: white; font-weight: bold; font-size: 14px;">D</span>
      </div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    // Add markers
    const pickupMarker = L.marker([pickupLat, pickupLng], { icon: pickupIcon })
      .addTo(map)
      .bindPopup('<strong>Pickup Location</strong>');

    const dropMarker = L.marker([dropLat, dropLng], { icon: dropIcon })
      .addTo(map)
      .bindPopup('<strong>Drop Location</strong>');

    // Draw line between markers
    const line = L.polyline(
      [
        [pickupLat, pickupLng],
        [dropLat, dropLng],
      ],
      {
        color: '#3b82f6',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10',
      }
    ).addTo(map);

    // Fit bounds to show both markers
    const bounds = L.latLngBounds([
      [pickupLat, pickupLng],
      [dropLat, dropLng],
    ]);
    map.fitBounds(bounds, { padding: [50, 50] });

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [pickupLat, pickupLng, dropLat, dropLng]);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">Route Map</h2>
      </div>
      <div ref={mapRef} style={{ height: '400px', width: '100%' }} />
    </div>
  );
};

export default PatientLocationMap;