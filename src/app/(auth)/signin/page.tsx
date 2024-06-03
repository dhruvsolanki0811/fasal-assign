"use client";
import Loader from "@/components/Loader";
import SearchGrid from "@/components/SearchGrid";
import { useSearchStore } from "@/store/searchStore";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaKey, FaRegEye } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {toast} from "sonner";
import { WithoutAuth } from "@/components/HOC/WithoutAuth";

function Signin() {
  const [loading,setLoading]=useState(false)
    
  const { query ,setQuery,setShows} = useSearchStore();

  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(()=>{
    setQuery("")
    setShows([])
  },[])
  const [passwordShown, setPasswordShown] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (query.length > 0) {
    return (
      <>
        <SearchGrid></SearchGrid>
      </>
    );
  }
  return (
    <>
      <div className="content-wrapper flex flex-nowrap h-[80vh] w-full items-center justify-center ">
        <form
            method="POST"
          className="login-box flex flex-col gap-2 ps-2 pe-2 items-center  w-[20rem] bg-transparent"
          onSubmit={async(e:FormEvent) => {
            e.preventDefault();
            setLoading(true)
            const signInData =await signIn("credentials", {
              redirect: false,
              email: formData.email,
              password: formData.password,
            });
            if (signInData?.error) {
                toast.error('Incorrect Details');
              } else {
                toast.success('Login Successful!')

                setFormData({email:"",password:""});

              }
              setLoading(false)
          }}
        >
          <div className="login-box-title  font-bold text-[25px]">SignIn</div>

          <div className="login-box-input w-full rounded-[10px]  flex gap-3 items-center ps-2 pe-2 pt-[2px] pb-[1px] h-[40px] overflow-hidden border-[2px] border-solid border-[white]">
            <IoPerson className="text-white text-xl" />
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="text-white text-[17px] bg-transparent outline-none border-none h-full w-[95%]"
            />
          </div>
          <div className="login-box-input w-full rounded-[10px] flex gap-3 items-center ps-2 pe-2 pt-[2px] pb-[1px] h-[40px]  overflow-hidden border-[2px] border-solid border-[white]">
            <FaKey className="text-white text-l" />
            <input
              required
              type={passwordShown ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="text-white text-[17px] bg-transparent outline-none border-none h-full w-[90%]"
            />
            <FaRegEye
              onClick={() => {
                setPasswordShown(!passwordShown);
              }}
              className="cursor-pointer text-white text-l"
            />
          </div>
          {loading? (
            <div className="mt-2">
              <Loader></Loader>
            </div>
          ) : (
            <button
              type="submit"
              className="login-box-button w-full h-[2rem] rounded-[10px] bg-[var(--netflix-font-red)] mt-2 text-white flex justify-center items-center text-[17px] font-semibold"
            >
              Login
            </button>
          )}
          <div className="create-link text-white text-[17px] font-semibold mt-3">
            Dont have an account?
          </div>
          <div
            onClick={() => {
              router.push("/signup");
            }}
            className="create-link cursor-pointer text-[17px] text-[var(--netflix-font-red)] font-semibold"
          >
            Signup
          </div>
        </form>
      </div>
    </>
  );
}

export default WithoutAuth(Signin);
