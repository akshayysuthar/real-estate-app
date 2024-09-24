"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";

const type = "Rent";

const ListingMapView = ({ type }) => {
  const [listing, setListing] = useState([]);
  const [searchAddress, setSearchAddress] = useState("");
  useEffect(() => {
    getLatestListing();
    handleSearchCheck();
  }, []);

  const handleSearchCheck = async () => {
    console.log(searchAddress);
    const searchTerm = searchAddress?.values?.sturcture_formatting?.main_text;
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
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="">
        <Listing
          listing={listing}
          handleSearchCheck={handleSearchCheck}
          searchAddress={(v) => setSearchAddress(v)}
        />
      </div>
      <div className="">Map</div>
    </div>
  );
};

export default ListingMapView;
