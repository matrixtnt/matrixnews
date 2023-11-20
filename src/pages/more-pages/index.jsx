import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
const MorePages = dynamic(() => import('src/components/staticpages/MorePages'), { ssr: false })
const index = () => {
  return (
    <>
      <Meta title='more pages' description='' keywords='' ogImage='' pathName='' schema='' />
      <MorePages />
    </>
  )
}

export default index
