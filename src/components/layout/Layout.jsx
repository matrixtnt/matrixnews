'use client'
import { useEffect } from 'react'
import { laodSettingsApi, settingsData } from 'src/store/reducers/settingsReducer'
import { useSelector } from 'react-redux'
import { selectCurrentLanguageLabels } from 'src/store/reducers/languageReducer'
import { useRouter } from 'next/router'
import Header from './Header'
import CatNav from '../categories/CatNav'
import WeatherCard from '../weather/WeatherCard'
import SearchPopup from '../search/SearchPopup'
import Footer from './Footer'


const Layout = ({ children }) => {
  const settings = useSelector(settingsData)

  const router = useRouter()

  useSelector(selectCurrentLanguageLabels)

  // web settings load
  useEffect(() => {
      laodSettingsApi({type:"",
        onSuccess:(res) => 
        document.documentElement.style.setProperty('--primary-color', res && res.data.web_setting.web_color_code),
        onError:error => {
          console.log(error)
        }
      }
      )
      // language laod
  }, [])

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
      {settings ? (
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
