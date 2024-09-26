import { Bath, BedDouble, MapPin, Ruler, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import GooglePlacesSearch from "./GooglePlacesSearch";
import { Button } from "./ui/button";
import FilterSection from "./FilterSection";
import Link from "next/link";

const Listing = ({
  listing,
  handleSearchCheck,
  searchAddress,
  setBathCount,
  setBedCount,
  setHomeType,
  setPackingCount,
  setSelectedCoordinates,
}) => {
  const [address, setAddress] = useState();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="w-full sm:w-3/4">
          <GooglePlacesSearch
            onSelectLocation={(v) => {
              searchAddress(v);
              setAddress(v);
              setSelectedCoordinates(v);
            }}
          />
        </div>
        <Button
          onClick={handleSearchCheck}
          className="w-full sm:w-1/4 flex gap-2 justify-center"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </div>
      <FilterSection
        setBathCount={setBathCount}
        setBedCount={setBedCount}
        setHomeType={setHomeType}
        setPackingCount={setPackingCount}
      />

      {address && (
        <div className="bg-gray-100 p-3 rounded-lg">
          <h2 className="text-xl font-semibold">
            Found {listing?.length} results
            {/* <span className="text-primary font-bold"> in {address}</span> */}
          </h2>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {listing?.length > 0
          ? listing.map((item, index) => (
              <Link href={`/view-listing/${item.id}`} key={index}>
                <div className="bg-white p-3 hover:shadow-lg transition-shadow duration-300 rounded-lg border border-gray-200 hover:border-primary cursor-pointer">
                  <div className="relative h-48 mb-3">
                    <Image
                      src={item.listingImages[0].url}
                      layout="fill"
                      objectFit="cover"
                      alt={item.address}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-bold text-xl text-primary">
                      $ {item.price}
                    </h2>
                    <h2 className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {item.address}
                    </h2>
                    <div className="flex gap-2 justify-between">
                      <h2 className="flex items-center gap-1 text-sm bg-gray-100 rounded-full px-3 py-1 text-gray-600">
                        <BedDouble className="w-4 h-4" /> {item.bedroom}
                      </h2>
                      <h2 className="flex items-center gap-1 text-sm bg-gray-100 rounded-full px-3 py-1 text-gray-600">
                        <Bath className="w-4 h-4" /> {item.bathroom}
                      </h2>
                      <h2 className="flex items-center gap-1 text-sm bg-gray-100 rounded-full px-3 py-1 text-gray-600">
                        <Ruler className="w-4 h-4" /> {item.area}
                      </h2>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="h-64 w-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 animate-pulse rounded-lg"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default Listing;
