'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export const WithoutAuth = (Component: any) => {
  return function WithoutAuth(props: any) {
    const { data:session } = useSession()

    useEffect(() => {
      
      if (session) {
        redirect('/')
      }
      
    }, [session])
    return <Component {...props} />
  }
}