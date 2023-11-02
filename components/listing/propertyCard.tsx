import Link from "next/link";
import { propertyCardType } from "./propertyListing";

interface Props {
  property: propertyCardType;
}

export default function PropertyCard({ property }: Props) {
  const cdn = "https://blackhole.b-cdn.net";
  return (
    <>
      <Link href={`/project/${property.slug}`}>
        <div
          className="md:max-w-s max-w-md overflow-hidden rounded px-2 py-2 shadow-lg"
          style={{ height: "350px", marginBottom: "20px" }}
        >
          <img
            src={property.main_image.replace("cdn:/", cdn)}
            alt="test"
            style={{
              width: "100%", // Ensure the image fills the container
              height: "200px", // Set a fixed height for the container
              objectFit: "cover", // Maintain aspect ratio and cover container
              display: "block",
              verticalAlign: "top", // Align the image to the top
            }}
          />
          <div className="px-6 py-4">
            <div className="mb-2 text-xl font-bold">
              {property.name}
              <br></br>
              <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                {property.location}
              </span>
              <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                {property.tenure}
              </span>
              <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                {property.noOfUnit} Units
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
