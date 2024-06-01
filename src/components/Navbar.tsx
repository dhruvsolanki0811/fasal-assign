import Image from "next/image";
import Link from "next/link";
import React from "react";
import fulllogo from "@/assets/fulllogo.png";
import { IoSearch } from "react-icons/io5";

function Navbar() {
  return (
    <>
      <div className="header h-[4rem] w-full  sticky top-0 z-[100] bg-[#171717]">
        <div className="nav-container flex justify-between   ps-[1.5rem] pe-[2.2rem] pt-[0.1rem] pb-[0.5rem] font-bold	text-[2rem]">
          <div className="logo-menu-container flex justify-center items-center flex-nowrap gap-2">
            <Link
              href={"/"}
              className="relative nav-items w-[7.5rem] h-[4.5rem] full-logo cursor-pointer "
            >
              <Image src={fulllogo} fill alt=""></Image>
            </Link>
          </div>
          
          <div className="search-container flex items-center justify-between my-[17px] w-[35vw]  text-white bg-transparend rounded-full ps-2 pe-2 border-[1.5px] border-white border-solid">
            <input
              type="text"
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
