import { useEffect, useState } from "react";
import { middleOfARG } from "../lib/constants";
import { Marker, useMap } from "@vis.gl/react-maplibre";
import { getLocation } from "../lib/map";
import { MapPinIcon } from "@heroicons/react/24/solid";

export default function YouAreHere() {
  const [popupLocation, setPopupLocation] =
    useState<[number, number]>(middleOfARG);
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) return;
    (async () => {
      const location = await getLocation();
      if (location !== middleOfARG) {
        setPopupLocation(location);
        map.flyTo({ center: location, zoom: 12 });
      }
    })();
  }, [map]);

  if (!map) return <h2>Mapa no encontrado</h2>;

  return (
    <Marker longitude={popupLocation[0]} latitude={popupLocation[1]}>
      <MapPinIcon className="size-8 text-red-600" />
    </Marker>
  );
}
