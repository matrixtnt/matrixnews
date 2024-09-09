'use client'
import dynamic from 'next/dynamic'
const CreateNewsNoSSR = dynamic(() => import('src/components/role/CreateNews'), { ssr: false })

const index = () => {

  return (
    <>      
      <CreateNewsNoSSR />
    </>
  )
}

export default index
