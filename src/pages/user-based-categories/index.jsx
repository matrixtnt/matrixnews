import dynamic from "next/dynamic"
import Head from "next/head"

const UserBasedCategoriesNoSSR = dynamic(() => import('src/components/categories/UserBasedCategories'), { ssr: false })
const index = () => {
  return (
    <div>
      <Head>
        <title>user based categories</title>
        <meta property='og:title' content='user based categories' key='user based categories' />
      </Head>
      <UserBasedCategoriesNoSSR/>
    </div>
  )
}

export default index
