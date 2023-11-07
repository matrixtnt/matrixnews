import Head from 'next/head'
import AllBreakingNews from 'src/components/newsPages/AllBreakingNews'

const index = () => {
  return (
    <div>
      <Head>
        <title>all breaking news</title>
        <meta property='og:title' content='all breaking news' key='all breaking news' />
      </Head>
      <AllBreakingNews />
    </div>
  )
}

export default index
