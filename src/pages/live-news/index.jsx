import Head from 'next/head'
import LiveNews from 'src/components/newsPages/LiveNews'

const index = () => {
  return (
    <div>
      <Head>
        <title>live news</title>
        <meta property='og:title' content='live news' key='live news' />
      </Head>
      <LiveNews />
    </div>
  )
}

export default index
