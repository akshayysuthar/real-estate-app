"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import PropertyCard from "./components/PropertyCard";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <div className="gird items-center justify-center">
          <h1>Signed in as</h1>

          <h1>{session.user.name}</h1>
          <h1>{session.user.id}</h1>
          <h1>{session.user.email}</h1>
          <button onClick={() => signOut()}>Sign out</button>
        </div>

        <div>
          <h1>Property Listings</h1>
        </div>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("github")}>Sign in using Github</button>
      {/* <button onClick={() => signIn("google")}>Sign in using Google</button> */}
    </>
  );
}
