import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
import { translate } from 'src/utils'
const BookmarkSection = dynamic(() => import('src/components/bookmark/BookmarkSection'), { ssr: false })

const index = () => {

  const webName = process.env.NEXT_PUBLIC_WEB_NAME;

  return (
    <>
      <Meta title={`${webName} | ${translate('bookmark')}`} description='' keywords='' ogImage='' pathName='' schema='' />
      <BookmarkSection />
    </>
  )
}

export default index
