'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useLayoutEffect } from 'react'

export  function ProtectedPage (Component: any)  {
  return function WithAuth(props: any) {
    const {  status ,} = useSession()
    useLayoutEffect(() => {
      if (status=='unauthenticated') {
        redirect('/signin')
      }
    }, [status])
    return <Component {...props} />
  }
}