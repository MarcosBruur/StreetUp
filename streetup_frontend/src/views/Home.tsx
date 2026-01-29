import { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWFyY29zYnJ1dXIiLCJhIjoiY21pbDBhaWM0MWV0MTNlcHB4a2N1cTJ2MSJ9.Obi8EuY8j-rbL-51UPvh2w";

export default function Home() {
  const [viewState, setViewState] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 14,
  });

  const [marker, setMarker] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setViewState({
          latitude,
          longitude,
          zoom: 14,
        });

        setMarker({ latitude, longitude });

        setLoading(false);
      },
      (err) => {
        console.error("Error ubicación:", err);
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <p>Cargando ubicación...</p>;

  return (
    <>
      
      <div className="flex justify-center my-10">
        <Map
          {...viewState}
          onMove={(e) => setViewState(e.viewState)}
          style={{ 
            width: 800, height: 600, borderRadius: 10,
            border: "2px solid #C3110C", 
            boxShadow:"-1px 1px 15px 6px rgba(252,93,45,0.75)",
            WebkitBoxShadow:"-1px 1px 15px 6px rgba(252,93,45,0.75)",
            MozBoxShadow:"-1px 1px 15px 6px rgba(252,93,45,0.75)" 
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          {/* --- POPUP CORRECTO (mapbox) --- */}
          <Popup
            longitude={marker.longitude}
            latitude={marker.latitude}
            closeButton={false}
            anchor="top"
            className="text-black text-ml"
          >
            Estás aquí
          </Popup>

          {/* --- MARCADOR DRAGGABLE --- */}
          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            draggable
            onDragEnd={(e) => {
              const { lng, lat } = e.lngLat;
              setMarker({ latitude: lat, longitude: lng });
            }}
            color="red"
          />
        </Map>
      </div>
    </>
  );
}
