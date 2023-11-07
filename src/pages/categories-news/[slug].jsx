import Head from 'next/head'

import CategoryNews from 'src/components/newsType/News/CategoryNews'

const index = () => {
  return (
    <div>
      <Head>
        <title>categories news</title>
        <meta property='og:title' content='categories news' key='categories news' />
      </Head>
      <CategoryNews />
    </div>
  )
}

export default index
