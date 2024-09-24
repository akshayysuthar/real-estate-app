import { Bath, BedDouble, MapPin, Ruler, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import GooglePlacesSearch from "./GooglePlacesSearch";
import { Button } from "./ui/button";
import FilterSection from "./FilterSection";

const Listing = ({ listing, handleSearchCheck, searchAddress }) => {
  //   console.log(listing);

  const [address, setAddress] = useState();
  return (
    <div>
      <div className="p-3 flex gap-3 items-center">
        <GooglePlacesSearch
          onSelectLocation={(v) => {
            searchAddress(v);
            setAddress(v);
          }}
        />
        <Button onClick={handleSearchCheck} className="flex gap-2">
          <Search />
          Search
        </Button>
      </div>
      {/* {console.log(address)} */}
      <FilterSection />

      {address && (
        <div>
          <h2 className="text-xl ">
            Found {listing?.length} Result in{" "}
            <span className="text-primary font-bold">{address}</span>
          </h2>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {listing?.length > 0
          ? listing.map((item, index) => (
              <div
                className="p-3 hover:border hover:border-primary cursor-pointer rounded-lg "
                key={index}
              >
                <Image
                  src={item.listingImages[0].url}
                  width={800}
                  height={150}
                  alt={item.address}
                  className="rounded-lg object-cover h-[170px] border-2 border-white"
                />
                <div className="flex flex-col mt-2 gap-2">
                  <h2 className="font-bold text-xl text-black">
                    $ {item.price}
                  </h2>
                  <h2 className="flex gap-2 text-sm text-gray-500">
                    <MapPin />
                    {item.address}
                  </h2>
                  <div className="flex gap-2 mt-2 justify-between">
                    <h2 className="flex w-full gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-400 justify-center items-center">
                      <BedDouble className="h-4 w-4" /> {item.bedroom}
                    </h2>

                    <h2 className="flex w-full gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-400 justify-center items-center">
                      <Bath className="h-4 w-4" /> {item.bathroom}
                    </h2>

                    <h2 className="flex w-full gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-400 justify-center items-center">
                      <Ruler className="h-4 w-4" /> {item.area}
                    </h2>
                  </div>
                </div>
              </div>
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="h-[230px] w-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 animate-pulse rounded-lg"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default Listing;
