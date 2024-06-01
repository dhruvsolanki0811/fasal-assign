"use client";
import React from 'react'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Navbar from '@/components/Navbar';
import MovieModal from '@/components/MovieModal';
import { useModalStore } from '@/store/modalStore';

const queryClient = new QueryClient()

function Provider({ children }: { children: React.ReactNode }) {
  const {open}=useModalStore()
  return (
    <>
     <QueryClientProvider client={queryClient}>
     <Navbar></Navbar>   
     {open && <MovieModal/>}
        {children}
     </QueryClientProvider>

    </>
  )
}

export default Provider