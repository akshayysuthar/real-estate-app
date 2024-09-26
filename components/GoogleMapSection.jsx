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
    if (listing) {
      if (Array.isArray(listing)) {
        if (listing.length === 1 && listing[0].coordinates) {
          // For a single listing
          const { lat, lon } = listing[0].coordinates;
          setMapCenter([parseFloat(lat), parseFloat(lon)]);
        } else if (listing.length > 1) {
          // For multiple listings, calculate average center
          const latSum = listing.reduce(
            (sum, property) => sum + parseFloat(property.coordinates.lat),
            0
          );
          const lonSum = listing.reduce(
            (sum, property) => sum + parseFloat(property.coordinates.lon),
            0
          );
          const avgLat = latSum / listing.length;
          const avgLon = lonSum / listing.length;
          setMapCenter([avgLat, avgLon]);
        }
      } else if (listing.coordinates) {
        // For a single listing when it's not an array
        const { lat, lon } = listing.coordinates;
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
      }
    } else if (lat && lon) {
      // Set center based on search data if listing is not available
      setMapCenter([lat, lon]);
    }
  }, [listing, lat, lon]);

  // Render null if the listing is not yet loaded
  if (!listing) {
    return <div>Loading map...</div>; // You can replace this with a loading spinner if desired
  }

  // Determine if it's a single listing or multiple listings
  const isSingleListing = !Array.isArray(listing);

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

      {/* Show a marker for a single listing if it's not an array */}
      {isSingleListing
        ? listing.coordinates && (
            <Marker
              key={listing.id}
              position={[
                parseFloat(listing.coordinates.lat),
                parseFloat(listing.coordinates.lon),
              ]}
            >
              <Popup>
                <div className="gap-2">
                  {listing.listingImages.length > 0 && (
                    <img
                      src={
                        listing.listingImages[0].url.startsWith("/public/")
                          ? listing.listingImages[0].url
                          : `/public/${listing.listingImages[0].url}`
                      }
                      alt="Property"
                      className="rounded-lg"
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                  <h3>{listing.address}</h3>
                  <p>
                    {listing.propertyType} - {listing.price} INR
                  </p>
                </div>
              </Popup>
            </Marker>
          )
        : // Map through all listings if it's an array
          listing.map((property) => {
            const propertyLat = parseFloat(property.coordinates.lat);
            const propertyLon = parseFloat(property.coordinates.lon);

            return (
              <Marker key={property.id} position={[propertyLat, propertyLon]}>
                <Popup>
                  <div className="gap-2">
                    {property.listingImages.length > 0 && (
                      <img
                        src={
                          property.listingImages[0].url.startsWith("/public/")
                            ? property.listingImages[0].url
                            : `/public/${property.listingImages[0].url}`
                        }
                        alt="Property"
                        className="rounded-lg"
                        style={{ width: "100%", height: "auto" }}
                      />
                    )}
                    <h3>{property.address}</h3>
                    <p>
                      {property.propertyType} - {property.price} INR
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}

      {/* Marker for the searched location if available */}
      {hasSearchData && <Marker riseOnHover position={[lat, lon]}></Marker>}
    </Map>
  );
};

export default GoogleMapSection;
