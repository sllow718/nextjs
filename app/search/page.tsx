import Head from "./head";
import { PrismaClient } from "@prisma/client";
import Search from "@/components/search/search";
import PropertyCard from "@/components/listing/propertyCard";

const prisma = new PrismaClient();

export interface propertyCardType {
  id: String;
  name: String;
  developmentDescription: String;
  tenure: String;
  noOfUnit: String;
  latitude: String;
  longitude: String;
  location: String;
  main_image: String;
  slug: String;
}

const fetchPropertybyKeyword = (keyword: string | undefined) => {
  if (!keyword) return prisma.propertyData.findMany();

  return prisma.propertyData.findMany({
    where: {
      name: {
        contains: keyword,
      },
    },
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
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { keyword: string };
}) {
  const properties = await fetchPropertybyKeyword(searchParams.keyword);
  console.log(properties);
  return (
    <>
      <Head></Head>
      <Search />

      {properties.length != 0
        ? properties.map((property) => {
            <PropertyCard key={property.id} property={property} />;
          })
        : "no property found"}
    </>
  );
}
