import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Map = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const GoogleMapSection = ({ data, listing }) => {
  // Check if data is an array and has the expected length
  const hasSearchData = Array.isArray(data) && data.length >= 3;

  // Extract place name, latitude, and longitude from the array if available
  const [placeName, latString, lonString] = hasSearchData ? data : [];
  const lat = hasSearchData ? parseFloat(latString) : null; // Convert to number
  const lon = hasSearchData ? parseFloat(lonString) : null; // Convert to number

  // State to manage the center of the map
  const [mapCenter, setMapCenter] = useState([21.1924, 72.9551]); // Default to Surat, Gujarat coordinates
  
  // Effect to update map center when coordinates change
  useEffect(() => {
    if (lat && lon) {
      setMapCenter([lat, lon]);
    }
  }, [lat, lon]);

  // Render null if the listing is not yet loaded
  if (!listing || listing.length === 0) {
    return <div>Loading map...</div>; // You can replace this with a loading spinner if desired
  }

  return (
    <Map
      center={mapCenter} // Use mapCenter state for centering the map
      zoom={10}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Markers for listings */}
      {listing.map((property) => {
        const propertyLat = parseFloat(property.coordinates.lat);
        const propertyLon = parseFloat(property.coordinates.lon);
        
        return (
          <Marker key={property.id} position={[propertyLat, propertyLon]}>
            <Popup>
              <div>
                <h3>{property.address}</h3>
                <p>{property.propertyType} - {property.price} INR</p>
                <p>{property.description}</p>
                {property.listingImages.length > 0 && (
                  <img 
                    src={property.listingImages[0].url} 
                    alt="Property" 
                    style={{ width: '100%', height: 'auto' }} 
                  />
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* Marker for the searched location if available */}
      {hasSearchData && (
        <Marker position={[lat, lon]}>
          <Popup>{placeName}</Popup> {/* Display the place name in the popup */}
        </Marker>
      )}
    </Map>
  );
};

export default GoogleMapSection;
