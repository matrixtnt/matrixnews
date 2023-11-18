import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
const ViewAll = dynamic(() => import('src/components/viewAll/ViewAll'), { ssr: false })
const index = () => {
  return (
    <>
      <Meta title='view all' description='' keywords='' ogImage='' pathName='' schema='' />
      <ViewAll />
    </>
  )
}

export default index
