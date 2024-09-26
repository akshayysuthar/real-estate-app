"use client";

import Details from "@/components/Details";
import Slider from "@/components/Slider";
import { supabase } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ViewListing = ({ params }) => {
  const [listingDetail, setListingDetail] = useState();
  useEffect(() => {
    GetLsitingDetails();
  }, []);

  const GetLsitingDetails = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select(
        `*,
      listingImages(
        url,
          listing_Id
  )`
      )
      .eq("id", params.id)
      .eq("active", true);

    if (data) {
      setListingDetail(data[0]);
      console.log(data);
    }
    if (error) {
      console.error();
      toast("Server Side Error");
    }
  };
  return (
    <div className="px-4 md:mx-32 lg:px-56 my-3 mt-5  ">
      <Slider imageList={listingDetail?.listingImages} />
      <Details listingDetail={listingDetail} />
    </div>
  );
};

export default ViewListing;
