import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const AgentDetail = ({ listingDetail }) => {
  return (
    <div className="flex gap-5 justify-between items-center p-5 rounded-lg shadow-md border my-2   ">
      <div className="flex items-center gap-2">
        <Image
          src={listingDetail?.profileImage}
          width={60}
          height={60}
          alt={listingDetail?.fullName}
          className="rounded-full "
        />
        <div>
          <h2 className="text-lg font-bold ">{listingDetail?.fullName} </h2>
          <h2 className="text-gray-500  ">{listingDetail?.createdBy} </h2>
        </div>
      </div>
      <Button>Send Message</Button>
    </div>
  );
};

export default AgentDetail;
