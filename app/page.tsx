import { useRouter } from "next/navigation"; // Change from "next/navigation" to "next/router"
import { useState } from "react";
import PropertyListing from "@/components/listing/propertyListing";
import Search from "@/components/search/search";

export default function Home() {
  return (
    <>
      <Search />
      <PropertyListing></PropertyListing>
    </>
  );
}
