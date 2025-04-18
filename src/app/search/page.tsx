"use client"

import React, { useEffect, useState } from "react";
import { getBreeds, searchDogs, getDogsByIds } from "@/api/dogs";

import { useRouter } from "next/navigation";
import { useFavorites } from "@/context/FavoritesContext";
import { DogList } from "@/components/DogList";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const PAGE_SIZE = 12;

const Search = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string | "">("");
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [total, setTotal] = useState(0);
  const [from, setFrom] = useState(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { favorites, toggleFavorite } = useFavorites();
  const router = useRouter();
  const [city, setCity] = useState("");
  const [states, setStates] = useState<string[]>([]);
  const [geoBoundingBox, setGeoBoundingBox] = useState({
    top: "",
    left: "",
    bottom: "",
    right: ""
  });

  const fetchData = async () => {
    const searchRes = await searchDogs({
      breeds: selectedBreed ? [selectedBreed] : undefined,
      city: city || undefined,
      states: states.length > 0 ? states : undefined,
      geoBoundingBox: Object.values(geoBoundingBox).some(v => v) ? {
        top: Number(geoBoundingBox.top),
        left: Number(geoBoundingBox.left),
        bottom: Number(geoBoundingBox.bottom),
        right: Number(geoBoundingBox.right)
      } : undefined,
      size: PAGE_SIZE,
      from,
      sort: `breed:${sortOrder}`,
    });

    const fullDogs = await getDogsByIds(searchRes.resultIds);
    setDogs(fullDogs);
    setTotal(searchRes.total);
  };

  useEffect(() => {
    getBreeds().then(setBreeds);
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedBreed, from, sortOrder]);

  const handleNext = () => {
    if (from + PAGE_SIZE < total) setFrom(from + PAGE_SIZE);
  };

  const handlePrev = () => {
    if (from > 0) setFrom(from - PAGE_SIZE);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => router.push("/match")}
          disabled={favorites.length === 0}
          className="bg-amber-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Generate Match ({favorites.length})
        </button>
      </div>

      <DogList dogs={dogs} />

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={from === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={from + PAGE_SIZE >= total}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Search;
