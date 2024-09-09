'use client'
import dynamic from 'next/dynamic'
const VideoNewsview = dynamic(() => import('src/components/newsType/VideoNews/VideoNewsview'), { ssr: false })

const index = () => {

  return (
    <>
      <VideoNewsview />
    </>
  )
}

export default index
