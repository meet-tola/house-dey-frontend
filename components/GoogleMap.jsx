import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0.5rem",
};

const GoogleMapComponent = ({ address }) => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (address) {
      const geocodeAddress = () => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
          if (status === "OK") {
            const location = results[0].geometry.location;
            setCoordinates({ lat: location.lat(), lng: location.lng() });
          } else {
            console.error("Geocode was not successful for the following reason: " + status);
          }
        });
      };
      geocodeAddress();
    }
  }, [address]);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={coordinates}
        zoom={14}
      >
        <Marker position={coordinates} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
