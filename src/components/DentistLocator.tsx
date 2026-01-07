import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Phone, Clock, Star, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom dental clinic icon
const clinicIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  rating: number;
  lat: number;
  lng: number;
}

const mockClinics: Clinic[] = [
  {
    id: '1',
    name: 'Klinik Gigi Sehat',
    address: 'Jl. Sudirman No. 45, Jakarta Pusat',
    phone: '(021) 555-0123',
    hours: '08:00 - 20:00',
    rating: 4.8,
    lat: -6.2088,
    lng: 106.8456,
  },
  {
    id: '2',
    name: 'Drg. Budi Santoso',
    address: 'Jl. Gatot Subroto No. 12, Jakarta Selatan',
    phone: '(021) 555-0456',
    hours: '09:00 - 17:00',
    rating: 4.9,
    lat: -6.2350,
    lng: 106.8260,
  },
  {
    id: '3',
    name: 'Dental Care Indonesia',
    address: 'Jl. Thamrin No. 88, Jakarta Pusat',
    phone: '(021) 555-0789',
    hours: '08:00 - 21:00',
    rating: 4.7,
    lat: -6.1950,
    lng: 106.8230,
  },
  {
    id: '4',
    name: 'Smile Dental Clinic',
    address: 'Jl. Kuningan No. 23, Jakarta Selatan',
    phone: '(021) 555-0321',
    hours: '10:00 - 18:00',
    rating: 4.6,
    lat: -6.2200,
    lng: 106.8350,
  },
];

export function DentistLocator() {
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [mapCenter] = useState<[number, number]>([-6.2088, 106.8456]);

  const handleGetDirections = (clinic: Clinic) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lng}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-12 print:hidden">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Dokter Gigi Terdekat</h2>
        <p className="text-muted-foreground">
          Temukan klinik dan dokter gigi terbaik di sekitar Anda
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Map Section */}
        <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border h-[400px] lg:h-[500px]">
          <MapContainer
            center={mapCenter}
            zoom={13}
            scrollWheelZoom={false}
            className="w-full h-full z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mockClinics.map((clinic) => (
              <Marker
                key={clinic.id}
                position={[clinic.lat, clinic.lng]}
                icon={clinicIcon}
                eventHandlers={{
                  click: () => setSelectedClinic(clinic),
                }}
              >
                <Popup>
                  <div className="p-1">
                    <h3 className="font-semibold text-sm">{clinic.name}</h3>
                    <p className="text-xs text-gray-600">{clinic.address}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Clinic List */}
        <div className="space-y-4">
          {mockClinics.map((clinic) => (
            <div
              key={clinic.id}
              onClick={() => setSelectedClinic(clinic)}
              className={`bg-card rounded-xl p-4 shadow-sm border cursor-pointer transition-all hover:shadow-md ${
                selectedClinic?.id === clinic.id
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-border'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{clinic.name}</h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{clinic.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      {clinic.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                      {clinic.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                      {clinic.hours}
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGetDirections(clinic);
                  }}
                  className="flex-shrink-0"
                >
                  <Navigation className="w-4 h-4 mr-1" />
                  Arah
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
