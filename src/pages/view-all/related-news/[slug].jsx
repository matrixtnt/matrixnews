'use client'
import dynamic from 'next/dynamic'
const AllRelatedNews = dynamic(() => import('src/components/relatedNews/AllRelatedNews'), { ssr: false })

const index = () => {
  
  return (
    <>
      <AllRelatedNews />
    </>
  )
}

export default index
