"use client"

import React, { useEffect, useState } from "react";
import DogSearch from "@/components/DogSearch";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 12;

const Search = () => {
    const { isAuthenticated } = useAuth()
    const router = useRouter()
    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/")
        }
    }, [isAuthenticated, router])

  return (
    <div>
      <div className="p-4 max-w-7xl mx-auto">
        <div className="flex sticky top-0 bg-white p-4 justify-center items-center border-b border-gray-200 z-50">
        <h1 className="text-2xl font-bold">Select a dog so we can find you a <span className="text-amber-600">match!</span></h1>

        </div>
        <DogSearch />
      </div>
    </div>
  );
};

export default Search;
