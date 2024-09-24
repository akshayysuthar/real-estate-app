"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import GoogleMapSection from "./GoogleMapSection";

const type = "Rent";

const ListingMapView = ({ type }) => {
  const [listing, setListing] = useState([]);
  const [searchAddress, setSearchAddress] = useState("");
  const [bathCount, setBathCount] = useState(0);
  const [bedCount, setBedCount] = useState(0);
  const [packingCount, setPackingCount] = useState(0);
  const [homeType, setHomeType] = useState(0);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null); // selected coordinates
  useEffect(() => {
    getLatestListing();
    handleSearchCheck();
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
      .eq("type", "Rent")
      // .eq("bedroom", bedCount)
      // .eq("bathroom", bathCount)
      // .eq("parking", packingCount)
      // .eq("propertyType", homeType)
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
      .eq("type", "Rent")
      .order("id", { ascending: false });
    if (data) {
      setListing(data);
      //   console.log(data);
    }
    if (error) {
      toast("Server Side error");
      console.error();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mx-10 items-center justify-center">
      <div className="overflow-y-scroll h-screen no-scrollbar">
        <Listing
          listing={listing}
          handleSearchCheck={handleSearchCheck}
          searchAddress={(v) => setSearchAddress(v)}
          // setBathCount={setBathCount}
          // setBedCount={setBedCount}
          // setHomeType={setHomeType}
          // setPackingCount={setPackingCount}
          setSelectedCoordinates={setSelectedCoordinates}
        />
      </div>
      <div className="px-5 py-10 rounded-lg sticky h-screen md:w-[350px] lg:w-[550px] xl:w-[650px] ">
        <GoogleMapSection data={selectedCoordinates} listing={listing} />
      </div>
    </div>
  );
};

export default ListingMapView;
