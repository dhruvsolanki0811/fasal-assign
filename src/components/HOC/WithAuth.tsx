'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export  function ProtectedPage (Component: any)  {
  return function WithAuth(props: any) {
    const {  status } = useSession()
    useEffect(() => {
      if (status=='unauthenticated' || status=='loading') {
        redirect('/signin')
      }
    }, [status])
    return <Component {...props} />
  }
}