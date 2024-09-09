'use client'
import dynamic from 'next/dynamic'
const EditNewsNoSSR = dynamic(() => import('src/components/role/EditNews'), { ssr: false })

const index = () => {

  return (
    <>
      <EditNewsNoSSR />
    </>
  )
}

export default index
