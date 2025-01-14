import Head from 'next/head'
import React from 'react'
import dynamic from 'next/dynamic'
import { GET_WEB_SEO_PAGES } from 'src/utils/api'
import { extractJSONFromMarkup } from 'src/utils'
import Meta from 'src/components/seo/Meta'
import axios from 'axios'
const RssFeeds = dynamic(() => import('src/components/RssFeed/RssFeeds'), { ssr: false })


// This is seo api
const fetchDataFromSeo = async (language_id) => {

    try {
  
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_END_POINT}/${GET_WEB_SEO_PAGES}?type=rss_feeds&language_id=${language_id}`
      )
      const data = response.data
      return data
    } catch (error) {
      console.error('Error fetching data:', error)
      return null
    }
  }

const Index = ({ seoData, currentURL }) => {

    let schema = null

    if (seoData && seoData.data && seoData.data.length > 0 && seoData.data[0].schema_markup) {
        const schemaString = seoData.data[0].schema_markup
        schema = extractJSONFromMarkup(schemaString)
    }

    return (
        <>
            {/* <Head>
                <title>Rss-Feeds</title>
            </Head> */}
            <Meta
                title={seoData?.data && seoData.data.length > 0 && seoData.data[0].meta_title}
                description={seoData?.data && seoData.data.length > 0 && seoData.data[0].meta_description}
                keywords={seoData?.data && seoData.data.length > 0 && seoData.data[0].meta_keyword}
                ogImage={seoData?.data && seoData.data.length > 0 && seoData.data[0].image}
                pathName={currentURL}
                schema={schema}
            />
            <RssFeeds />
        </>
    )
}


let serverSidePropsFunction = null;
if (process.env.NEXT_PUBLIC_SEO === "true") {
  serverSidePropsFunction = async (context) => {
    const { req } = context; // Extract query and request object from context
    // console.log(req)
    const { language_id } = req[Symbol.for('NextInternalRequestMeta')].initQuery;
    // console.log('language_id', language_id)

    const currentURL = process.env.NEXT_PUBLIC_WEB_URL;
    const seoData = await fetchDataFromSeo(language_id);
    return {
      props: {
        seoData,
        currentURL,
      },
    };
  };
}

export const getServerSideProps = serverSidePropsFunction

export default Index
