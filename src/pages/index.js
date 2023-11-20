import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
const Home = dynamic(() => import('src/components/home/Home'), { ssr: false })
const Index = ({ data }) => {

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
      <Home />
    </>
  )
}

// let serverSidePropsFunction = null

// if (process.env.NEXT_PUBLIC_SEO === 'true') {
//   serverSidePropsFunction = async () => {
//     // Fetch data from external API or perform any necessary operations
//     const fetchedData = {
//       title: 'hello',
//       description: 'desc',
//       keywords: 'keywords',
//       ogImage: '',
//       pathName: '',
//       schema: ''
//     }

//     // Pass data to the page via props
//     return { props: { data: fetchedData } }
//   }
// }

// export const getServerSideProps = serverSidePropsFunction

export default Index
