import connectMongodb from "@/lib/mongodb";
import Property from "@/models/property";
import { NextResponse } from "next/server";
import { AwardFill } from "react-bootstrap-icons";

// to upload data in db
export async function POST(request) {
  try {
    const {
      title,
      price,
      name,
      email,
      location,
      description,
      bedrooms,
      bathrooms,
      area,
      keyFeatures,
      images,
    } = await request.json();

    if (!title || !price || !name || !email) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await connectMongodb();

    const newProperty = new Property({
      title,
      price,
      name,
      email,
      location,
      description,
      bedrooms,
      bathrooms,
      area,
      keyFeatures,
      images,
    });

    await newProperty.save();

    return NextResponse.json(
      { message: "Property created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Server error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// to get data from db
export async function GET() {
  await connectMongodb();
  const properties = await Property.find();
  return NextResponse.json({ properties });
}

// to delete data from db
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongodb();
  await Property.findByIdAndDelete(id);
  return NextResponse.json({ message: "Property is deleted" }, { status: 200 });
}
