import Head from 'next/head'
import ViewAll from 'src/components/viewAll/ViewAll'

const index = () => {
  return (
    <div>
      <Head>
        <title>view all</title>
        <meta property='og:title' content='view all' key='view all' />
      </Head>
      <ViewAll />
    </div>
  )
}

export default index
