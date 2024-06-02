'use client'
import Playlistcard from "@/components/Playlistcard";
import SearchGrid from "@/components/SearchGrid";
import { useSearchStore } from "@/store/searchStore";

export default function Home() {
  const {query}=useSearchStore()
  if (query.length > 0) {
    return (
      <>
       <SearchGrid></SearchGrid>
      </>
    );
  }
  return (
    <>
    {}
      <div className="content-wrapper px-[2.4rem] mt-10">
        <div className="header font-[600] text-[1.2rem] flex justify-center ">Your Lists</div>
        <div className="list-grid flex justify-center flex-wrap mt-6 gap-y-10 gap-x-5 w-full">
          {[1,4,5,6,7,78,8,2,3,23,321].map((i) => (
            <Playlistcard key={i}></Playlistcard>
          ))}
        </div>
      </div>
    </>
  );
}
