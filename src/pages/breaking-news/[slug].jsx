
import Meta from 'src/components/seo/Meta'
const BreakingNews = dynamic(() => import('src/components/newsType/BreakingNews/BreakingNews'), { ssr: false })
const index = () => {
  return (
    <>
      <Meta title="breaking news" description="" keywords="" ogImage="" pathName="" schema=""/>
      <BreakingNews/>
    </>
  )
}

export default index
