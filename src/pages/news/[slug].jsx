import axios from 'axios'
import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
import { extractJSONFromMarkup } from 'src/utils'
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

const Index = ({ seoData,currentURL  }) => {
  let schema = null;

  if (seoData?.data && seoData?.data[0].schema_markup) {
    const schemaString = seoData?.data[0].schema_markup;
    schema = extractJSONFromMarkup(schemaString);
  }
  return (
    <>
        <Meta
          title={seoData.data && seoData.data[0].meta_title}
          description={seoData.data && seoData.data[0].meta_description}
          keywords={seoData.data && seoData.data[0].meta_keyword}
          ogImage={seoData.data && seoData.data[0].image}
          pathName={currentURL}
          schema={schema}
        />
      <News/>
    </>
  )
}

let serverSidePropsFunction = null
if (process.env.NEXT_PUBLIC_SEO === 'true') {

 
  serverSidePropsFunction = async (context) => {

  // Retrieve the slug from the URL query parameters
  const { req } = context; // Extract query and request object from context

  const { params } = req[Symbol.for('NextInternalRequestMeta')].match;

  const currentURL = req[Symbol.for('NextInternalRequestMeta')].initURL;

  const {language_id} = req[Symbol.for('NextInternalRequestMeta')].initQuery;

  const seoData = await fetchDataFromSeo(params.slug,language_id)

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
