'use client'
import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
import { translate } from 'src/utils'

const UserBasedCategoriesNoSSR = dynamic(() => import('src/components/categories/UserBasedCategories'), { ssr: false })

const index = () => {

  const webName = process.env.NEXT_PUBLIC_WEB_NAME;

  return (
    <>
      <Meta title={`${webName} | ${translate('userBasedCat')}`} description='' keywords='' ogImage='' pathName='' schema='' />
      <UserBasedCategoriesNoSSR />
    </>
  )
}

export default index
