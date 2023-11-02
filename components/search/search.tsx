"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  return (
    <>
      <div className="m-auto flex justify-center py-3 text-left text-lg">
        <input
          className="mr-3 w-auto rounded p-2"
          type="text"
          placeholder="Search for your project"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button
          className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
          onClick={() => {
            if (location.length === 0) {
              return;
            }
            router.push(`/search?keyword=${location}`);
            setLocation("");
          }}
        >
          Click me
        </button>
      </div>
    </>
  );
}
