import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapController = ({ latitude, longitude }) => {
  const map = useMap();

  if (latitude && longitude) {
    map.setView(
      [latitude, longitude],
      map.getZoom()
    );
  }

  return null;
};

const MapClickHandler = ({
  onLocationChange,
}) => {
  useMapEvents({
    click(event) {
      onLocationChange(
        event.latlng.lat,
        event.latlng.lng
      );
    },
  });

  return null;
};

const LocationPicker = ({
  latitude,
  longitude,
  onLocationChange,
}) => {
  const defaultPosition = [
    latitude || 28.6139,
    longitude || 77.209,
  ];

  const handleMarkerDrag = (event) => {
    const position =
      event.target.getLatLng();

    onLocationChange(
      position.lat,
      position.lng
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-orange-200">

      <MapContainer
        center={defaultPosition}
        zoom={15}
        scrollWheelZoom={true}
        className="h-[350px] w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController
          latitude={latitude}
          longitude={longitude}
        />

        <MapClickHandler
          onLocationChange={
            onLocationChange
          }
        />

        {latitude && longitude && (
          <Marker
            position={[
              latitude,
              longitude,
            ]}
            draggable={true}
            eventHandlers={{
              dragend: handleMarkerDrag,
            }}
          />
        )}
      </MapContainer>

      <div className="border-t border-orange-200 bg-orange-50 px-4 py-3">
        <p className="text-sm font-semibold text-slate-800">
          📍 Complaint Location
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Click on the map or drag the marker
          to adjust the exact location.
        </p>
      </div>
    </div>
  );
};

export default LocationPicker;