"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Heart, Filter, X, LogOut } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { SearchResults, Dog } from "@/lib/types"
import { getBreeds, getDogs, getMatch, searchDogs } from "@/lib/api"
import Pagination from "./Pagination"
import { DogCard } from "./DogCard"
import { toast } from "sonner"

export default function DogSearch() {
  const [breeds, setBreeds] = useState<string[]>([])
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])
  const [ageRange, setAgeRange] = useState<[number, number]>([0, 20])
  const [sortOrder, setSortOrder] = useState<string>("breed:asc")
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null)
  const [dogs, setDogs] = useState<Dog[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const pageSize = 20
  const router = useRouter()

  // Fetch breeds on component mount
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const breedsData = await getBreeds()
        setBreeds(breedsData.sort())
      } catch (error) {
        toast.error("Failed to fetch dog breeds")
      }
    }

    fetchBreeds()
  }, [toast])

  // Search dogs with current filters
  const handleSearch = async (fromCursor?: string) => {
    setIsLoading(true)
    try {
      const results = await searchDogs({
        breeds: selectedBreeds.length > 0 ? selectedBreeds : undefined,
        ageMin: ageRange[0],
        ageMax: ageRange[1],
        size: pageSize,
        from: fromCursor,
        sort: sortOrder,
      })

      setSearchResults(results)

      if (results.resultIds.length > 0) {
        const dogsData = await getDogs(results.resultIds)
        setDogs(dogsData)
      } else {
        setDogs([])
      }

      if (!fromCursor) {
        setCurrentPage(1)
      }
    } catch (error) {
        toast.error("Failed to search dogs")
      
    } finally {
      setIsLoading(false)
      setIsFilterOpen(false)
    }
  }

  // Initial search on component mount
  useEffect(() => {
    handleSearch()
  }, [sortOrder]) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle pagination
  const handleNextPage = () => {
    if (searchResults?.next) {
      const fromParam = new URLSearchParams(searchResults.next).get("from")
      if (fromParam) {
        handleSearch(fromParam)
        setCurrentPage(currentPage + 1)
      }
    }
  }

  const handlePrevPage = () => {
    if (searchResults?.prev) {
      const fromParam = new URLSearchParams(searchResults.prev).get("from")
      handleSearch(fromParam || undefined)
      setCurrentPage(currentPage - 1)
    }
  }

  // Handle favorites
  const toggleFavorite = (dogId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(dogId)) {
      newFavorites.delete(dogId)
    } else {
      newFavorites.add(dogId)
    }
    setFavorites(newFavorites)
  }

  // Generate match
  const generateMatch = async () => {
    if (favorites.size === 0) {
      toast.error("No favorites selected")
      return
    }

    setIsLoading(true)
    try {
      const favoriteIds = Array.from(favorites)
      const matchResult = await getMatch(favoriteIds)

      // Get the matched dog details
      const matchedDogs = await getDogs([matchResult.match])
      if (matchedDogs.length > 0) {
        // Store the match in session storage to access it on the match page
        sessionStorage.setItem("matchedDog", JSON.stringify(matchedDogs[0]))
        router.push("/match")
      }
    } catch (error) {
      toast.error("Failed to generate match")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      if (response.ok) {
        router.push("/")
      }
    } catch (error) {
      toast.error("Failed to logout")
    }
  }

  // Add breed to filter
  const addBreedFilter = (breed: string) => {
    if (!selectedBreeds.includes(breed)) {
      setSelectedBreeds([...selectedBreeds, breed])
    }
  }

  // Remove breed from filter
  const removeBreedFilter = (breed: string) => {
    setSelectedBreeds(selectedBreeds.filter((b) => b !== breed))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sticky top-0 bg-white p-4 border-b border-gray-200 z-50 sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-amber-600 text-white">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Dogs</SheetTitle>
                <SheetDescription>Customize your search to find the perfect dog</SheetDescription>
              </SheetHeader>
              <div className="p-4 space-y-6">
                <div className="space-y-2">
                  <Label>Breed</Label>
                  <Select onValueChange={(value) => addBreedFilter(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select breed" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {breeds.map((breed) => (
                        <SelectItem key={breed} value={breed}>
                          {breed}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedBreeds.map((breed) => (
                      <Badge key={breed} variant="secondary" className="flex items-center gap-1">
                        {breed}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeBreedFilter(breed)} />
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>
                    Age Range: {ageRange[0]} - {ageRange[1]} years
                  </Label>
                  <Slider
                    defaultValue={ageRange}
                    min={0}
                    max={20}
                    step={1}
                    onValueChange={(value) => setAgeRange(value as [number, number])}
                    className="my-4"
                  />
                </div>
                <Button onClick={() => handleSearch()} className="w-full bg-amber-600 text-white">
                  Apply Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Sort:{" "}
                {sortOrder === "breed:asc"
                  ? "Breed (A-Z)"
                  : sortOrder === "breed:desc"
                    ? "Breed (Z-A)"
                    : sortOrder === "age:asc"
                      ? "Age (Youngest)"
                      : "Age (Oldest)"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortOrder("breed:asc")}>Breed (A-Z)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("breed:desc")}>Breed (Z-A)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("age:asc")}>Age (Youngest First)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("age:desc")}>Age (Oldest First)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
          <Button
            onClick={generateMatch}
            disabled={favorites.size === 0 || isLoading}
            className="bg-amber-600 text-white flex items-center gap-2 w-full sm:w-auto"
          >
            <Heart className="h-4 w-4" />
            Find Match ({favorites.size})
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="h-[300px] animate-pulse bg-gray-100" />
          ))}
        </div>
      ) : dogs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {dogs.map((dog) => (
              <DogCard
                key={dog.id}
                dog={dog}
                isFavorite={favorites.has(dog.id)}
                onToggleFavorite={() => toggleFavorite(dog.id)}
              />
            ))}
          </div>

          {searchResults && (
            <Pagination
              currentPage={currentPage}
              totalResults={searchResults.total}
              pageSize={pageSize}
              hasNextPage={!!searchResults.next}
              hasPrevPage={!!searchResults.prev}
              onNextPage={handleNextPage}
              onPrevPage={handlePrevPage}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700">No dogs found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters to find more dogs</p>
        </div>
      )}
    </div>
  )
}
