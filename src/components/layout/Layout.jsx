'use client'
import { useEffect } from 'react'
import { laodSettingsApi, settingsData } from 'src/store/reducers/settingsReducer'
import { useSelector } from 'react-redux'
import { selectCurrentLanguageLabels } from 'src/store/reducers/languageReducer'
import { loadToken, tokenApi, tokenData } from 'src/store/reducers/tokenReducer'
import { laodwebsettingsApi } from 'src/store/reducers/websettingsReducer'
import dynamic from 'next/dynamic'

const SearchPopupNoSSR = dynamic(() => import('../search/SearchPopup'), { ssr: false })
const WeatherCardNoSSR = dynamic(() => import('../weather/WeatherCard'), { ssr: false })
const HeaderNoSSR = dynamic(() => import('./Header'), { ssr: false })
const CatNavNoSSR = dynamic(() => import('../categories/CatNav'), { ssr: false })
const FooterNoSSR = dynamic(() => import('./Footer'), { ssr: false })

const Layout = ({ children }) => {
  const settings = useSelector(settingsData)

  // Set loader color theme
  const changeLoaderColor = () => {
    document.documentElement.style.setProperty('--loader-color', process.env.NEXT_PUBLIC_COLOR)
  }

  // secondary color
  const secondaryColor = () => {
    document.documentElement.style.setProperty('--secondary-color', process.env.NEXT_PUBLIC_SECONDARY_COLOR)
  }

  useEffect(() => {
    changeLoaderColor()
    secondaryColor()
  }, [])

  useEffect(() => {
    // token fetch
    tokenApi(
      response => {
        let token = response.data
        loadToken(token)
      },
      error => {
        console.log(error)
      }
    )
  }, [])

  useSelector(selectCurrentLanguageLabels)

  const hasToken = useSelector(tokenData)
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
  return (
    <div>
      {hasToken && settings ? (
        <div>
          <SearchPopupNoSSR />
          <WeatherCardNoSSR />
          <HeaderNoSSR />
          <CatNavNoSSR />
          <div>{children}</div>
          <FooterNoSSR />
        </div>
      ) : (
        <div className='loader-container'>
          <div className='loader'></div>
        </div>
      )}
    </div>
  )
}
export default Layout
