import Head from 'next/head'

import VideoNewsview from 'src/components/newsType/VideoNews/VideoNewsview'

const index = () => {
  return (
    <div>
      <Head>
        <title>video news </title>
        <meta property='og:title' content='video news ' key='video news ' />
      </Head>
      <VideoNewsview />
    </div>
  )
}

export default index
