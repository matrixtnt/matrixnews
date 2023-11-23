'use client'
import { useEffect } from 'react'
import { laodSettingsApi, settingsData } from 'src/store/reducers/settingsReducer'
import { useSelector } from 'react-redux'
import { selectCurrentLanguageLabels } from 'src/store/reducers/languageReducer'
import { loadToken, tokenData } from 'src/store/reducers/tokenReducer'
import { laodwebsettingsApi } from 'src/store/reducers/websettingsReducer'
import { generateTokenApi } from 'src/hooks/tokenApi'
import { access_key } from 'src/utils/api'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import Header from './Header'
import CatNav from '../categories/CatNav'
import WeatherCard from '../weather/WeatherCard'
import SearchPopup from '../search/SearchPopup'
import Footer from './Footer'


const Layout = ({ children }) => {
  const settings = useSelector(settingsData)

  const hasToken = useSelector(tokenData)

  const router = useRouter()

  useSelector(selectCurrentLanguageLabels)

  // token api call
  const generateToken = async () => {
    try {
      const { data } = await generateTokenApi.generateToken({
        access_key: access_key
      })
      loadToken(data.data)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  // react query
  const {} = useQuery({
    queryKey: ['token'],
    queryFn: generateToken
  })

  // web settings load
  useEffect(() => {
    if (hasToken) {
      laodSettingsApi(
        () => {},
        error => {
          console.log(error)
        }
      )
      // language laod
      laodwebsettingsApi(
        response => {
          document.documentElement.style.setProperty('--primary-color', response && response.data.web_color_code)
          // Handle response data
        },
        error => {
          // Handle error
        }
      )
    }
  }, [hasToken])

  // client side rendering route get and this is only for vercel deploy logic
  useEffect(() => {
    // Check if the slug is present in the URL
    if (process.env.NEXT_PUBLIC_SEO === 'false') {
      if (router.pathname) {
        router.replace(window.location.pathname + window.location.search)
      }
    }
  }, [])

  return (
    <>
      {hasToken && settings ? (
        <>
          <SearchPopup />
          <WeatherCard />
          <Header />
          <CatNav />
          <div>{children}</div>
          <Footer />
        </>
      ) : (
        <div className='loader-container'>
          <div className='loader'></div>
        </div>
      )}
    </>
  )
}
export default Layout
