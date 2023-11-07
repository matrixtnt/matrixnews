import Head from 'next/head'
import BookmarkSection from 'src/components/bookmark/BookmarkSection'

const index = () => {
  return (
    <div>
      <Head>
        <title>bookmark</title>
        <meta property='og:title' content='bookmark' key='bookmark' />
      </Head>
      <BookmarkSection/>
    </div>
  )
}

export default index
