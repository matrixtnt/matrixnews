import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
const NewsNotification = dynamic(() => import('src/components/notification/NewsNotification'), { ssr: false })
const index = () => {
  return (
    <>
      <Meta title='news notification' description='' keywords='' ogImage='' pathName='' schema='' />
      <NewsNotification />
    </>
  )
}

export default index
