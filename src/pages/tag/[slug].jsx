import Head from 'next/head'
import TagNewsview from 'src/components/tag/TagNewsview'

const index = () => {
  return (
    <div>
      <Head>
        <title>tag</title>
        <meta property='og:title' content='tag' key='tag' />
      </Head>
      <TagNewsview/>
    </div>
  )
}

export default index
