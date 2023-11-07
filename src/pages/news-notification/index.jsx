import Head from "next/head"
import NewsNotification from "src/components/notification/NewsNotification"

const index = () => {
  return (
    <div>
      <Head>
        <title>news notification</title>
        <meta property='og:title' content='news notification' key='news notification' />
      </Head>
      <NewsNotification/>
    </div>
  )
}

export default index
