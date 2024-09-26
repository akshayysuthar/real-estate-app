"use client";
import React, { useEffect, useState } from "react";
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
import { Loader } from "lucide-react";
import { FileUpload } from "@/components/ui/file-upload";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const EditListing = ({ params }) => {
  const { user } = useUser();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [listing, setListing] = useState([]);

  // to make sure the other listing details can't be change by others
  const verityUserRecord = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress)
      .eq("id", params.id);

    if (data) {
      setListing([data[0]]);
      console.log(listing);
    }

    if (data?.length <= 0) {
      router.replace("/");
    }
  };

  const handleSaveListing = async (values) => {
    // console.log("Values:", values); // Debug to verify incoming values

    // Validation: Ensure 'type' is present (or any other required fields)
    if (!values || !values.type) {
      console.error(
        "Error: Missing required listing values, particularly type."
      );
      return;
    }

    try {
      // Start loader before making async call
      setLoader(true);

      const { data, error } = await supabase
        .from("listing") // Ensure your table name is correct
        .update({
          type: values.type || "defaultType",
          propertyType: values.propertyType || "defaultPropertyType",
          bedroom: values.bedroom || 0,
          bathroom: values.bathroom || 0,
          builtIn: values.builtIn || "N/A",
          parking: values.parking || 0,
          lotSize: values.lotSize || 0,
          area: values.area || 0,
          price: values.price || 0,
          hoa: values.hoa || "None",
          description: values.description || "No description available",
          profileImage: user?.imageUrl || "defaultImageUrl", // Ensure this is not undefined
          fullName: `${user?.firstName || "Anonymous"} ${user?.lastName || ""}`, // Ensure fullName is valid
        })
        .eq("id", params.id) // Assuming 'params.id' is defined and represents the correct listing ID
        .select(); // Selecting the updated data

      if (error) {
        throw error; // Error will be caught by catch block
      }

      console.log("Listing updated:", data);
      toast("Listing updated successfully");
    } catch (error) {
      console.error("Error updating listing:", error.message);
    } finally {
      // Stop loader after completion
      setLoader(false);
    }
  };

  const publishBtnHandler = async () => {
    try {
      // Start loader
      setLoader(true);

      const { data, error } = await supabase
        .from("listing")
        .update({ active: "true" })
        .eq("id", params?.id)
        .select(); // Selecting the updated data

      if (error) {
        throw error;
      }

      console.log("Listing published:", data);
      toast("Listing published successfully");
    } catch (error) {
      console.error("Error publishing listing:", error.message);
    } finally {
      // Stop loader
      setLoader(false);
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
          profileImage: user?.imageUrl, // Correct key for image URL
          fullName: user?.fullName,
        }}
        onSubmit={async (values) => {
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
                    // defaultValue={listing?.type}
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
                    defaultValue={listing?.propertyType}
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
                    defaultValue={listing?.bedroom}
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
                    defaultValue={listing?.bathroom}
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
                    defaultValue={listing?.builtIn}
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
                    defaultValue={listing?.parking}
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
                    defaultValue={listing?.lotSize}
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
                    defaultValue={listing?.area}
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
                    defaultValue={listing?.price}
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
                    defaultValue={listing?.hoa}
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
                    defaultValue={listing?.description}
                    onBlur={handleBlur}
                    value={values.description}
                    placeholder="Type your description of your listing"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-10">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">
                    Upload Property Iamges
                  </h2>
                  <FileUpload id={params.id} />
                </div>
              </div>

              <div className="flex gap-4 mt-5 justify-end">
                <Button
                  variant="outline"
                  onClick={() => handleSaveListing()}
                  className="text-primary border-primary"
                  type="submit"
                >
                  {loader ? <Loader className="animate-spin" /> : "Save"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => publishBtnHandler()}
                  className="text-primary border-primary"
                  type="submit"
                >
                  {loader ? <Loader className="animate-spin" /> : "Publish"}
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditListing;
