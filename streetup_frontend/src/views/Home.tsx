import { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { UserGroupIcon } from "@heroicons/react/24/solid";

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
      {/* Estadísticas */}
        <div className="px-4 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 mt-6">Estadísticas de la Comunidad</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-linear-to-br from-blue-900/30 to-emerald-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Equipos Activos</p>
                  <p className="text-3xl font-bold text-white">12</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <UserGroupIcon className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-linear-to-r from-blue-500 to-emerald-500 h-2 rounded-full w-4/5"></div>
                </div>
                
              </div>
            </div>

            <div className="bg-linear-to-br from-blue-900/30 to-emerald-900/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Miembros Totales</p>
                  <p className="text-3xl font-bold text-white">1,248</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-emerald-400 text-2xl">👥</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-linear-to-r from-emerald-500 to-blue-500 h-2 rounded-full w-3/4"></div>
                </div>
                <p className="text-gray-400 text-xs mt-2">+8% desde el mes pasado</p>
              </div>
            </div>

            <div className="bg-linear-to-br from-blue-900/30 to-emerald-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Partidos esta semana</p>
                  <p className="text-3xl font-bold text-white">28</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400 text-2xl">⚽</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-linear-to-r from-blue-500 to-emerald-500 h-2 rounded-full w-2/3"></div>
                </div>
                <p className="text-gray-400 text-xs mt-2">+5 desde la semana pasada</p>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
