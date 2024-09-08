import { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Loader2 } from "lucide-react";

const GoogleMapComponent = ({ address }) => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [mapContainerStyle, setMapContainerStyle] = useState({
    width: "100%",
    height: "60vh",
    borderRadius: "15px",
  });

  useEffect(() => {
    if (!address) return;

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMapContainerStyle((prevStyle) => ({
          ...prevStyle,
          height: "100vh",
        }));
      } else {
        setMapContainerStyle((prevStyle) => ({
          ...prevStyle,
          height: "60vh",
        }));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="w-[100%] h-[100%] bg-slate-300 flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default GoogleMapComponent;
