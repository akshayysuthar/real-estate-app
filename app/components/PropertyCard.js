const PropertyCard = ({ property }) => {
    return (
      <div>
        <h2>{property.title}</h2>
        <p>{property.price}</p>
        <p>{property.location}</p>
        <p>{property.description}</p>
        <p>{property.bedrooms} Bedrooms</p>
        <p>{property.bathrooms} Bathrooms</p>
        <p>{property.area} sq ft</p>
        <p>{property.keyFeatures}</p>
        {property.images.map((url, index) => (
          <img key={index} src={url} alt={property.title} style={{ width: '100px', height: '100px' }} />
        ))}
      </div>
    );
  };
  
  export default PropertyCard;
  