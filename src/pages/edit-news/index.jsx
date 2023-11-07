import dynamic from "next/dynamic"
import Head from "next/head"
const EditNewsNoSSR = dynamic(() => import('src/components/role/EditNews'), { ssr: false })

const index = () => {
  return (
    <div>
      <Head>
        <title>edit news</title>
        <meta property='og:title' content='edit news' key='edit news' />
      </Head>
      <EditNewsNoSSR/>
    </div>
  )
}

export default index
