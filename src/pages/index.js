'use client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
const Home = dynamic(() => import('src/components/home/Home'), { ssr: false })
const Index = () => {
  const router = useRouter()
  // client side rendering route get
  useEffect(() => {
    // Check if the slug is present in the URL
    if (process.env.NEXT_PUBLIC_SEO === 'false') {
      if (router.pathname) {
        router.replace(window.location.pathname + window.location.search)
      }
    }
  }, [])
  return (
    <>
      <Home />
    </>
  )
}

export default Index
