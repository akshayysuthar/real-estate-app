import mongoose, { Schema } from "mongoose";

const propertySchema = new Schema(
  {
    title: String,
    price: Number,
    name: String,
    email: String,
    location: String,
    description: String,
    bedrooms: Number,
    bathrooms: Number,
    area: String,
    keyFeatures: String,
    images: [String],
  },
  {
    timestamps: true,
  }
);

const Property =
  mongoose.models.Property || mongoose.model("Property", propertySchema);

export default Property;
