"use client";
import EditProperty from "@/app/components/EditProperty";
import React from "react";
const getPropertyById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/properties/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch property");
    }

    return res.json();
    console.log(json);
  } catch (error) {
    console.error("Error loading property:", error);
  }
};

export default async function Page({ params }) {
  const { id } = params;
  console.log("Id :", id);
  const { title, price } = await getPropertyById(id);
  console.log(title);

  return <EditProperty id={id} title={title} price={price} />;
}
