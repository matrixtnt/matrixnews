'use client'
import dynamic from 'next/dynamic'
const ProfileUpdate = dynamic(() => import('src/components/profile/ProfileUpdate'), { ssr: false })

const index = () => {

  return (
    <>
     
      <ProfileUpdate />
    </>
  )
}

export default index
