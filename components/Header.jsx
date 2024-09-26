"use client";

// no need to add any changes in this 


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { Plus, Menu, X } from "lucide-react";
import Image from "next/image";
import main from "@/public/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import User from "./User";

const Header = () => {
  const path = usePathname();
  const { user, isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (href) => {
    if (href === "/") {
      return path === href;
    }
    return path.startsWith(href);
  };

  const NavLink = ({ href, children }) => (
    <Link href={href}>
      <span
        className={`hover:text-primary font-medium text-sm cursor-pointer ${
          isActive(href) ? "text-primary" : "text-gray-700"
        } py-2 px-4 rounded transition duration-300 ease-in-out block`}
      >
        {children}
      </span>
    </Link>
  );

  return (
    <header className="fixed top-0 w-full z-10 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <Image
                priority
                height={40}
                width={120}
                className="w-auto h-8 sm:h-10"
                src={main}
                alt="main-logo"
              />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            <NavLink href="/sell">For Sale</NavLink>
            <NavLink href="/rent">For Rent</NavLink>
            <NavLink href="/agentfinder">Agent Finder</NavLink>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/add-new-listing">
              <Button className="flex items-center space-x-2">
                <Plus size={16} />
                <span>Post Your Ad</span>
              </Button>
            </Link>
            {isSignedIn ? (
              <User user={user} />
            ) : (
              <Link href="/sign-in">
                <Button variant="outline">Login</Button>
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink href="/sell">For Sale</NavLink>
            <NavLink href="/rent">For Rent</NavLink>
            <NavLink href="/agentfinder">Agent Finder</NavLink>
            <Link href="/add-new-listing">
              <Button className="w-full justify-center mt-4">
                <Plus size={16} className="mr-2" />
                Post Your Ad
              </Button>
            </Link>
            {isSignedIn ? (
              <div className="mt-4 px-4">
                <User user={user} />
              </div>
            ) : (
              <Link href="/sign-in">
                <Button variant="outline" className="w-full mt-4">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
