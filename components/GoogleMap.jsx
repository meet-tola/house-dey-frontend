import { useEffect, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { Loader2 } from "lucide-react";

export const defaultMapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
};

const GoogleMapComponent = ({ address }) => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    // Geocoding service to convert the address to lat/lng
    const geocodeAddress = async () => {
      try {
        const geocoder = new window.google.maps.Geocoder();
        const results = await geocoder.geocode({ address });

        if (results.results && results.results[0]) {
          const location = results.results[0].geometry.location;
          setCenter({
            lat: location.lat(),
            lng: location.lng(),
          });
        } else {
          console.error("Geocoding failed: No results found");
        }
      } catch (error) {
        console.error("Geocoding error: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    geocodeAddress();
  }, [address]);

  if (isLoading) {
    return (
      <div className="w-full h-full bg-slate-300">
        <Loader2 />
      </div>
    );
  }

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={center}
        zoom={20}
      ></GoogleMap>
    </div>
  );
};

export default GoogleMapComponent;
