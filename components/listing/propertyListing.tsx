import PropertyCard from "./propertyCard";
import { PrismaClient } from "@prisma/client";
import "./propertyListing.css";
const prisma = new PrismaClient();

export interface propertyCardType {
  id: String;
  name: String;
  developmentDescription: String;
  tenure: String;
  noOfUnit: String;
  latitude: Number;
  longitude: Number;
  location: String;
  main_image: String;
  slug: String;
}

export interface filters {
  keyword: String;
}

const fetchProperties = async () => {
  const properties = await prisma.propertyData.findMany({
    select: {
      id: true,
      name: true,
      developmentDescription: true,
      tenure: true,
      noOfUnit: true,
      latitude: true,
      longitude: true,
      location: true,
      main_image: true,
      slug: true,
    },
  });

  return properties;
};

export default async function PropertyListing({ filter }: filters) {
  const properties = await fetchProperties();

  return (
    <>
      <div className="cards">
        {properties.map((propertyDetails) => (
          <PropertyCard key={propertyDetails.id} property={propertyDetails} />
        ))}
      </div>
    </>
  );
}
