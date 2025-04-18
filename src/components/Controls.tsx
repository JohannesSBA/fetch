import React from "react";

interface ControlsProps {
  breeds: string[];
  selectedBreed: string;
  setSelectedBreed: (breed: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  city: string;
  setCity: (city: string) => void;
  states: string[];
  setStates: (states: string[]) => void;
  geoBoundingBox: any;
  setGeoBoundingBox: (box: any) => void;
  onSearch: () => void;
}

export const Controls = ({
  breeds,
  selectedBreed,
  setSelectedBreed,
  sortOrder,
  setSortOrder,
  city,
  setCity,
  states,
  setStates,
  geoBoundingBox,
  setGeoBoundingBox,
  onSearch
}: ControlsProps) => (
  <div className="space-x-2">
    <input
      type="text"
      placeholder="City"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className="p-2 border rounded"
    />
    <input
      type="text"
      placeholder="States (comma-separated)"
      value={states.join(",")}
      onChange={(e) => setStates(e.target.value.split(","))}
      className="p-2 border rounded"
    />
    <div className="inline-flex gap-2">
      <input
        type="number"
        placeholder="Top lat"
        value={geoBoundingBox.top}
        onChange={(e) => setGeoBoundingBox({...geoBoundingBox, top: e.target.value})}
        className="p-2 border rounded w-32"
      />
      <input
        type="number"
        placeholder="Left lon"
        value={geoBoundingBox.left}
        onChange={(e) => setGeoBoundingBox({...geoBoundingBox, left: e.target.value})}
        className="p-2 border rounded w-32"
      />
      <input
        type="number"
        placeholder="Bottom lat"
        value={geoBoundingBox.bottom}
        onChange={(e) => setGeoBoundingBox({...geoBoundingBox, bottom: e.target.value})}
        className="p-2 border rounded w-32"
      />
      <input
        type="number"
        placeholder="Right lon"
        value={geoBoundingBox.right}
        onChange={(e) => setGeoBoundingBox({...geoBoundingBox, right: e.target.value})}
        className="p-2 border rounded w-32"
      />
    </div>
    <select
      className="p-2 border rounded"
      value={selectedBreed}
      onChange={(e) => setSelectedBreed(e.target.value)}
    >
      <option value="">All Breeds</option>
      {breeds.map((breed) => (
        <option key={breed} value={breed}>{breed}</option>
      ))}
    </select>
    <button
      className="p-2 bg-gray-200 rounded"
      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
    >
      Sort: {sortOrder.toUpperCase()}
    </button>
    <button
      onClick={onSearch}
      className="p-2 bg-blue-500 text-white rounded"
    >
      Search
    </button>
  </div>
); 