"use client";
import { WithoutAuth } from "@/components/HOC/WithoutAuth";
import Loader from "@/components/Loader";
import SearchGrid from "@/components/SearchGrid";
import { useSearchStore } from "@/store/searchStore";
import { User } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FaKey, FaRegEye } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { toast } from "sonner";


const registerUser=async (formData:User)=>{
    try {
        const response=await axios.post((`/api/auth/signup`), formData);
        toast.success("You are now registered!");
        const user=await response.data.savedUser
        return user
      } catch (error) {
        if(isAxiosError(error)&& error.response?.data && error.response?.data.error){
            console.log(error)
            toast.error(error.response?.data.error)
        }
        else
        throw error;
      }
}
function Signup() {
  const { query,setQuery,setShows } = useSearchStore();
  useEffect(()=>{
    setQuery("")
    setShows([])
  },[])
  const router=useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);

  const {
    mutate: createUser,
    isPending: loader,
    error,
  } =useMutation({
    mutationFn: registerUser,
    onError(error, variables, context) {
      console.log(error)
    },
    onSuccess: async (data) => {
      // console.log(error);
      signIn('credentials',{
        redirect: false,
        email: data.email,
        password: formData.password,
      })
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: ""
        });
      
    },
  });
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
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
          onSubmit={(e)=>{
            e.preventDefault()
            if (!formData.firstName.trim()) {
                toast.error("First Name is required");
                return;
              }
              
              if (!formData.lastName.trim()) {
                toast.error("Last Name is required");
                return;
              }
              if (!formData.email.trim()) {
                toast.error("Email is required");
                return;
              }
              createUser(formData)
          }}
        >
          <div className="login-box-title  font-bold text-[25px]">
            Signup
          </div>
          <div className="login-box-input w-full rounded-[10px] mt-3 flex gap-3 items-center ps-2 pe-2 pt-[2px] pb-[1px] h-[40px]  overflow-hidden border-[2px] border-solid border-[white]">
            <IoPerson className="text-white text-[20px]" />
            <input
              required
              type="text"
              name="firstName"
              placeholder="Firstname"
              value={formData.firstName}
              onChange={handleChange}
              className="text-white text-[17px] bg-transparent outline-none border-none h-full w-[95%]"
            />
          </div>
          <div className="login-box-input w-full rounded-[10px]  flex gap-3 items-center ps-2 pe-2 pt-[2px] pb-[1px] h-[40px]  overflow-hidden border-[2px] border-solid border-[white]">
            <IoPerson className="text-white text-xl" />
            <input
              required
              type="text"
              name="lastName"
              placeholder="Lastname"
              value={formData.lastName}
              onChange={handleChange}
              className="text-white text-[17px] bg-transparent outline-none border-none h-full w-[95%]"
            />
          </div>
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
          {loader ? (
            <div
              className="mt-2"
            >
              <Loader></Loader>
            </div>
          ) : (
            <button
              type="submit"
              className="login-box-button w-full h-[2rem] rounded-[10px] bg-[var(--netflix-font-red)] mt-2 text-white flex justify-center items-center text-[17px] font-semibold"
            //   onClick={handleSubmit}
            >
              Signup
            </button>
          )}
          <div className="create-link text-white text-[17px] font-semibold mt-3">
            Already have an Account?
          </div>
          <div
            onClick={() => {
              router.push("/signin");
            }}
            className="create-link cursor-pointer text-[17px] text-[var(--netflix-font-red)] font-semibold"
          >
            Sign In
          </div>
        </form>
      </div>
    </>
  );
}

export default WithoutAuth(Signup);
