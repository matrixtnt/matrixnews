'use client'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import StyleOne from './StyleOne'
import StyleTwo from './StyleTwo'
import StyleThree from './StyleThree'
import StyleFour from './StyleFour'
import StyleFive from './StyleFive'
import { translate, NoDataFound, isLogin } from '../../utils'

import Skeleton from 'react-loading-skeleton'
import StyleSix from './StyleSix'
import { useQuery } from '@tanstack/react-query'
import { getLanguage } from 'src/utils/api'
import { locationData } from 'src/store/reducers/settingsReducer'
import { getFeatureSectionApi } from 'src/hooks/getFeatureSectionApi'
import toast from 'react-hot-toast'
import Card from '../skeletons/Card'
import { useEffect, useState } from 'react'
import { getNewsApi } from 'src/hooks/newsApi'
import DefaultNewsStyle from './DefaultNewsStyle'
import { layoutReceived, layoutUpdateLanguage, loadLayout } from 'src/store/reducers/featureLayoutReducer'
import { loadNews } from 'src/store/reducers/newsReducer'
import { selectUser } from 'src/store/reducers/userReducer'
import StyleTwoSkeleton from '../skeletons/StyleTwoSkeleton'
import StyleThreeSkeleton from '../skeletons/StyleThreeSkeleton'
import StyleFourSkeleton from '../skeletons/StyleFourSkeleton'
import StyleFiveSkeleton from '../skeletons/StyleFiveSkeleton'
import StyleSixSkeleton from '../skeletons/StyleSixSkeleton'
import StyleOneSkeleton from '../skeletons/StyleOneSkeleton'

const FeatureLayout = () => {
  let { id: language_id } = getLanguage()
  const [noFeatureData, setNoFeatureData] = useState(false)
  const [newsDataFound, setNewsDataFound] = useState(true)

  const userData = useSelector(selectUser)
  const userToken = userData?.data?.token;

  const dispatch = useDispatch();

  // current language
  const currentLanguage = useSelector(selectCurrentLanguage)
  const location = useSelector(locationData)
  const storedLatitude = location && location.lat
  const storedLongitude = location && location.long
  const [Data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isNoDataLoading, setNoDataIsLoading] = useState(false)
  const [isNoData, setNoData] = useState([])

  const getNewsWhenNoData = async () => {
    setIsLoading(true)
    loadNews({
      offset: '0',
      limit: 10, // {optional}
      language_id: language_id,
      latitude: storedLatitude,
      longitude: storedLongitude,
      onSuccess: (response) => {
        // console.log(response)
        setNoData(response?.data)
        setNewsDataFound(false)
        setNoDataIsLoading(false)
        setIsLoading(false)

      },
      onError: (error) => {
        setNewsDataFound(true)
        setNoDataIsLoading(false)
        setIsLoading(false)
        setNoFeatureData(true)
        setNewsDataFound(true)
        console.log('no data found', error)
      }
    })
  }



  useEffect(() => {
    if (currentLanguage?.id) {
      setIsLoading(true)
      setNewsDataFound(true)
      loadLayout({
        offset: 0,
        limit: 9,
        isToken: userToken ? true : false,
        onSuccess: (response) => {
          dispatch(layoutUpdateLanguage(currentLanguage.id))
          setData(response.data)
          setIsLoading(false)
          setNewsDataFound(false)
        },
        onError: (error) => {
          dispatch(layoutUpdateLanguage(""))
          setData([])
          setNoFeatureData(false)
          setNewsDataFound(true)
          setIsLoading(false)
          setNoDataIsLoading(true)
          console.log('no data found', error)
        }
      })
    }
  }, [currentLanguage, isLogin()])

  useEffect(() => {
    if (isNoDataLoading) {
      getNewsWhenNoData()
    }
  }, [isNoDataLoading])

  useEffect(() => {

    // console.log('noFeatureData = ', noFeatureData)
    // console.log('newsDataFound = ', newsDataFound)

  }, [noFeatureData, newsDataFound])

  const SelectType = () => {
    return (
      noFeatureData && newsDataFound ? <>
        {NoDataFound()}
      </> :
        Data &&
        Data.map((item, index) => {
          // console.log('i am feature sectoin')
          if (item.news_type === 'news') {
            if (item.style_web === 'style_1') {
              return <StyleOne key={index} Data={item} />
            } else if (item.style_web === 'style_2') {
              return <StyleTwo key={index} Data={item} />
            } else if (item.style_web === 'style_3') {
              return <StyleThree key={index} Data={item} />
            } else if (item.style_web === 'style_4') {
              return <StyleFour key={index} Data={item} />
            } else if (item.style_web === 'style_5') {
              return <StyleFive key={index} Data={item} />
            } else if (item.style_web === 'style_6') {
              return <StyleSix key={index} Data={item} isLoading={isLoading} setIsLoading={setIsLoading} />
            }
          } else if (item.news_type === 'breaking_news') {
            if (item.style_web === 'style_1') {
              return <StyleOne key={index} Data={item} />
            } else if (item.style_web === 'style_2') {
              return <StyleTwo key={index} Data={item} />
            } else if (item.style_web === 'style_3') {
              return <StyleThree key={index} Data={item} />
            } else if (item.style_web === 'style_4') {
              return <StyleFour key={index} Data={item} />
            } else if (item.style_web === 'style_5') {
              return <StyleFive key={index} Data={item} />
            } else if (item.style_web === 'style_6') {
              return <StyleSix key={index} Data={item} isLoading={isLoading} setIsLoading={setIsLoading} />
            }
          } else if (item.news_type === 'videos') {
            if (item.style_web === 'style_1') {
              return <StyleOne key={index} Data={item} />
            } else if (item.style_web === 'style_2') {
              return <StyleTwo key={index} Data={item} />
            } else if (item.style_web === 'style_3') {
              return <StyleThree key={index} Data={item} />
            } else if (item.style_web === 'style_4') {
              return <StyleFour key={index} Data={item} />
            } else if (item.style_web === 'style_5') {
              return <StyleFive key={index} Data={item} />
            } else if (item.style_web === 'style_6') {
              return <StyleSix key={index} Data={item} isLoading={isLoading} setIsLoading={setIsLoading} />
            }
          } else if (item.news_type === 'user_choice') {
            if (item.style_web === 'style_1') {
              return <StyleOne key={index} Data={item} />
            } else if (item.style_web === 'style_2') {
              return <StyleTwo key={index} Data={item} />
            } else if (item.style_web === 'style_3') {
              return <StyleThree key={index} Data={item} />
            } else if (item.style_web === 'style_4') {
              return <StyleFour key={index} Data={item} />
            } else if (item.style_web === 'style_5') {
              return <StyleFive key={index} Data={item} />
            } else if (item.style_web === 'style_6') {
              return <StyleSix key={index} Data={item} isLoading={isLoading} setIsLoading={setIsLoading} />
            }
          }
          return null
        })
    )
  }

  const selectedComponent = SelectType()

  return (
    <div className='d-flex flex-column gap-5 mb-4'>
      {isLoading ? (
        <>
          <StyleTwoSkeleton />
          <StyleThreeSkeleton />
          <StyleOneSkeleton />
          <StyleFourSkeleton />
          <StyleFiveSkeleton />
          <StyleSixSkeleton />
        </>
      ) : selectedComponent && selectedComponent.length > 0 ? (
        selectedComponent
      ) : !newsDataFound ? <> <DefaultNewsStyle isLoading={isNoDataLoading} Data={isNoData} /> </> :
        (
          <p className='no_data_available'>{translate('noNews')}</p>
        )
      }
    </div>
  )
}

export default FeatureLayout
