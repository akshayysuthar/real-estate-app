import {
  Bath,
  BedDouble,
  Building,
  Car,
  Drill,
  House,
  LandPlot,
  MapPin,
  ParkingCircle,
  Ruler,
  Share,
} from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import GoogleMapSection from "./GoogleMapSection";
import AgentDetail from "./AgentDetail";

const Details = ({ listingDetail }) => {
  console.log(listingDetail);

  return (
    listingDetail && (
      <div className="my-6 flex gap-2 flex-col">
        <div className="grid md:grid-cols-1 px-2 ">
          <div className="flex justify-between">
            <div>
              <h2 className="font-bold text-3xl">$ {listingDetail?.price} </h2>
              <h2 className="text-gray-500 text-lg flex gap-2 ">
                <MapPin /> {listingDetail?.address}
              </h2>
            </div>
            <Button className="flex gap-2">
              <Share /> Share
            </Button>
          </div>
          <hr />
          <div className="mt-4 flex flex-col gap-3">
            <h2 className="font-bold text-2xl">Key Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <h2 className="flex w-full gap-2 bg-primary text-sm  rounded-md p-2 text-primary-foreground justify-center items-center">
                <House className="h-4 w-4" /> {listingDetail?.propertyType}
              </h2>
              <h2 className="flex w-full gap-2 text-sm bg-primary rounded-md p-2 text-primary-foreground justify-center items-center">
                <Drill className="h-4 w-4" /> {listingDetail?.builtIn}
              </h2>
              <h2 className="flex w-full gap-2 text-sm bg-primary rounded-md p-2 text-primary-foreground justify-center items-center">
                <LandPlot className="h-4 w-4" /> {listingDetail?.lotSize}
              </h2>

              <h2 className="flex w-full gap-2 text-sm bg-primary rounded-md p-2 text-primary-foreground justify-center items-center">
                <BedDouble className="h-4 w-4" /> {listingDetail?.bedroom}
              </h2>

              <h2 className="flex w-full gap-2 text-sm bg-primary rounded-md p-2 text-primary-foreground justify-center items-center">
                <Bath className="h-4 w-4" /> {listingDetail?.bathroom}
              </h2>

              <h2 className="flex w-full gap-2 text-sm bg-primary rounded-md p-2 text-primary-foreground justify-center items-center">
                <Car className="h-4 w-4" /> {listingDetail?.parking}
              </h2>
            </div>
            <div>
              <h2 className="font-bold text-2xl">What is Special</h2>
              <p className="text-gray-600 ">{listingDetail.description}</p>
            </div>
            <div>
              <h2 className="font-bold text-2xl">Find on Map</h2>
              <GoogleMapSection
                listing={listingDetail}
                data={listingDetail.coordinates}
              />
            </div>
            <h2 className="font-bold text-2xl">Contact Agent</h2>
            <AgentDetail listingDetail={listingDetail} />
          </div>
        </div>
      </div>
    )
  );
};

export default Details;
