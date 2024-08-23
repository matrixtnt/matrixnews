'use client'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadLanguageLabels,
  selectCurrentLanguage,
  selectLanguages,
  setCurrentLanguage
} from '../../store/reducers/languageReducer'
import axios from 'axios'
import { SlCalender } from 'react-icons/sl'
import { HiArrowLongUp, HiArrowLongDown } from 'react-icons/hi2'
import { Dropdown } from 'react-bootstrap'
import { FaFacebookSquare, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaSquareXTwitter } from "react-icons/fa6";

import { useQuery } from '@tanstack/react-query'
import Skeleton from 'react-loading-skeleton'
import { useEffect, useState } from 'react'
import { loadLocation, locationData, settingsData } from 'src/store/reducers/settingsReducer'
import toast from 'react-hot-toast'
import { registerFcmTokenApi } from 'src/store/actions/campaign'
import { isLogin, placeholderImage, translate } from 'src/utils'
import { useRouter } from 'next/router'
import LanguageDropdown from '../view/Dropdowns/LanguagesDropdown'
import { checkLocationPermission, checkNotificationPermission, checkPermissionsSelector, isLocationPermissionCheck, isNotificationPermissionCheck } from 'src/store/reducers/CheckPermissionsReducer'
import { FaMoon } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { checkThemeMode, themeSelector } from 'src/store/reducers/CheckThemeReducer'
import ThemeToggler from '../view/ThemeToggler'

const WeatherCard = () => {
  const currentLanguage = useSelector(selectCurrentLanguage)
  const getLocation = useSelector(settingsData)
  const location = useSelector(locationData)
  const getLocationData = getLocation?.location_news_mode
  const storedLatitude = location && location.lat
  const storedLongitude = location && location.long
  const weatherMode = getLocation?.weather_mode

  const checkPermissions = useSelector(checkPermissionsSelector);
  const checkNotificationPermissionOnce = checkPermissions?.data?.isNotificaitonPermissionCheck;
  const checkLocationPermissonOnce = checkPermissions?.data?.isLocaitonPermissionCheck;

  const darkThemeMode = useSelector(themeSelector);

  const socialMedias = getLocation?.social_media;

  const dispatch = useDispatch()

  const router = useRouter()

  const weatherApi = async () => {
    return new Promise((resolve, reject) => {
      try {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords

            if (getLocationData === '1') {
              loadLocation(latitude, longitude)
            } else {
              loadLocation(null, null)
            }

            const response = await axios.get(
              `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${latitude},${longitude}&days=1&aqi=no&alerts=no&lang=${currentLanguage?.code}`
            )
            dispatch(checkLocationPermission({ data: { isLocationPermission: 'granted' } }))
            resolve(response.data) // Resolve the promise with the fetched data
          })
        } else {
          toast.error('Geolocation not supported')
          dispatch(checkLocationPermission({ data: { isLocationPermission: 'not supported' } }))
        }
      } catch (error) {
        loadLocation(null, null)
        reject(error) // Reject the promise if an error occurs
      }
    })
  }

  // react query
  const { isLoading, data: weather } = useQuery({
    queryKey: ['weather', currentLanguage, getLocationData],
    queryFn: weatherApi,

  })

  // to get today weekday nameselectLanguages
  const today = new Date()

  const dayOfMonth = today.getDate() // returns the day of the month (1-31)
  // const month = today.getMonth() + 1;  // returns the month (0-11); add 1 to get the correct month
  const year = today.getFullYear() // returns the year (4 digits)

  const month = today.toLocaleString('default', { month: 'long' })

  // Assuming forecastData is an array of forecast objects

  const maxTempC = weather && weather.forecast.forecastday[0]?.day.maxtemp_c
  const minTempC = weather && weather.forecast.forecastday[0]?.day.mintemp_c

  const languagesData = useSelector(selectLanguages)

  // language change
  const languageChange = async (name, code, id, display_name) => {
    loadLanguageLabels({ code: code })
    setCurrentLanguage(name, code, id, display_name)
    if (isLogin() && location.fcmtoken) {

      await registerFcmTokenApi({
        token: location.fcmtoken,
        latitude: storedLatitude,
        longitude: storedLongitude,
        onSuccess: async res => {
        },
        onError: async err => {
          console.log(err)
        }
      })
    }
  }

  useEffect(() => {
    if (currentLanguage?.code) {
      loadLanguageLabels({ code: currentLanguage?.code })
    }
  }, [currentLanguage?.code])

  const registerToken = (tokenId) => {
    if (tokenId) {
      registerFcmTokenApi({
        token: tokenId,
        latitude: storedLatitude,
        longitude: storedLongitude,
        onSuccess: async res => {
        },
        onError: async err => {
          console.log(err);
        }
      });
    }
  }

  useEffect(() => {
    if (checkPermissions?.data?.isNotificaitonPermission === 'granted' && isLogin() && checkNotificationPermissionOnce === false) {
      // console.log('i am 1')
      registerToken(location.fcmtoken)
      dispatch(isNotificationPermissionCheck({ data: { isNotificaitonPermissionChecked: true } }))
    }

  }, [checkPermissions])

  useEffect(() => {
    if (checkPermissions?.data?.isNotificaitonPermission === 'denied' && isLogin() && checkNotificationPermissionOnce === false) {
      // console.log('i am 2')
      registerToken('')
      dispatch(isNotificationPermissionCheck({ data: { isNotificaitonPermissionChecked: true } }))
    }

  }, [checkPermissions])

  useEffect(() => {
    if (checkPermissions?.data?.isLocationPermission === 'granted' && isLogin() && checkLocationPermissonOnce === false) {
      // console.log('i am 3')
      registerToken('')
      dispatch(isLocationPermissionCheck({ data: { isLocaitonPermissionChecked: true } }))
    }

  }, [checkPermissions])


  return (
    <div id='rns-weather-card'>
      <div id='weather-main-text' className='container'>
        <div className='row align-items-center'>
          <div className='col-md-6 col-12'>
            <div className='left-weather'>
              <div className='calender_icon me-2'>
                <p className=' mb-0'>
                  <SlCalender />
                  {`${month}`}
                  {`${dayOfMonth}`}
                  ,{`${year}`}
                </p>
              </div>
              {isLoading ? (
                <>
                  <Skeleton height={5} count={3} />
                </>
              ) : (
                weather && weatherMode === '1' && (
                  <>
                    <img src={weather && weather?.current?.condition?.icon} alt='weather news' className='weather_icon' onError={placeholderImage} />
                    <b className='me-2'>{weather && weather?.current?.temp_c}°C</b>
                    <div className='left-state'>
                      <p className='location-wcard mb-0 '>
                        {weather && weather?.location && weather?.location?.name},
                        {weather && weather?.location && weather?.location?.region},
                        {weather && weather?.location && weather?.location?.country}
                      </p>
                      <p className='day-Wtype-wcard mb-0 '>
                        <HiArrowLongUp />
                        {maxTempC}°C <HiArrowLongDown />
                        {minTempC}°C
                      </p>
                    </div>
                  </>
                )
              )}
            </div>
          </div>
          <div className='col-md-6 col-12'>
            <div className='right-weather'>

              <ThemeToggler />

              {
                router.pathname === '/' && languagesData?.length > 1 ? <>
                  <ul className='language_section'>
                    <li>
                      <LanguageDropdown currentLanguage={currentLanguage} languagesData={languagesData} languageChange={languageChange} />
                    </li>
                  </ul>
                  {socialMedias?.length > 0 && <div className='slash-line'></div>}
                </>
                  : socialMedias?.length > 0 && <span className='fw-bold followUs'>{translate('followus')} :</span>
              }
              <div className='social_media_top'>
                {
                  socialMedias?.length > 0 ?
                    socialMedias?.map((data) => {
                      return <a
                        target='_blank'
                        id='social_platforms'
                        className='me-2'
                        href={data?.link}
                        rel='noreferrer'
                        key={data?.id}
                      >
                        <img src={data?.image} alt="social-media-icon" className='socialMediaIcons' onError={placeholderImage} />
                      </a>
                    }) : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
