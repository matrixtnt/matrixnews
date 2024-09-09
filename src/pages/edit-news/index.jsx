'use client'
import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
import { translate } from 'src/utils'
const EditNewsNoSSR = dynamic(() => import('src/components/role/EditNews'), { ssr: false })

const index = () => {

  const webName = process.env.NEXT_PUBLIC_WEB_NAME;

  return (
    <>
      <Meta title={`${webName} | ${translate('editNewsLbl')}`} description='' keywords='' ogImage='' pathName='' schema='' />
      <EditNewsNoSSR />
    </>
  )
}

export default index
