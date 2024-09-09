'use client'
import dynamic from 'next/dynamic'
const ManageNews = dynamic(() => import('src/components/role/ManageNews'), { ssr: false })

const index = () => {

  return (
    <>
      <ManageNews />
    </>
  )
}

export default index
