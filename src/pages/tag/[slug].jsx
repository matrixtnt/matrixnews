'use client'
import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
import { translate } from 'src/utils'
const TagNewsview = dynamic(() => import('src/components/tag/TagNewsview'), { ssr: false })

const index = () => {

  const webName = process.env.NEXT_PUBLIC_WEB_NAME;

  return (
    <>
      <Meta title={`${webName} | ${translate('tagLbl')}`} description='' keywords='' ogImage='' pathName='' schema='' />
      <TagNewsview />
    </>
  )
}

export default index
