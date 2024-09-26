import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { List, LogOut, User2 } from "lucide-react";

const User = ({ user }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            src={user?.imageUrl}
            width={35}
            height={35}
            alt={user?.fullName}
            className="rounded-full "
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel> My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={"/user"}>
              <h2 className="flex gap-1 items-center justify-center ">
                <User2 /> Profile
              </h2>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/my-listing"}>
              <h2 className="flex gap-1 items-center justify-center ">
                <List /> My Listing
              </h2>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOutButton>
              <h2 className="flex gap-1 items-center justify-center ">
                <LogOut /> Log In
              </h2>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default User;
