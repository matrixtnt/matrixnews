import Head from 'next/head'

import Categories from 'src/components/categories/Categories'

const index = () => {
  return (
    <div>
      <Head>
        <title>all categories</title>
        <meta property='og:title' content='all categories' key='all categories' />
      </Head>
      <Categories />
    </div>
  )
}

export default index
