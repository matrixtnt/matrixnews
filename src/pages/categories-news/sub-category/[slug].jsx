'use client'
import dynamic from 'next/dynamic'
const SubCategory = dynamic(() => import('src/components/newsType/News/SubCategoryNews'), { ssr: false })

const index = () => {
  return (
    <>
      <SubCategory />
    </>
  )
}

export default index
