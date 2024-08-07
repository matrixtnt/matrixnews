'use client'
import { useEffect } from 'react'
import { laodSettingsApi, settingsData, loadSystemTimezone } from 'src/store/reducers/settingsReducer'
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
import { clearAllSiteData } from 'src/utils'
import { themeSelector } from 'src/store/reducers/CheckThemeReducer'

const Layout = ({ children }) => {
  const settings = useSelector(settingsData)
  const userData = useSelector(selectUser)
  const router = useRouter()
  const pathname = usePathname()

  const checkNewsData = useSelector(checkNewsDataSelector)

  const darkThemeMode = useSelector(themeSelector);


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


  // to check live new Data 
  // api call
  const getLiveStreaming = async () => {
    try {
      const { data } = await getLiveStreamingApi.getLiveStreaming({
        language_id: currentLanguage.id
      })
      dispatch(checkLiveNewsData({ data: { liveNewsDataFound: data.data?.length > 0 ? true : false, isLiveNewsApiCallOnce: true } }))
      // console.log(data, 'checkLiveData')
      return data.data
    } catch (error) {
      console.log(error)
    }
  }


  // api call 
  const getBreakingNewsApi = async () => {
    try {
      const { data } = await AllBreakingNewsApi.getBreakingNews({ language_id: currentLanguage.id, })
      dispatch(checkBreakingNewsData({ data: { breakingNewsDataFound: data.data?.length > 0 ? true : false, isBreakingNewsApiCallOnce: true, } }))
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (currentLanguage?.id && !isLiveNewsCallOnce && !isBreakingNewsCallOnce) {
      getLiveStreaming()
      getBreakingNewsApi()
    }
  }, [currentLanguage])


  // to clear cache and siteData every 24 hrs 
  // useEffect(() => {
  //   setInterval(() => {
  //     clearAllSiteData()
  //     window.location.reload(true);
  //   }, 86400000);
  // }, [])

  // Function to calculate the time until midnight
  const calculateTimeToMidnight = () => {
    const now = new Date()
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0)
    return midnight - now
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      clearAllSiteData()
      window.location.reload(true)
    }, calculateTimeToMidnight())

    return () => clearTimeout(timeout)
  }, [])



  return (
    <>
      {settings ? (
        <>
          <SearchPopup />
          <TopBar />
          <Header />
          <CatNav />
          <div>{children}</div>
          {/* <CookiesComponent /> */}
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
