'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useLayoutEffect } from 'react'

export const WithoutAuth = (Component: any) => {
  return function WithoutAuth(props: any) {
    const { data:session,status } = useSession()

    useLayoutEffect(() => {
      if (session) {
        redirect('/')
      }
      
    }, [session])
    return <Component {...props} />
  }
}