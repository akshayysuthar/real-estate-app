import clientPromise from "../api/auth/lib/mongodb";

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('properties');

  if (req.method === 'POST') {
    const {
      title,
      price,
      location,
      description,
      bedrooms,
      bathrooms,
      area,
      keyFeatures,
      images,
      userId,
    } = req.body;

    try {
      const property = {
        title,
        price,
        location,
        description,
        bedrooms,
        bathrooms,
        area,
        keyFeatures,
        images,
        userId,
        createdAt: new Date(),
      };

      await collection.insertOne(property);
      res.status(201).json({ message: 'Property uploaded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const properties = await collection.find({}).toArray();
      res.status(200).json({ properties });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
