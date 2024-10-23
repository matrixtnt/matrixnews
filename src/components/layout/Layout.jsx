'use client'
import { useEffect } from 'react'
import { laodSettingsApi, settingsData, loadSystemTimezone, } from 'src/store/reducers/settingsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentLanguage, selectCurrentLanguageLabels } from 'src/store/reducers/languageReducer'
import { useRouter } from 'next/router'
import Header from './Header'
import CatNav from '../categories/CatNav'
import TopBar from '../topBar/TopBar'
import SearchPopup from '../search/SearchPopup'
import Footer from './Footer'
import { protectedRoutes } from 'src/routes/routes'
import toast from 'react-hot-toast'
import { loadGetUserByIdApi, selectUser } from 'src/store/reducers/userReducer'
import { usePathname } from 'next/navigation'
import { categoriesUpdateLanguage, loadCategories } from 'src/store/reducers/CatNavReducers'
import CookiesComponent from '../cookies/CookiesComponent'
import { getLiveStreamingApi } from 'src/hooks/getliveStreamApi'
import { useQuery } from '@tanstack/react-query'
import { checkBreakingNewsData, checkLiveNewsData, checkNewsDataSelector } from 'src/store/reducers/CheckNewsDataReducer'
import { AllBreakingNewsApi } from 'src/hooks/allBreakingNewsApi'
import { clearAllSiteData, placeholderImage, translate } from 'src/utils'
import { themeSelector } from 'src/store/reducers/CheckThemeReducer'
import maintenanceModeLight from '../../../public/assets/images/Mantenance_Mode_Light.svg'
import maintenanceModeDark from '../../../public/assets/images/Mantenance_Mode_Dark.svg'
import Image from 'next/image'

const Layout = ({ children }) => {
  const settings = useSelector(settingsData)
  const userData = useSelector(selectUser)
  const router = useRouter()
  const pathname = usePathname()

  const checkNewsData = useSelector(checkNewsDataSelector)

  const darkThemeMode = useSelector(themeSelector);

  const maintenanceMode = settings?.maintenance_mode

  const cookiesMode = settings?.web_setting?.accept_cookie


  const isLiveNewsCallOnce = checkNewsData.data.isLiveNewsApiCallOnce
  const isBreakingNewsCallOnce = checkNewsData.data.isBreakingNewsApiCallOnce


  const dispatch = useDispatch()

  useSelector(selectCurrentLanguageLabels)
  const currentLanguage = useSelector(selectCurrentLanguage)
  // web settings load
  useEffect(() => {
    laodSettingsApi({
      onSuccess: res => {
      },
      onError: error => {
        console.log(error)
      }
    })
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

  useEffect(() => {
    if (darkThemeMode) {
      document.documentElement.style.setProperty('--body-color', settings && settings?.web_setting?.dark_body_color)
      document.documentElement.style.setProperty('--primary-color', settings && settings?.web_setting?.dark_primary_color)
      document.documentElement.style.setProperty('--secondary-color', settings && settings?.web_setting?.dark_secondary_color)
      document.documentElement.style.setProperty('--hover--color', settings && settings?.web_setting?.dark_hover_color)
      document.documentElement.style.setProperty('--text-primary-color', settings && settings?.web_setting?.dark_text_primary_color)
      document.documentElement.style.setProperty('--text-secondary-color', settings && settings?.web_setting?.dark_text_secondary_color)
    }
    else {
      document.documentElement.style.setProperty('--body-color', settings && settings?.web_setting?.light_body_color)
      document.documentElement.style.setProperty('--primary-color', settings && settings?.web_setting?.light_primary_color)
      document.documentElement.style.setProperty('--secondary-color', settings && settings?.web_setting?.light_secondary_color)
      document.documentElement.style.setProperty('--hover--color', settings && settings?.web_setting?.light_hover_color)
      document.documentElement.style.setProperty('--text-primary-color', settings && settings?.web_setting?.light_text_primary_color)
      document.documentElement.style.setProperty('--text-secondary-color', settings && settings?.web_setting?.light_text_secondary_color)
    }
  }, [settings, darkThemeMode])

  // Check if the user is authenticated based on the presence of the token
  const isAuthenticated = userData && userData?.data?.token

  // Check if the current route requires authentication
  const requiresAuth = protectedRoutes.includes(pathname)

  useEffect(() => {
    authCheck()
  }, [requiresAuth])

  const authCheck = () => {
    if (requiresAuth) {
      if (isAuthenticated === undefined) {
        router.push('/')
        toast.error('please login first')
        return
      }
    }
  }
  useEffect(() => {
    if (currentLanguage?.id) {
      loadCategories({
        offset: "0",
        limit: "15",
        language_id: currentLanguage?.id,
        onSuccess: (res) => {
          dispatch(categoriesUpdateLanguage(currentLanguage.id))
        },
        onErro: (err) => {
          console.log("error", err)
          dispatch(categoriesUpdateLanguage(""))
        }
      })

    }
  }, [currentLanguage])

  const GetUserByIdFetchData = () => {
    if (!userData.data?.firebase_id) return false
    loadGetUserByIdApi({
      onSuccess: (res) => {
        // console.log(res)
        const data = res
        if (data && data.data.status === 0) {
          toast.error('You are deactivated by admin!')
          signOut(authentication)
            .then(() => {
              logoutUser()
              navigate.push('/')
            })
            .catch(error => {
              toast.error(error)
            })
          return false
        }

        if (data && data.data) {
          const roles = data.data.role
          if (roles !== 0) {
            // setisuserRole(true)
          }
          return data.data
        } else {
          // Handle the case when data or data.data is undefined or empty
          // Return an appropriate value or handle the situation accordingly
          // For example:
          // setisuserRole(false);
          return []
        }
      },
      onError: (err) => {
        console.log(err)
      }
    }
    )
  }
  useEffect(() => {
    GetUserByIdFetchData()
  }, [currentLanguage, userData.data?.firebase_id])

  useEffect(() => {
    const handleCopy = (e) => {
      e.preventDefault();
    };
    document.addEventListener('copy', handleCopy);
    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, []);



  // for  live news
  const firstLoad = sessionStorage.getItem('firstLoad_LiveNews')
  const manualRefresh = sessionStorage.getItem('manualRefresh_LiveNews')

  const shouldFetchLiveNewsData = !firstLoad || manualRefresh === 'true'


  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('manualRefresh_LiveNews', 'true')
    })

    window.addEventListener('load', () => {
      // Check if this is a manual refresh by checking if lastFetch is set
      if (!sessionStorage.getItem('lastFetch_LiveNews')) {
        sessionStorage.setItem('manualRefresh_LiveNews', 'true')
      }
    })
  }


  // to check live new Data 
  // api call
  const getLiveStreaming = async () => {
    try {
      const { data } = await getLiveStreamingApi.getLiveStreaming({
        language_id: currentLanguage.id
      })
      dispatch(checkLiveNewsData({ data: { liveNewsDataFound: data.data?.length > 0 ? true : false } }))
      // console.log(data, 'checkLiveData')
      sessionStorage.setItem('lastFetch_LiveNews', Date.now())
      return data.data
    } catch (error) {
      console.log(error)
    }
  }


  // for  breaking news
  const firstLoadBreakingNews = sessionStorage.getItem('firstLoad_BreakingNews')
  const manualRefreshBreakingNews = sessionStorage.getItem('manualRefresh_BreakingNews')

  const shouldFetchBreakingNewsData = !firstLoadBreakingNews || manualRefreshBreakingNews === 'true'



  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('manualRefresh_BreakingNews', 'true')
    })

    window.addEventListener('load', () => {
      // Check if this is a manual refresh by checking if lastFetch is set
      if (!sessionStorage.getItem('lastFetch_BreakingNews')) {
        sessionStorage.setItem('manualRefresh_BreakingNews', 'true')
      }
    })
  }

  // api call 
  const getBreakingNewsApi = async () => {
    try {
      const { data } = await AllBreakingNewsApi.getBreakingNews({ language_id: currentLanguage.id, })
      dispatch(checkBreakingNewsData({ data: { breakingNewsDataFound: data.data?.length > 0 ? true : false } }))
      sessionStorage.setItem('lastFetch_BreakingNews', Date.now())
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (currentLanguage?.id && settings?.live_streaming_mode === '1' && shouldFetchLiveNewsData) {
      getLiveStreaming()
      sessionStorage.removeItem('manualRefresh_LiveNews')
      // Set firstLoad flag to prevent subsequent calls
      sessionStorage.setItem('firstLoad_LiveNews', 'true')
    }
    if (currentLanguage?.id && settings?.breaking_news_mode === '1' && shouldFetchBreakingNewsData) {
      getBreakingNewsApi()
      sessionStorage.removeItem('manualRefresh_BreakingNews')
      // Set firstLoad flag to prevent subsequent calls
      sessionStorage.setItem('firstLoad_BreakingNews', 'true')
    }
  }, [currentLanguage, settings?.live_streaming_mode, settings?.breaking_news_mode])



  return (
    <>
      {settings ? maintenanceMode == '1' ? <div className='under_maintance'>
        <div>
          {
            darkThemeMode ?
              <Image loading="lazy" src={maintenanceModeDark} alt="underMaintanceImg" width={600} height={600} onError={placeholderImage} /> :
              <Image loading="lazy" src={maintenanceModeLight} alt="underMaintanceImg" width={600} height={600} onError={placeholderImage} />
          }
        </div>
        <div>
          <h2 className='title'>
            {translate("underMaintance")}
          </h2>
        </div>
        <div>
          <h2 className='desc'>
            {translate("pleaseTryagain")}
          </h2>
        </div>
        {/* </div> */}
      </div> :
        (
          <>
            <SearchPopup />
            <TopBar />
            <Header />
            <CatNav />
            <div>{children}</div>
            {
              cookiesMode == '1' &&
              <CookiesComponent />
            }
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
