"use client";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import MovieModal from "@/components/MovieModal";
import { useModalStore } from "@/store/modalStore";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function Provider({ children }: { children: React.ReactNode }) {
  const { open } = useModalStore();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider >
          <Navbar></Navbar>
          {open && <MovieModal />}
          {children}
          <Toaster richColors closeButton/>
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
}

export default Provider;
