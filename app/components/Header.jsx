"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useEffect } from "react";

const Header = () => {
  const path = usePathname();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    console.log(path);
    return () => {};
  }, []);

  return (
    <div
      className="flex justify-between px-10 p-6 shadow-sm fixed
    top-0 w-full z-10 bg-white"
    >
      <div className="flex gap-10 items-center ">
        <Link href={"/"}>
          <Image height={150} width={150} src={"./logo.svg"} alt="main-logo" />
        </Link>
        <ul className="md:flex hidden gap-10">
          <Link href={"/forsale"}>
            <li
              className={`"hover:text-primary font-medium text-sm cursor-pointer ${
                path == "/forsale" && "text-primary"
              } "`}
            >
              For Sale
            </li>
          </Link>
          <Link href={"/forrent"}>
            <li
              className={`"hover:text-primary font-medium text-sm cursor-pointer ${
                path == "/forrent" && "text-primary"
              } "`}
            >
              For Rent
            </li>
          </Link>
          <Link href={"/agentfinder"}>
            <li
              className={`"hover:text-primary font-medium text-sm cursor-pointer ${
                path == "/agentfinder" && "text-primary"
              } "`}
            >
              Agent Finder
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex gap-2 items-center">
        <Link href={"add-new-listing"}>
          <Button className="flex gap-2">
            <Plus /> Post Your Ad
          </Button>
        </Link>
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Link href={"/sign-in"}>
            <Button variant="outline">Login </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
