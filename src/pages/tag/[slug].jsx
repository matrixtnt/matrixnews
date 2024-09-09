'use client'
import dynamic from 'next/dynamic'
const TagNewsview = dynamic(() => import('src/components/tag/TagNewsview'), { ssr: false })

const index = () => {

  return (
    <>
      <TagNewsview />
    </>
  )
}

export default index
