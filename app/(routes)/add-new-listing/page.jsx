"use client";

import GooglePlacesSearch from "@/components/GooglePlacesSearch";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const AddNewListing = () => {
  const { user } = useUser();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [location, setLocation] = useState({
    address: "",
    lat: null,
    lon: null,
  });

  // Callback function to update location in state
  const handleLocationSelect = (address, lat, lon) => {
    setLocation({
      address,
      lat,
      lon,
    });
  };
  const nextHandler = async () => {
    // console.log(location);
    setLoader(true);
    const { data, error } = await supabase
      .from("listing")
      .insert([
        {
          address: location.address,
          coordinates: { lat: location.lat, lon: location.lon }, // Save coordinates as JSON
          createdBy: user.primaryEmailAddress.emailAddress,
        },
      ])
      .select(); // Use select to return inserted data

    if (data) {
      setLoader(false);
      console.log("Data inserted successfully", data);
      toast("New Address is added for listing!");
      router.replace("/edit-listing/" + data[0].id);
    } else {
      setLoader(false);
      console.error("Error inserting data:", error.message);
      toast("Server side error");
    }
  };

  return (
    <div className="mt-10 md:mx-56 lg:mx-80 ">
      <div className="p-10 flex flex-col gap-5  items-center justify-center">
        <h2 className="font-bold text-2xl">Add New Listing</h2>
        <div className="p-10 px-28 rounded-lg border shadow-md flex flex-col gap-5">
          <h2 className="text-gray-500">
            Enter Address which you want to list{" "}
          </h2>
          {/* Pass the handleLocationSelect callback to GooglePlacesSearch */}
          <GooglePlacesSearch onSelectLocation={handleLocationSelect} />
          <Button onClick={nextHandler}>
            {loader ? <Loader className="animate-spin" /> : "Next"}
          </Button>
        </div>
        {/* Display the selected location data */}
        {/* {location.lat && (
          <div className="mt-5">
            <p>
              <strong>Selected Address:</strong> {location.address}
            </p>
            <p>
              <strong>Latitude:</strong> {location.lat}
            </p>
            <p>
              <strong>Longitude:</strong> {location.lon}
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default AddNewListing;
