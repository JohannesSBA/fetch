"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ArrowLeft, PawPrintIcon as Paw } from "lucide-react"
import { toast } from "sonner"
import { Dog } from "@/lib/types"

export default function MatchPage() {
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const dogData = sessionStorage.getItem("matchedDog")
    if (dogData) {
      setMatchedDog(JSON.parse(dogData))
      toast.success("You've been matched with a dog!")
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Paw className="mx-auto h-12 w-12 animate-bounce text-rose-500" />
          <h2 className="mt-4 text-xl font-semibold">Finding your perfect match...</h2>
        </div>
      </div>
    )
  }

  if (!matchedDog) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">No Match Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>We couldn't find your matched dog. Please try again.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.push("/search")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-amber-100 p-4">
      <Card className="w-full max-w-md overflow-hidden">
        <CardHeader className=" text-amber-600">
          <CardTitle className="text-center text-2xl">
            <Heart className="mx-auto mb-2 h-8 w-8 fill-white" />
            It's a Match!
          </CardTitle>
        </CardHeader>
        <div className="relative h-64 w-full">
          <img
            src={matchedDog.img || "/placeholder.svg"}
            alt={matchedDog.name}
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
        <CardContent className="p-6">
          <h2 className="mb-2 text-center text-3xl font-bold text-amber-600">{matchedDog.name}</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg bg-gray-100 p-3">
              <p className="font-medium">Breed</p>
              <p>{matchedDog.breed}</p>
            </div>
            <div className="rounded-lg bg-gray-100 p-3">
              <p className="font-medium">Age</p>
              <p>
                {matchedDog.age} {matchedDog.age === 1 ? "year" : "years"}
              </p>
            </div>
            <div className="rounded-lg bg-gray-100 p-3">
              <p className="font-medium">Location</p>
              <p>{matchedDog.zip_code}</p>
            </div>
            <div className="rounded-lg bg-gray-100 p-3">
              <p className="font-medium">ID</p>
              <p className="truncate text-xs">{matchedDog.id}</p>
            </div>
          </div>
          <p className="mt-6 text-center text-gray-600">
            Congratulations! You've been matched with {matchedDog.name}. This {matchedDog.age}-year-old{" "}
            {matchedDog.breed} is waiting to meet you!
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/search")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Button>
          <Button className="bg-amber-500 hover:bg-amber-600">
            <Heart className="mr-2 h-4 w-4" />
            Adopt Me
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
