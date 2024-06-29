import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="border-y px-10 py-2 bg-black">
      <div className="flex items-center justify-between  text-white">
        <Image src={"/assets/Logo.png"} height={100} width={100}></Image>
        <div>
          <ul className="flex gap-3">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/properties">Properties</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/upload">Add</Link>
            </li>
          </ul>
        </div>
        <div>
        <Link href="/contact-us">
        Contact Us
      </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
