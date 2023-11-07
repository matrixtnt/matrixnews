import Head from 'next/head'
import Notification from 'src/components/notification/Notification'

const index = () => {
  return (
    <div>
      <Head>
        <title>personal notification</title>
        <meta property='og:title' content='personal notification' key='personal notification' />
      </Head>
      <Notification />
    </div>
  )
}

export default index
