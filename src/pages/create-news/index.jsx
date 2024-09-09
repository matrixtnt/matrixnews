'use client'
import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
import { translate } from 'src/utils'
const CreateNewsNoSSR = dynamic(() => import('src/components/role/CreateNews'), { ssr: false })

const index = () => {

  const webName = process.env.NEXT_PUBLIC_WEB_NAME;

  return (
    <>
      <Meta title={`${webName} | ${translate('createNewsLbl')}`} description='' keywords='' ogImage='' pathName='' schema='' />
      <CreateNewsNoSSR />
    </>
  )
}

export default index
