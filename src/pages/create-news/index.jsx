import dynamic from "next/dynamic"
import Head from "next/head"
// import CreateNews from "src/components/role/CreateNews"
const CreateNewsNoSSR = dynamic(() => import('src/components/role/CreateNews'), { ssr: false })
const index = () => {

  return (
    <div>
      <Head>
        <title>create news</title>
        <meta property='og:title' content='create news' key='create news' />
      </Head>
      <CreateNewsNoSSR/>
    </div>
  )
}

export default index
