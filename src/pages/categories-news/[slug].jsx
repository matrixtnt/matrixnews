'use client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Meta from 'src/components/seo/Meta'
import { translate } from 'src/utils'
const CategoryNews = dynamic(() => import('src/components/newsType/News/CategoryNews'), { ssr: false })

const index = () => {

  const webName = process.env.NEXT_PUBLIC_WEB_NAME;

  const router = useRouter();
  const query = router?.query
  const catSlug = query.slug

  return (
    <>
      <Meta title={`${webName} | ${translate('categoryLbl')} | ${catSlug}`} description='' keywords='' ogImage='' pathName='' schema='' />
      <CategoryNews />
    </>
  )
}

export default index
