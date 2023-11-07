import Head from "next/head"
import ProfileUpdate from "src/components/profile/ProfileUpdate"

const index = () => {
  return (
    <div>
      <Head>
        <title>profile update</title>
        <meta property='og:title' content='profile update' key='profile update' />
      </Head>
      <ProfileUpdate/>
    </div>
  )
}

export default index
