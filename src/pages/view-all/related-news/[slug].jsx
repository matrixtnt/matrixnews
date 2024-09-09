'use client'
import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
import { translate } from 'src/utils'
const AllRelatedNews = dynamic(() => import('src/components/relatedNews/AllRelatedNews'), { ssr: false })

const index = () => {

  const webName = process.env.NEXT_PUBLIC_WEB_NAME;

  return (
    <>
      <Meta title={`${webName} | ${translate('related-news')}`} description='' keywords='' ogImage='' pathName='' schema='' />
      <AllRelatedNews />
    </>
  )
}

export default index
