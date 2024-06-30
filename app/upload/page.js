"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { storage } from "../../lib/firebase";

import React from "react";
import { Router } from "react-bootstrap-icons";

const page = () => {

  const router = useRouter();

  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
    const res = await fetch("http://localhost:3000/api/properties", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
        name:session.user.name, 
        email: session.user.email,
      }),
    });
    if (res.ok) {
      console.log("Property uploaded successfully");
      router.push('/')
      alert("Property uploaded successfully");
    } else {
      console.error("Failed to upload property" , error);
    }
  };

  if (!session) {
    return <p>Please log in to upload a property.</p>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid items-center justify-center gap-3">
        <h1>Add all details about your properties</h1>
        <h1>Name : {session.user.name}</h1>
          {/* <h1>ID : {session.user.id}</h1> */}
          {/* <h1>Email : {session.user.email}</h1> */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          className="rounded-md borber"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={session.user.name}
          className="rounded-md borber"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={session.user.email}
          className="rounded-md borber"
          onChange={(e) => setEmail(e.target.value)}
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
        <input type="file" multiple onChange={handleImageUpload} />
        <button type="submit">Upload Property</button>
      </div>{" "}
    </form>
  );
};

export default page;