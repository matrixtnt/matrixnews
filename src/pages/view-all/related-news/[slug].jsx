import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
const AllRelatedNews = dynamic(() => import('src/components/relatedNews/AllRelatedNews'), { ssr: false })
const index = () => {
  return (
    <>
      <Meta title='Related News' description='' keywords='' ogImage='' pathName='' schema='' />
      <AllRelatedNews />
    </>
  )
}

export default index
