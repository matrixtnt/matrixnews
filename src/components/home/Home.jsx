import Meta from '../seo/Meta'

const FeatureLayout = dynamic(() => import('../features-Style/FeatureLayout'), { ssr: false })
const Layout = dynamic(() => import('../layout/Layout'), { ssr: false })
const Home = ({ data }) => {
  return (
    <>
      <Meta
        title={data && data.title}
        description={data && data.description}
        keywords={data && data.keywords}
        ogImage={data && data.ogImage}
        pathName={data && data.pathName}
        schema={data && data.schema}
      />
      <Layout>
        <FeatureLayout />
      </Layout>
    </>
  )
}

let serverSidePropsFunction = null

if (process.env.NEXT_PUBLIC_SEO === 'true') {
  serverSidePropsFunction = async () => {
    // Fetch data from external API or perform any necessary operations
    const fetchedData = {
      title: 'hello',
      description: 'desc',
      keywords: 'keywords',
      ogImage: '',
      pathName: '',
      schema: ''
    }

    // Pass data to the page via props
    return { props: { data: fetchedData } }
  }
}

export const getServerSideProps = serverSidePropsFunction

export default Home
