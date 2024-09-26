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
    <div className="space-y-4 mx-auto">
      {/* Search Bar and Button */}
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
          className="w-full sm:w-1/4 flex gap-2 justify-center bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-all"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </div>

      {/* Filter Section */}
      <FilterSection
        setBathCount={setBathCount}
        setBedCount={setBedCount}
        setHomeType={setHomeType}
        setPackingCount={setPackingCount}
      />

      {/* Address Section */}
      {address && (
        <div className="bg-gray-100 p-3 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">
            Found {listing?.length} results
          </h2>
        </div>
      )}

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {listing?.length > 0
          ? listing.map((item, index) => (
              <Link href={`/view-listing/${item.id}`} key={index}>
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-primary cursor-pointer">
                  <div className="relative h-48 mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={item.listingImages[0].url}
                      layout="fill"
                      objectFit="cover"
                      alt={item.address}
                      className="rounded-lg transition-transform transform hover:scale-105 duration-300"
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
                className="h-64 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-lg animate-gradient-x"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default Listing;
