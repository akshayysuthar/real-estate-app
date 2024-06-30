"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EditProperty = ({ id, title, price }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newPrice, setNewPrice] = useState(price);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/properties/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTitle, newPrice }),
      });

      if (!res.ok) {
        throw new Error("Failed to update property");
      }
      alert("Done!")

      router.refresh();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Property Title"
      />

      <input
        onChange={(e) => setNewPrice(e.target.value)}
        value={newPrice}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Property Price"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Property
      </button>
    </form>
  );
};

export default EditProperty;
