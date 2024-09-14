'use client'
import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
import { translate } from 'src/utils'

const Notification = dynamic(() => import('src/components/notification/Notification'), { ssr: false })


const Index = () => {
  
  const webName = process.env.NEXT_PUBLIC_WEB_NAME

  return (
    <>
       <Meta title={`${webName} | ${translate('personalNotification')}`} description='' keywords='' ogImage='' pathName='' schema='' />
      <Notification />
    </>
  )
}


export default Index
