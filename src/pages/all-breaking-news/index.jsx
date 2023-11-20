import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
const AllBreakingNews = dynamic(() => import('src/components/newsPages/AllBreakingNews'), { ssr: false })
const index = () => {
  return (
    <>
      <Meta title='all breaking news' description='' keywords='' ogImage='' pathName='' schema='' />
      <AllBreakingNews />
    </>
  )
}

export default index
