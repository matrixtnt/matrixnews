import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
const Notification = dynamic(() => import('src/components/notification/Notification'), { ssr: false })
const index = () => {
  return (
    <>
      <Meta title='personal notification' description='' keywords='' ogImage='' pathName='' schema='' />
      <Notification />
    </>
  )
}

export default index
