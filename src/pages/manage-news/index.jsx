'use client'
import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
import { translate } from 'src/utils'
const ManageNews = dynamic(() => import('src/components/role/ManageNews'), { ssr: false })

const index = () => {

  const webName = process.env.NEXT_PUBLIC_WEB_NAME;

  return (
    <>
      <Meta title={`${webName} | ${translate('manageNewsLbl')}`} description='' keywords='' ogImage='' pathName='' schema='' />
      <ManageNews />
    </>
  )
}

export default index
