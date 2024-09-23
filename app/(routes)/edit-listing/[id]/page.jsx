"use client";
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Formik } from "formik";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client"; //  Supabase client is set up
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const EditListing = ({ params }) => {
  const { user } = useUser();
  const router = useRouter();
  // to get id from url
  //   const params = usePathname();
  useEffect(() => {
    console.log(params.id);
    user && verityUserRecord();
  }, [user]);

  // to make sure the other listing details can't be change by others
  const verityUserRecord = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress)
      .eq("id", params.id);
    if (data?.length > 0) {
      //   router.replace("/");
    }
  };

  const handleSaveListing = async (values) => {
    const { data, error } = await supabase
      .from("listing") // the table is named 'listing'
      .update([
        {
          type: values.type,
          propertyType: values.propertyType,
          bedroom: values.bedroom,
          bathroom: values.bathroom,
          builtIn: values.builtIn,
          parking: values.parking,
          lotSize: values.lotSize,
          area: values.area,
          price: values.price,
          hoa: values.hoa,
          description: values.description,
        },
      ])
      .eq("id", params.split("/")[2])
      .select();

    if (data) {
      console.log(data);
      toast("Listing updated and Puslished");
    } else {
      console.error();
    }

    if (error) {
      console.error("Error saving listing:", error);
    } else {
      console.log("Listing saved successfully!", data);
    }
  };

  return (
    <div className="px-10 md:px-36 my-10 ">
      <h2 className="font-bold text-2xl ">
        Enter some more details about your listing
      </h2>
      <Formik
        initialValues={{
          type: "",
          propertyType: "",
          bedroom: "",
          bathroom: "",
          builtIn: "",
          parking: "",
          lotSize: "",
          area: "",
          price: "",
          hoa: "",
          description: "",
        }}
        onSubmit={async (values) => {
          console.log(values);
          await handleSaveListing(values);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-8 rounded-lg shadow-md ">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 ">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Rent or Sell?</h2>
                  <RadioGroup
                    name="type"
                    value={values.type}
                    onValueChange={(v) => setFieldValue("type", v)} // Correct way to update Formik values
                    onBlur={handleBlur}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Rent" id="Rent" />
                      <Label htmlFor="Rent">Rent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Sell" id="Sell" />
                      <Label htmlFor="Sell">Sell</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Property Type</h2>
                  <Select
                    name="propertyType"
                    value={values.propertyType}
                    onValueChange={(v) => setFieldValue("propertyType", v)} // Use setFieldValue to update
                    onBlur={handleBlur}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single Family House">
                        Single Family House
                      </SelectItem>
                      <SelectItem value="Town House">Town House</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 ">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Bedroom</h2>
                  <Input
                    type="number"
                    name="bedroom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bedroom}
                    placeholder="Ex. 2"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Bathroom</h2>
                  <Input
                    type="number"
                    name="bathroom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bathroom}
                    placeholder="Ex. 2"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Built In</h2>
                  <Input
                    type="number"
                    name="builtIn"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.builtIn}
                    placeholder="Ex. 1900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 ">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Parking</h2>
                  <Input
                    type="number"
                    name="parking"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.parking}
                    placeholder="Ex. 2"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Lot Size (Sq.ft)</h2>
                  <Input
                    type="number"
                    name="lotSize"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lotSize}
                    placeholder="Ex. 2000"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Area (Sq.ft)</h2>
                  <Input
                    type="number"
                    name="area"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.area}
                    placeholder="Ex. 1900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 ">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Selling Price ($)</h2>
                  <Input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    placeholder="14000"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">
                    HOA (per Month) ($)
                  </h2>
                  <Input
                    type="number"
                    name="hoa"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.hoa}
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-10">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Description</h2>
                  <Textarea
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    placeholder="Type your description of your listing"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-5 justify-end">
                <Button
                  variant="outline"
                  className="text-primary border-primary"
                  type="submit"
                >
                  Save
                </Button>
                <Button type="submit">Save & Publish</Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditListing;
