import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
const LiveNews = dynamic(() => import('src/components/newsPages/LiveNews'), { ssr: false })
const index = () => {
  return (
    <>
      <Meta title='live news' description='' keywords='' ogImage='' pathName='' schema='' />
      <LiveNews />
    </>
  )
}

export default index
