'use client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
import Meta from 'src/components/seo/Meta'
import { translate } from 'src/utils';
const SubCategory = dynamic(() => import('src/components/newsType/News/SubCategoryNews'), { ssr: false })

const index = () => {

  const webName = process.env.NEXT_PUBLIC_WEB_NAME;

  const router = useRouter();
  const query = router?.query
  const catSlug = query.slug

  return (
    <>
      <Meta title={`${webName} | ${translate('subcatLbl')} | ${catSlug}`} description='' keywords='' ogImage='' pathName='' schema='' />
      <SubCategory />
    </>
  )
}

export default index
