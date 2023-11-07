import Head from "next/head"
import MorePages from "src/components/staticpages/MorePages"

const index = () => {
  return (
    <div>
      <Head>
        <title>more pages</title>
        <meta property='og:title' content='more pages' key='more pages' />
      </Head>
      <MorePages/>
    </div>
  )
}

export default index
