import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Property {
  id: string;
  name: string;
  developerName: string;
  noOfUnit: string;
  location: string;
  tenure: string;
  latitude: string;
  longitude: string;
  developmentDescription: string;
  topDate: string;
  unitMix: string;
  nearbyAmenities: string;
  facilties: string;
}

const fetchPropertyBySlug = async (slug: string): Promise<Property> => {
  const property = await prisma.propertyData.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      developerName: true,
      noOfUnit: true,
      location: true,
      tenure: true,
      latitude: true,
      longitude: true,
      developmentDescription: true,
      topDate: true,
      unitMix: true,
      nearbyAmenities: true,
      facilities: true,
    },
  });

  if (!property) {
    throw new Error();
  }

  return property;
};

export default async function PropertyDetail({
  params,
}: {
  params: { slug: string };
}) {
  const property = await fetchPropertyBySlug(params.slug);
  console.log(property);
  return (
    <>
      <h1 className="text-center">This is the {property.name}</h1>
      <p>
        It has {property.noOfUnit} units in total and it has a {property.tenure}{" "}
        lease
      </p>
      <button className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"></button>
    </>
  );
}
