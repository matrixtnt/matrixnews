'use client'
import dynamic from 'next/dynamic'
const CategoryNews = dynamic(() => import('src/components/newsType/News/CategoryNews'), { ssr: false })

const index = () => {

  return (
    <>
      <CategoryNews />
    </>
  )
}

export default index
