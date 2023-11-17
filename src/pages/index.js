import Home from 'src/components/home/Home'
import generateRssFeed from '../../scripts/generaterRssFeed.mjs'

export const getStaticProps = async () => {
  await generateRssFeed()
  return {
    props: {}
  }
}

const index = () => {
  return <Home />
}

export default index
