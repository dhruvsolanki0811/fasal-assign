'use client'
import React from 'react'
import SearchImageCard from './SearchImageCard'
import { useSearchStore } from '@/store/searchStore'

function SearchGrid() {
const {shows}=useSearchStore()
  return (
    <>
      <div className="search-grid  flex justify-center flex-wrap mt-10 gap-y-6 gap-x-5 w-full">
            {shows.map((show) => (
          <SearchImageCard show={show} key={show.imdbID}></SearchImageCard>
        ))}
      </div>
    </>
  )
}

export default SearchGrid