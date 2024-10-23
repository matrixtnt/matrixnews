import axios from 'axios'
import dynamic from 'next/dynamic'
import generateRssFeed from 'scripts/generaterRssFeed.mjs'
import Meta from 'src/components/seo/Meta'
import { GET_NEWS, GET_SETTINGS, GET_WEB_SEO_PAGES } from 'src/utils/api'
// import generateRssFeed from './api/rss'
const Home = dynamic(() => import('src/components/home/Home'), { ssr: false })


// This is settings api
const fetchSettings = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_END_POINT}/${GET_SETTINGS}`
    )
    const data = response.data
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    return null
  }
}
// This is seo api
const fetchDataFromSeo = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_END_POINT}/${GET_WEB_SEO_PAGES}?type=home`
    )
    const data = response.data
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    return null
  }
}

const fetchAllPosts = async (id) => {
  try {
    const response = await axios.get( `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_END_POINT}/${GET_NEWS}?language_id=${id}`)
    // console.log('allPosts', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching all posts:', error)
    return null
  }
}

const Index = ({ adsenseUrl }) => {

  // console.log(settingsData,"settingsDataaaaa")

  const adsenseURL = adsenseUrl;

  return (
    <>
      <Meta />
      <Home />
      {
        adsenseURL && adsenseURL !== null || adsenseURL && adsenseURL !== undefined || adsenseURL && adsenseURL?.length > 0 ?
          <script async src={adsenseURL}
            crossOrigin="anonymous"></script> : null
      }
    </>
  )
}


let serverSidePropsFunction = null
if (process.env.NEXT_PUBLIC_SEO === 'true') {
  serverSidePropsFunction = async context => {
    // Retrieve the slug from the URL query parameters
    const { req } = context // Extract query and request object from context

    const currentURL = req[Symbol.for('NextInternalRequestMeta')].initURL
    const seoData = await fetchDataFromSeo(req.url);
    const settingsData = await fetchSettings()

    // console.log(settingsData?.data, "Data")

    const adsenseUrl = settingsData?.data?.web_setting?.google_adsense ? settingsData?.data?.web_setting?.google_adsense : null

    // console.log(adsenseUrl, "adsenseUrl")


    // Fetch the posts (similar to getStaticProps)
    const allPosts = await fetchAllPosts(settingsData?.data?.default_language?.id)

    // Generate RSS feed with the fetched posts
    generateRssFeed(allPosts, settingsData?.data?.web_setting?.light_header_logo)


    // Pass the fetched data as props to the page component
    return {
      props: {
        adsenseUrl,
        seoData,
        currentURL,
        allPosts
      }
    }
  }
}

export const getServerSideProps = serverSidePropsFunction

export default Index
