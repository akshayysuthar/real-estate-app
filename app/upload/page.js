"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { storage } from "../../lib/firebase";

import React from "react";

const page = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [area, setArea] = useState("");
  const [keyFeatures, setKeyFeatures] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  //   to uplaod Images
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const urls = [];
    for (const file of files) {
      const storageRef = storage.ref().child(`images/${uuidv4()}-${file.name}`);
      await storageRef.put(file);
      const url = await storageRef.getDownloadURL();
      urls.push(url);
    }
    setImageUrls(urls);
  };

  // to submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) return;
    const res = await fetch("upload", {
      method: "POST",
      body: JSON.stringify({
        title,
        price,
        location,
        description,
        bedrooms,
        bathrooms,
        area,
        keyFeatures,
        images: imageUrls,
        userId: session.user.id,
      }),
    });
    if (res.ok) {
      console.log("Property uploaded successfully");
      alert("Property uploaded successfully");
    } else {
      console.error("Failed to upload property");
    }
  };

  if (!session) {
    return <p>Please log in to upload a property.</p>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        
      />
      <input
        type="number"
        placeholder="Bedrooms"
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)}
        
      />
      <input
        type="number"
        placeholder="Bathrooms"
        value={bathrooms}
        onChange={(e) => setBathrooms(e.target.value)}
        
      />
      <input
        type="text"
        placeholder="Area"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        
      />
      <input
        type="text"
        placeholder="Key Features"
        value={keyFeatures}
        onChange={(e) => setKeyFeatures(e.target.value)}
        
      />
      <input type="file" multiple onChange={handleImageUpload}  />
      <button type="submit">Upload Property</button>
    </form>
  );
};

export default page;
