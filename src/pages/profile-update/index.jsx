'use client'
import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
import { translate } from 'src/utils'
const ProfileUpdate = dynamic(() => import('src/components/profile/ProfileUpdate'), { ssr: false })

const index = () => {

  const webName = process.env.NEXT_PUBLIC_WEB_NAME;

  return (
    <>
      <Meta title={`${webName} | ${translate('update-profile')}`} description='' keywords='' ogImage='' pathName='' schema='' />
      <ProfileUpdate />
    </>
  )
}

export default index
