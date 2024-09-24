"use client";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import React, { useState } from "react";

const GooglePlacesSearch = ({ onSelectLocation, coordinates }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);


  const handleSearch = async (input) => {
    setQuery(input);
    if (input.length > 2) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${input}&format=json&limit=5`
      );
      const data = await response.json();
      setSuggestions(data);
      // console.log(data);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    setQuery(place.display_name);
    // Pass the selected address and coordinates to the parent component
    onSelectLocation(place.display_name, place.lat, place.lon);
    // Clear the suggestions
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center w-full">
        <MapPin className="h-10 w-10 p-2 rounded-l-lg bg-slate-300 text-primary" />
        <Input
          className="h-10 w-full rounded-r-lg"
          type="text"
          placeholder="Enter Your Address"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {/* Display Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-white border border-gray-300 rounded-md mt-2 w-full z-10">
          {suggestions.map((place) => (
            <div
              key={place.place_id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(place)}
            >
              {place.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GooglePlacesSearch;
