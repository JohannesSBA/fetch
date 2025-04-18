import { useFavorites } from "@/context/FavoritesContext"
import type { Dog } from "@/lib/types"
import { DogCard } from "@/components/DogCard"

export function DogList({ dogs }: { dogs: Dog[] }) {
  const { favorites, toggleFavorite } = useFavorites()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} isFavorite={favorites.includes(dog.id)} onToggleFavorite={toggleFavorite} />
      ))}
    </div>
  )
}
