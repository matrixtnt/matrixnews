import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
const Categories = dynamic(() => import('src/components/categories/Categories'), { ssr: false })
const index = () => {
  return (
    <>
      <Meta title='all categories' description='' keywords='' ogImage='' pathName='' schema='' />
      <Categories />
    </>
  )
}

export default index
