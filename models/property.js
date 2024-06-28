import mongoose, { Schema } from "mongoose";
import { stringify } from "postcss";

const propertySchema = new Schema(
  {
    title: String,
    price: Number,
    // location: String,
    // description: String,
    // bedrooms: Number,
    // bathrooms: Number,
    // area: String,
    // keyFeatures: String,
    // images: String,
    // userId:String,
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.models.Property || mongoose.model("Property", propertySchema );

export default Property;