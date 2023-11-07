import Head from "next/head"
import ManageNews from "src/components/role/ManageNews"

const index = () => {
  return (
    <div>
      <Head>
        <title>manage news</title>
        <meta property='og:title' content='manage news' key='manage news' />
      </Head>
      <ManageNews/>
    </div>
  )
}

export default index
