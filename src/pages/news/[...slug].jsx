import axios from 'axios'
import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
import { GET_NEWS, access_key } from 'src/utils/api'
const News = dynamic(() => import('src/components/newsType/News/News'), { ssr: false })

// This is seo api
const fetchDataFromSeo = async (id,language_id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_END_POINT}/${GET_NEWS}?access_key=${access_key}&language_id=${language_id}&slug=${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const Index = ({ seoData, currentURL  }) => {
  return (
    <>
        <Meta
          title={seoData && seoData.data[0].meta_title}
          description={seoData && seoData.data[0].meta_description}
          keywords={seoData && seoData.data[0].meta_keyword}
          ogImage={seoData && seoData.data[0].image}
          pathName={currentURL}
          schema={seoData && seoData.data[0].schema_markup}
        />
      <News/>
    </>
  )
}

let serverSidePropsFunction = null
if (process.env.NEXT_PUBLIC_SEO === 'true') {

 
  serverSidePropsFunction = async (context) => {

  // Retrieve the slug from the URL query parameters
  const { query, req } = context; // Extract query and request object from context

  const currentURL = `${req.headers.host}${req.url}`; 

  const seoData = await fetchDataFromSeo(query.slug[0],query.language_id)

  // Pass the fetched data as props to the page component
  return {
    props: {
      seoData,
      currentURL
    }
  }
  }
}

export const getServerSideProps = serverSidePropsFunction

export default Index
