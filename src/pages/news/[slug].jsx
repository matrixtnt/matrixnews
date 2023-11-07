import Head from 'next/head'
import News from 'src/components/newsType/News/News'

const index = () => {
  return (
    <>
      <Head>
        <title>news detail</title>
        <meta property='og:title' content='news detail' key='news detail' />
      </Head>
      <News />
    </>
  )
}

export default index
