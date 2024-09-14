'use client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Meta from 'src/components/seo/Meta'
import { translate } from 'src/utils'
const AllRelatedNews = dynamic(() => import('src/components/relatedNews/AllRelatedNews'), { ssr: false })

const index = () => {

  const webName = process.env.NEXT_PUBLIC_WEB_NAME;


  const router = useRouter();

  const slug = router?.query?.slug

  return (
    <>
      <Meta title={`${webName} | ${translate('related-news')} ${slug ? `| ${slug}` : ''}`} description='' keywords='' ogImage='' pathName='' schema='' />
      <AllRelatedNews />
    </>
  )
}

export default index
