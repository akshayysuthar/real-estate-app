import React from "react";
import Link from "next/link";
import Property from "@/models/property";

const getProperties = async () => {
  try {
    await fetch("http://localhost:3000/api/properties", {
      cache: "no-store",
    });
    console.log();
    if (!resizeBy.ok) {
      throw new Error("Failed to fetch properties");
    }
    return resizeBy.json();
  } catch (error) {
    console.log("Error loading : ", error);
  }
};


export default async function page() {
  const property = await getProperties();
  return (
    {Property.length > 0 ? (
      Property.map((p, index) => (
        <h1 key={index}>{p.title}</h1>
      ))
    ) : (
      <p>No properties found.</p>
    )}
  );
}
