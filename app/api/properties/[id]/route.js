import connectMongodb from "@/lib/mongodb";
import Property from "@/models/property";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { newTitle: title, newPrice: price } = await request.json();

    if (!id || !title || !price) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await connectMongodb();

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { title, price },
      { new: true }
    );

    if (!updatedProperty) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Property updated", updatedProperty },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongodb();
    
    const property = await Property.findById(id);
    
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
    
    return NextResponse.json({ property }, { status: 200 });
  } catch (error) {
    console.log("Server error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
