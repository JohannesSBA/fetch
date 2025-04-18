"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Dog } from "@/lib/types"
import { MapPin } from "lucide-react"

interface DogCardProps {
  dog: Dog
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
}

export function DogCard({ dog, isFavorite, onToggleFavorite }: DogCardProps) {
  return (
    <Card
      className={`overflow-hidden w-full transition-all cursor-pointer relative hover:shadow-md ${
        isFavorite ? "border-amber-600 border-2" : ""
      }`}
      onClick={() => onToggleFavorite(dog.id)}
    >
      <div className=" relative overflow-hidden">
        <img src={dog.img || "/placeholder.svg"} alt={dog.name} className="w-full h-48 object-cover" />
        <div className={`absolute top-2 right-2 ${isFavorite ? "text-red-500" : "text-gray-400"}`}>♥</div>
      </div>
      <CardContent className="px-4">
        <h3 className="font-semibold text-lg">{dog.name}</h3>
        <p className="text-muted-foreground">{dog.breed}</p>
        <p>Age: {dog.age}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-4 px-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span>Zip: {dog.zip_code}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
