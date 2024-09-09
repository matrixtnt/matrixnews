'use client'
import dynamic from 'next/dynamic'

const UserBasedCategoriesNoSSR = dynamic(() => import('src/components/categories/UserBasedCategories'), { ssr: false })

const index = () => {

  return (
    <>
     
      <UserBasedCategoriesNoSSR />
    </>
  )
}

export default index
