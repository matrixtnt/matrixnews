'use client'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import StyleOne from './StyleOne'
import StyleTwo from './StyleTwo'
import StyleThree from './StyleThree'
import StyleFour from './StyleFour'
import StyleFive from './StyleFive'
import { translate } from '../../utils'
import Skeleton from 'react-loading-skeleton'
import StyleSix from './StyleSix'
import { useQuery } from '@tanstack/react-query'
import { access_key, getLanguage } from 'src/utils/api'
import { locationData } from 'src/store/reducers/settingsReducer'
import { getFeatureSectionApi } from 'src/hooks/getFeatureSectionApi'
import toast from 'react-hot-toast'
import NoDataFound from '../noDataFound/NoDataFound'
import Card from '../skeletons/Card'
import { useEffect, useState } from 'react'
import { getNewsApi } from 'src/hooks/newsApi'
import NewsStyle from './NewsStyle'
import { layoutUpdateLanguage, loadLayout } from 'src/store/reducers/featureLayoutReducer'

const FeatureLayout = () => {
  let { id: language_id } = getLanguage()
  const [noFeatureData, setNoFeatureData] = useState(false)
  const [newsDataFound, setNewsDataFound] = useState(true)

  const dispatch = useDispatch();

  // current language
  const currentLanguage = useSelector(selectCurrentLanguage)
  const location = useSelector(locationData)
  const storedLatitude = location && location.lat
  const storedLongitude = location && location.long
  const [Data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // api call
  const getNews = async page => {
    try {
      const { data } = await getNewsApi.getNews({
        access_key: access_key,
        offset: 0,
        limit: 10,
        get_user_news: '',
        search: '',
        language_id: language_id,
        category_id: '',
        // category_slug: ,
        subcategory_slug: '',
        tag_id: '',
        slug: '',
        latitude: storedLatitude,
        longitude: storedLongitude
      })
      if (data.error) {
        setNewsDataFound(true)
      }
      setNewsDataFound(false)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  // // react query
  const { isLoading: newsLoading, data: newsData } = useQuery({
    queryKey: ['newsData', currentLanguage, location],
    queryFn: () => getNews()
  })

  // console.log('language_id', language_id)

  const getFeatureSection = async () => {
    setIsLoading(true)
    loadLayout({
      access_key: access_key,
      language_id: language_id,
      onSuccess: response => {
        dispatch(layoutUpdateLanguage(currentLanguage.id))
        // console.log(currentLanguage.id,'langId-FeatureLayout')
        setData(response.data)
        setIsLoading(false)

      },
      onError: error => {
        console.log(error)
        setNoFeatureData(true)
        getNews()
      }
    })
  }

  useEffect(() => {
    if (language_id) {
      getFeatureSection()
    }
  }, [])


  // const getFeatureSection = async () => {
  //   try {
  //     const { data } = await getFeatureSectionApi.getFeatureSection({
  //       access_key: access_key,
  //       language_id: language_id,
  //       latitude: storedLatitude,
  //       longitude: storedLongitude
  //     })

  //     // console.log(data.error)
  //     if (data.error) {
  //       setNoFeatureData(true)
  //       getNews()

  //     }

  //     return data.data
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // react query
  // const { isLoading, data: Data } = useQuery({
  //   queryKey: ['mainfeatureSection', currentLanguage, location],
  //   queryFn: getFeatureSection
  // })



  useEffect(() => {

    // console.log('noFeatureData = ', noFeatureData)
    // console.log('newsDataFound = ', newsDataFound)

  }, [noFeatureData, newsDataFound])

  const SelectType = () => {
    return (
      isLoading ? <>
        <Card />
      </> :
        noFeatureData && newsDataFound ? <><NoDataFound /></> :
          Data &&
          Data.map((item, index) => {
            // console.log('i am feature sectoin')
            if (item.news_type === 'news') {
              if (item.style_web === 'style_1') {
                return <StyleOne key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_2') {
                return <StyleTwo key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_3') {
                return <StyleThree key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_4') {
                return <StyleFour key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_5') {
                return <StyleFive key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_6') {
                return <StyleSix key={index} visLoading={isLoading} Data={item} />
              }
            } else if (item.news_type === 'breaking_news') {
              if (item.style_web === 'style_1') {
                return <StyleOne key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_2') {
                return <StyleTwo key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_3') {
                return <StyleThree key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_4') {
                return <StyleFour key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_5') {
                return <StyleFive key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_6') {
                return <StyleSix key={index} isLoading={isLoading} Data={item} />
              }
            } else if (item.news_type === 'videos') {
              if (item.style_web === 'style_1') {
                return <StyleOne key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_2') {
                return <StyleTwo key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_3') {
                return <StyleThree key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_4') {
                return <StyleFour key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_5') {
                return <StyleFive key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_6') {
                return <StyleSix key={index} isLoading={isLoading} Data={item} />
              }
            } else if (item.news_type === 'user_choice') {
              if (item.style_web === 'style_1') {
                return <StyleOne key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_2') {
                return <StyleTwo key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_3') {
                return <StyleThree key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_4') {
                return <StyleFour key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_5') {
                return <StyleFive key={index} isLoading={isLoading} Data={item} />
              } else if (item.style_web === 'style_6') {
                return <StyleSix key={index} isLoading={isLoading} Data={item} />
              }
            }
            return null
          })
    )
  }

  const selectedComponent = SelectType()

  return (
    <>
      {isLoading ? (
        <div className='container'>
          <div className='col-12 loading_data'>
            <Skeleton height={20} count={22} />
          </div>
        </div>
      ) : selectedComponent && selectedComponent.length > 0 ? (
        selectedComponent
      ) : !newsDataFound ? <> <NewsStyle isLoading={newsLoading} Data={newsData} /> </> :
        (
          <p className='no_data_available'>{translate('noNews')}</p>
        )}
    </>
  )
}

export default FeatureLayout
