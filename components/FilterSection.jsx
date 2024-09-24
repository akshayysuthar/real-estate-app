import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BathIcon, Bed, BedDouble, Building, Car, House } from "lucide-react";

const FilterSection = ({
  setBathCount,
  setBedCount,
  setHomeType,
  setPackingCount,
}) => {
  return (
    <div className="px-3 py-2 grid grid-cols-3 md:flex gap-2">
      <Select onValueChange={setBedCount}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bed" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">
            <h2 className="flex gap-2 ">
              <BedDouble className="h-5 text-primary w-5" />
              2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-2 ">
              <BedDouble className="h-5 w-5 text-primary" />
              3+
            </h2>
          </SelectItem>
          <SelectItem value="4">
            <h2 className="flex gap-2 ">
              <BedDouble className="h-5 w-5 text-primary" />
              4+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={setBathCount}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bath" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">
            <h2 className="flex gap-2 ">
              <BathIcon className="h-5 text-primary w-5" />
              2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-2 ">
              <BathIcon className="h-5 w-5 text-primary" />
              3+
            </h2>
          </SelectItem>
          <SelectItem value="4">
            <h2 className="flex gap-2 ">
              <BathIcon className="h-5 w-5 text-primary" />
              4+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={setPackingCount}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Packing" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">
            <h2 className="flex gap-2 ">
              <Car className="h-5 text-primary w-5" />
              2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-2 ">
              <Car className="h-5 w-5 text-primary" />
              3+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={setHomeType}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Home Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="single-family">
            <h2 className="flex gap-2">
              <House className="h-5 text-primary w-5" />
              Single Family House
            </h2>
          </SelectItem>
          <SelectItem value="condo">
            <h2 className="flex gap-2">
              <Building className="h-5 text-primary w-5" />
              Condo
            </h2>
          </SelectItem>
          <SelectItem value="townhouse">
            <h2 className="flex gap-2">
              <House className="h-5 text-primary w-5" />
              Townhouse
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSection;
