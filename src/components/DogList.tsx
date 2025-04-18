import { useFavorites } from "@/context/FavoritesContext";
import { Dog } from "@/lib/types";

export function DogList({ dogs }: { dogs: Dog[] }) {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dogs.map((dog) => (
          <button
            key={dog.id}
            onClick={() => toggleFavorite(dog.id)}
            className={`border rounded p-4 shadow relative bg-white ${favorites.includes(dog.id) ? "border-amber-600 border-2" : ""}`}
          >
            <img
              src={dog.img}
              alt={dog.name}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold">{dog.name}</h3>
            <p>{dog.breed}</p>
            <p>Age: {dog.age}</p>
            <p>Zip: {dog.zip_code}</p>
            <div
              className={`absolute top-2 right-2 ${
                favorites.includes(dog.id) ? "text-red-500" : "text-gray-400"
              }`}
            >
              ♥
            </div>
          </button>
        ))}
      </div>
  );
}
