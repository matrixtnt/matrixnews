import Head from 'next/head'
import BreakingNews from 'src/components/newsType/BreakingNews/BreakingNews'

const index = () => {
  return (
    <div>
      <Head>
        <title>breaking news</title>
        <meta property='og:title' content='breaking news' key='breaking news' />
      </Head>
      <BreakingNews/>
    </div>
  )
}

export default index
