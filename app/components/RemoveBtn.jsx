"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const removeProperty = async () => {
    const confirmed = confirm("Are you sure? ");
    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/properties?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    }
  };
  return <button onClick={removeProperty}>Delete</button>;
}
