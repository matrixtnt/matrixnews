'use client'
import { useSelector } from 'react-redux'
import FeatureLayout from '../features-Style/FeatureLayout'
import Layout from '../layout/Layout'
import { settingsData } from 'src/store/reducers/settingsReducer'

const Home = () => {
  const adsenseData = useSelector(settingsData)
  const adsenseUrl = adsenseData?.web_setting?.google_adsense;

  console.log(adsenseUrl, '180x180')

  if (process.env.NEXT_PUBLIC_SEO === 'false') {
    adsenseUrl && adsenseUrl !== null || adsenseUrl && adsenseUrl !== undefined || adsenseUrl && adsenseUrl?.length > 0 ?
      <script async src={adsenseUrl}
        crossorigin="anonymous"></script> : null
  }

  return (
    <Layout>
      <FeatureLayout />
    </Layout>
  )
}

export default Home
