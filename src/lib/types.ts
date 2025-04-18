// Dog interface as specified in the requirements
export interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

// Location interface as specified in the requirements
export interface Location {
  zip_code: string
  latitude: number
  longitude: number
  city: string
  state: string
  county: string
}

// Search results interface
export interface SearchResults {
  resultIds: string[]
  total: number
  next?: string
  prev?: string
}

// Match result interface
export interface MatchResult {
  match: string
}