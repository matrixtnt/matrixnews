import Home from 'src/components/home/Home'
import Head from 'next/head'

const Index = ({ data }) => {
  console.log(data);
  return (
    <>
      <Head>
        {/* <meta property='og:title' content={data} /> */}
        <meta name='description' content={data} />
      </Head>
      <Home />
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API or perform any necessary operations
  const fetchedData = 'hello';

  // Pass data to the page via props
  return { props: { data: fetchedData } };
}

export default Index;

