'use client'
import Home from 'src/components/home/Home'
import generateRssFeed from '../../scripts/generaterRssFeed.mjs'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const getStaticProps = async () => {
  await generateRssFeed()
  return {
    props: {}
  }
}

const index = () => {
  const router = useRouter()
  useEffect(() => {
    // Check if the slug is present in the URL
    if (router.pathname) {
      router.replace(window.location.pathname + window.location.search)
    }
  }, [])
  return <Home />
}

export default index
