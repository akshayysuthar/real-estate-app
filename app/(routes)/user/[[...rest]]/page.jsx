"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HomeIcon,
  BuildingIcon,
  DollarSignIcon,
  StarIcon,
  MailIcon,
  PhoneIcon,
  BedIcon,
  BathIcon,
  SquareIcon,
} from "lucide-react";
import { supabase } from "@/utils/supabase/client";

export default function UserProfileWithListings() {
  const { user } = useUser();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      if (!user?.emailAddresses[0]?.emailAddress) return;

      const { data, error } = await supabase
        .from("listing")
        .select(
          `
          *,
          listingImages (
            url,
            listing_Id
          )
        `
        )
        .eq("active", true)
        .eq("createdBy", user.emailAddresses[0].emailAddress)
        .order("id", { ascending: false });

      if (error) {
        setError("Failed to fetch listings");
        setIsLoading(false);
        return;
      }

      setListings(data);
      setIsLoading(false);
    };

    fetchListings();
  }, [user]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white shadow-xl rounded-lg mb-8">
          <CardHeader className="px-6 py-8 sm:px-8 border-b">
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={user.imageUrl}
                  alt={user.fullName || "User"}
                />
                <AvatarFallback>
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-bold">
                  {user.fullName}
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Real Estate Professional
                </CardDescription>
                <div className="mt-2 flex space-x-2">
                  <Badge variant="secondary">Realtor</Badge>
                  <Badge variant="secondary">5 Years Experience</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 py-8 sm:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MailIcon className="h-5 w-5" />
                  <span>{user.emailAddresses[0].emailAddress}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <PhoneIcon className="h-5 w-5" />
                  <span>
                    {user.phoneNumbers[0]?.phoneNumber || "Not provided"}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Real Estate Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <HomeIcon className="h-5 w-5 text-blue-500" />
                    <span>23 Properties Sold</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BuildingIcon className="h-5 w-5 text-green-500" />
                    <span>{listings.length} Active Listings</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSignIcon className="h-5 w-5 text-yellow-500" />
                    <span>$5.2M Total Sales</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <StarIcon className="h-5 w-5 text-purple-500" />
                    <span>4.9 Avg. Rating</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">About Me</h3>
              <p className="text-gray-600">
                As a dedicated real estate professional with 5 years of
                experience, I'm passionate about helping clients find their
                dream homes and make smart investments. My expertise in the
                local market, combined with a client-first approach, ensures a
                smooth and successful real estate journey for everyone I work
                with.
              </p>
            </div>
            <div className="mt-8 flex justify-end">
              <Button>Edit Profile</Button>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-6">My Listings</h2>
        {isLoading ? (
          <div>Loading listings...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => {
              console.log("Listing:", listing); // Debugging output to inspect the listing object

              return (
                <Card key={listing.id} className="overflow-hidden">
                  <img
                    src={
                      listing.listingImages[0]?.url ||
                      "/placeholder.svg?height=200&width=300"
                    }
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {listing.title}
                    </h3>
                    <p className="text-2xl font-bold text-green-600 mb-4">
                      ${listing.price.toLocaleString()}
                    </p>
                    <div className="flex justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <BedIcon className="h-4 w-4 mr-1" />
                        <span>{listing.bedroom} beds</span>
                      </div>
                      <div className="flex items-center">
                        <BathIcon className="h-4 w-4 mr-1" />
                        <span>{listing.bathroom} baths</span>
                      </div>
                      <div className="flex items-center">
                        <SquareIcon className="h-4 w-4 mr-1" />
                        <span>{listing.area} sqft</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
