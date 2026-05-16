"use client";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ParteTrabajo } from '@/app/helpers/interfaces/parte-trabajo.interface';

interface PropsRouteVisualizerPartesTrabajo {
    partes?: ParteTrabajo[]
}

// Arreglo para corregir los iconos por defecto de Leaflet en Next.js
const icon = L.icon({ iconUrl: "/marker-icon.png", shadowUrl: "/marker-shadow.png" });


export default function RouteMapVisualizer({ partes = []}:PropsRouteVisualizerPartesTrabajo ) {
  // Extraemos las coordenadas para la línea de la ruta
  const positions = partes
    .filter(p => p.latCor !== undefined && p.longCor !== undefined)
    .map(p => [p.latCor, p.longCor] as [number, number]);

    if (partes.length === 0) {
    return (
      <div className="h-[400px] w-full bg-slate-800 rounded-xl flex items-center justify-center text-gray-400">
        No hay coordenadas disponibles para esta ruta.
      </div>
    );
  }

  return (
    <MapContainer center={[40.4167, -3.70325]} zoom={13} className="h-full w-full rounded-xl">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {partes.map((parte) => (
        parte.latCor && (
          <Marker key={parte.id} position={[parte.latCor, parte.longCor]} icon={icon}>
            <Popup>
              <h3 className="font-bold">{parte.title}</h3>
              <p>{parte.address}</p>
            </Popup>
          </Marker>
        )
      ))}

      {/* Dibuja la línea que une los puntos de la ruta */}
      <Polyline positions={positions} color="blue" weight={3} opacity={0.5} dashArray="10, 10" />
    </MapContainer>
  );
}