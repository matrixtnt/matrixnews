'use client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Meta from 'src/components/seo/Meta'
import { translate } from 'src/utils'
const TagNewsview = dynamic(() => import('src/components/tag/TagNewsview'), { ssr: false })

const index = () => {

  const router = useRouter();

  const slug = router?.query?.slug

  const webName = process.env.NEXT_PUBLIC_WEB_NAME;

  return (
    <>
      <Meta title={`${webName} | ${translate('tagLbl')} ${slug ? `| ${slug}` : ''}`} description='' keywords='' ogImage='' pathName='' schema='' />
      <TagNewsview />
    </>
  )
}

export default index
