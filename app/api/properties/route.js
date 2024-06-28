import connectMongodb from "@/lib/mongodb";
import Property from "@/models/property";
import { NextResponse } from "next/server";
import { AwardFill } from "react-bootstrap-icons";

// to upload data in db
export async function POST(request) {
  const { title, price } = await request.json();
  await connectMongodb();
  await Property.create({ title, price });
  return NextResponse.json({ message: "Properties uploaded" }, { status: 201 });
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
