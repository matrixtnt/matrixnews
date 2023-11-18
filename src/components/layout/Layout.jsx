'use client'
import { useEffect } from 'react'
import { laodSettingsApi, settingsData } from 'src/store/reducers/settingsReducer'
import { useSelector } from 'react-redux'
import { selectCurrentLanguageLabels } from 'src/store/reducers/languageReducer'
import { loadToken, tokenData } from 'src/store/reducers/tokenReducer'
import { laodwebsettingsApi } from 'src/store/reducers/websettingsReducer'
import dynamic from 'next/dynamic'
import { generateTokenApi } from 'src/hooks/tokenApi'
import { access_key } from 'src/utils/api'
import { useQuery } from '@tanstack/react-query'

const SearchPopupNoSSR = dynamic(() => import('../search/SearchPopup'), { ssr: false })
const WeatherCardNoSSR = dynamic(() => import('../weather/WeatherCard'), { ssr: false })
const HeaderNoSSR = dynamic(() => import('./Header'), { ssr: false })
const CatNavNoSSR = dynamic(() => import('../categories/CatNav'), { ssr: false })
const FooterNoSSR = dynamic(() => import('./Footer'), { ssr: false })

const Layout = ({ children }) => {
  const settings = useSelector(settingsData)

  const hasToken = useSelector(tokenData)

  useSelector(selectCurrentLanguageLabels)

  // change color loader and theme
  const changeColors = () => {
    document.documentElement.style.setProperty('--loader-color', process.env.NEXT_PUBLIC_COLOR)
    document.documentElement.style.setProperty('--secondary-color', process.env.NEXT_PUBLIC_SECONDARY_COLOR)
  }

  const {} = useQuery({
    queryKey: ['colors'],
    queryFn: changeColors
  })

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
  

  return (
    <>
      {hasToken && settings ? (
        <>
          <SearchPopupNoSSR />
          <WeatherCardNoSSR />
          <HeaderNoSSR />
          <CatNavNoSSR />
          <div>{children}</div>
          <FooterNoSSR />
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
