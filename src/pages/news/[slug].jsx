import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
const News = dynamic(() => import('src/components/newsType/News/News'), { ssr: false })
const index = () => {
  return (
    <>
      <Meta title='news detail' description='' keywords='' ogImage='' pathName='' schema='' />
      <News />
    </>
  )
}

export default index
