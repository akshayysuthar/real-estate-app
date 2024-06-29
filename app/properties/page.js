import Link from "next/link";
import RemoveBtn from "../components/RemoveBtn";

const getproperties = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/properties", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading properties: ", error);
  }
};

export default async function propertiesList() {
  const { properties } = await getproperties();

  return (
    <>
      {properties.map((property) => (
        <div
          key={property._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
  
          <div>
            <div>
              <h1>{property.userId}</h1>
              <h1>{property.userName}</h1>
              <h1>{property.userEmail}</h1>
            </div>
            <h2 className="font-bold text-2xl">{property.title}</h2>
            <p>{property.price}</p>
            <p>{property.location}</p>
            <p>{property.description}</p>
            <p>{property.bedrooms} Bedrooms</p>
            <p>{property.bathrooms} Bathrooms</p>
            <p>{property.area} sq ft</p>
            <p>{property.keyFeatures}</p>

            {/* {property.images.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={property.title}
                style={{ width: "100px", height: "100px" }}
              />
            ))} */}
          </div>

          <div className="flex gap-2">
            <Link href={`/editProperty/${property._id}`}>edit</Link>
            <RemoveBtn id={property._id} />
          </div>
        </div>
      ))}
    </>
  );
}
