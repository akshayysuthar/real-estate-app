import connectMongodb from "@/lib/mongodb";
import Property from "@/models/property";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newPrice: price } = await request.json();
  await connectMongodb();
  await Property.findByIdAndUpdate(id, { title, price });
  return NextResponse.json({ message: "Property is updated" }, { status: 200 });
}
export async function GET(request, { params }) {
  const { id } = params;
  await connectMongodb();
  const property = await Property.findOne({ _id: id });
  return NextResponse.json({ Property }, { status: 200 });
}
