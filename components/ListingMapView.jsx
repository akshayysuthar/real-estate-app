"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import GoogleMapSection from "./GoogleMapSection";

const ListingMapView = ({ type }) => {
  const [listing, setListing] = useState([]);
  const [searchAddress, setSearchAddress] = useState("");
  const [bathCount, setBathCount] = useState(0);
  const [bedCount, setBedCount] = useState(0);
  const [packingCount, setPackingCount] = useState(0);
  const [homeType, setHomeType] = useState(0);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false);

  useEffect(() => {
    getLatestListing();
    handleSearchCheck();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.info(
        "Note: The listing data is shown for demonstration purposes only."
      );
    }, 2000); // Show toast after 2 seconds

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  const handleSearchCheck = async () => {
    const searchTerm = searchAddress?.values?.sturcture_formatting?.main_text;
    const { data, error } = await supabase
      .from("listing")
      .select(
        `*,
        listingImages(
          url,
          listing_Id
        )`
      )
      .eq("active", true)
      .eq("type", type)
      .like("address", "%" + searchAddress + "%")
      .order("id", { ascending: false });

    if (data) {
      setListing(data);
    }
  };

  const getLatestListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select(
        `*,
        listingImages(
          url,
          listing_Id
        )
      `
      )
      .eq("active", true)
      .eq("type", type)
      .order("id", { ascending: false });
    if (data) {
      setListing(data);
    }
    if (error) {
      toast("Server Side error");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-screen lg:flex-row">
      {/* Listing Section */}
      <div className="lg:w-1/2 h-full overflow-y-auto p-4 transition-all duration-300 ease-in-out">
        <Listing
          listing={listing}
          handleSearchCheck={handleSearchCheck}
          searchAddress={setSearchAddress}
          setBathCount={setBathCount}
          setBedCount={setBedCount}
          setHomeType={setHomeType}
          setPackingCount={setPackingCount}
          setSelectedCoordinates={setSelectedCoordinates}
        />
      </div>

      {/* Map Section for Large Screens */}
      <div className="hidden lg:block mt-10 rounded-md lg:w-1/2 h-full transition-all duration-300 ease-in-out">
        <div className="sticky top-0 h-full">
          <GoogleMapSection data={selectedCoordinates} listing={listing} />
        </div>
      </div>

      {/* Toggle Button */}
      <button
        className="fixed bottom-4 right-4 bg-primary text-white p-2 rounded-full shadow-lg lg:hidden z-50"
        onClick={() => setIsMapVisible(!isMapVisible)}
      >
        {isMapVisible ? "Hide Map" : "Show Map"}
      </button>

      {/* Map Below Listing for Mobile, Hidden by Default */}
      <div
        className={`w-full  lg:hidden transition-all duration-300 ease-in-out ${
          isMapVisible ? "block" : "hidden"
        }`}
      >
        <GoogleMapSection data={selectedCoordinates} listing={listing} />
      </div>
    </div>
  );
};

export default ListingMapView;
