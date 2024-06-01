"use client";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import fulllogo from "@/assets/fulllogo.png";
import smalllogo from "@/assets/smalllogo.png";

import { IoSearch } from "react-icons/io5";
import { useSearchStore } from "@/store/searchStore";
import { useSearchShow } from "@/hooks/useShowData";

function Navbar() {
  const { data, isLoading, isError, refetch } = useSearchShow();
  const { query, setQuery, setShows, shows } = useSearchStore();
  const [debounceValue, setDebounceValue] = useState("");

  const [timeOutId, settimeOutId] = useState<NodeJS.Timeout | null>();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    let timeId: NodeJS.Timeout = setTimeout(async () => {
      setDebounceValue(query);
    }, 500);
    settimeOutId(timeId);
  }, [query]);

  useEffect(() => {
    if(query.length>0){
    refetchQuery();}else{
        setShows([])
    }
}, [debounceValue]);
  const refetchQuery = async () => {
    const { data: updatedSearchResult } = await refetch();
    if (updatedSearchResult) {
      setShows(updatedSearchResult);
    }

  };

  
  return (
    <>
      <div className="header h-[4rem] w-full  sticky top-0 z-[10000] bg-[#171717]">
        <div className="nav-container flex justify-between   ps-[1.5rem] pe-[2.2rem] pt-[0.1rem] pb-[0.5rem] font-bold	text-[2rem]">
          <div className="logo-menu-container flex justify-center items-center flex-nowrap gap-2">
            <Link
              href={"/"}
              className="relative max-sm:hidden nav-items w-[7.5rem] h-[4.5rem] full-logo cursor-pointer "
            >
              <Image src={fulllogo} fill alt=""></Image>
            </Link>
            <Link
              href={"/"}
              className="hidden relative max-sm:block nav-items w-[2.5rem] h-[2.5rem] full-logo cursor-pointer "
            >
              <Image src={smalllogo} fill alt=""></Image>
            </Link>
          </div>

          <div className="search-container flex items-center justify-between my-[17px] w-[35vw] h-[2.2rem] text-white bg-transparend rounded-full ps-2 pe-2 border-[1.5px] border-white border-solid">
            <input
              type="text"
              value={query}
              onChange={handleOnChange}
              className="search-box w-[90%] h-full bg-transparent outline-none text-[1rem] px-2"
              placeholder="Search..."
            />
            <IoSearch className="search-box text-[1.4rem] cursor-pointer" />
          </div>
          <div className="account text-[14px] font-semibold flex items-center justify-center rounded-[4px] bg-[var(--netflix-font-red)] my-5 ps-2 pe-2 cursor-pointer hover:bg-[#c61414]">
            Signin
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
