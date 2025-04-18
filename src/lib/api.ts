import type { Dog, Location, SearchResults, MatchResult } from "@/lib/types"

const API_BASE_URL = "https://frontend-take-home-service.fetch.com"

// Authentication
export async function login(name: string, email: string): Promise<Response> {
  return fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
    credentials: "include",
  })
}

export async function logout(): Promise<Response> {
  return fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  })
}

// Dogs
export async function getBreeds(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/dogs/breeds`, {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch breeds")
  }

  return response.json()
}

export async function searchDogs(params: {
  breeds?: string[]
  zipCodes?: string[]
  ageMin?: number
  ageMax?: number
  size?: number
  from?: string
  sort?: string
}): Promise<SearchResults> {
  // Build query string
  const queryParams = new URLSearchParams()

  if (params.breeds && params.breeds.length > 0) {
    params.breeds.forEach((breed) => queryParams.append("breeds", breed))
  }

  if (params.zipCodes && params.zipCodes.length > 0) {
    params.zipCodes.forEach((zipCode) => queryParams.append("zipCodes", zipCode))
  }

  if (params.ageMin !== undefined) {
    queryParams.append("ageMin", params.ageMin.toString())
  }

  if (params.ageMax !== undefined) {
    queryParams.append("ageMax", params.ageMax.toString())
  }

  if (params.size !== undefined) {
    queryParams.append("size", params.size.toString())
  }

  if (params.from) {
    queryParams.append("from", params.from)
  }

  if (params.sort) {
    queryParams.append("sort", params.sort)
  }

  const response = await fetch(`${API_BASE_URL}/dogs/search?${queryParams.toString()}`, {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to search dogs")
  }

  return response.json()
}

export async function getDogs(ids: string[]): Promise<Dog[]> {
  const response = await fetch(`${API_BASE_URL}/dogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ids),
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch dogs")
  }

  return response.json()
}

export async function getMatch(ids: string[]): Promise<MatchResult> {
  const response = await fetch(`${API_BASE_URL}/dogs/match`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ids),
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to get match")
  }

  return response.json()
}

// Locations
export async function getLocations(zipCodes: string[]): Promise<Location[]> {
  const response = await fetch(`${API_BASE_URL}/locations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(zipCodes),
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch locations")
  }

  return response.json()
}
