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
      lat: parseFloat(lat), // Ensure lat is a float
      lon: parseFloat(lon), // Ensure lon is a float
    });
  };

  const nextHandler = async () => {
    setLoader(true);

    // Ensure coordinates are present
    if (!location.lat || !location.lon) {
      setLoader(false);
      toast("Please select a valid location with coordinates.");
      return;
    }

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
    <div className="mt-10 mx-4 md:mx-20 lg:mx-40">
      <div className="p-6 flex flex-col gap-6 items-center justify-center">
        <h2 className="font-bold text-xl md:text-2xl text-center">
          Add New Listing
        </h2>
        <div className="p-6 md:p-10 lg:px-16 bg-white rounded-lg border shadow-md flex flex-col gap-5 w-full max-w-xl">
          <h2 className="text-gray-600 text-center">
            Enter the address you want to list
          </h2>
          {/* GooglePlacesSearch component */}
          <GooglePlacesSearch onSelectLocation={handleLocationSelect} />
          <Button onClick={nextHandler} className="w-full flex justify-center">
            {loader ? <Loader className="animate-spin" /> : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNewListing;
