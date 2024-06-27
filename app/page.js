"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import PropertyCard from "./components/PropertyCard";

export default function Home() {
  const { data: session } = useSession();

  // to fetch properties data from mongodb
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetch("/api/property");
      const data = await res.json();
      setProperties(data.properties);
    };
    fetchProperties();
  }, []);

  console.log(session);
  if (session) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center">
          <h1>Signed in as {session.user.email}</h1>
          <h1>{session.user.name}</h1>
          <button onClick={() => signOut()}>Sign out</button>
        </div>

        {/* to display properties */}

        <div>
          <h1>Property Listings</h1>
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("github")}>Sign in using Github</button>
      {/* <button onClick={() => signIn("google")}>Sign in using Google</button>  */}
    </>
  );
}
