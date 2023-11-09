'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { categoriesApi } from '../../store/actions/campaign'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { translate } from '../../utils'
import Skeleton from 'react-loading-skeleton'
import { settingsData } from '../../store/reducers/settingsReducer'
import Link from 'next/link'

SwiperCore.use([Navigation, Pagination])
const CatNav = () => {
  const [Data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useRouter()
  const currentLanguage = useSelector(selectCurrentLanguage)
  const categoiresOnOff = useSelector(settingsData)

  useEffect(() => {
    categoriesApi(
      '0',
      '40',
      currentLanguage.id,
      response => {
        const responseData = response.data
        setData(responseData)
        setIsLoading(false)
      },
      error => {
        if (error === 'No Data Found') {
          setData('')
          setIsLoading(false)
        }
      }
    )
  }, [currentLanguage])

  const swiperOption = {
    loop: Data && Data.length > 10 ? true : false,
    speed: 3000,
    spaceBetween: 10,
    slidesPerView: 'auto',
    navigation: false,
    freeMode: true,
    observer: true,
    observeParents: true,
    parallax: true,
    breakpoints: {
      1200: {
        slidesPerView: 11
      }
    },
    autoplay: {
      delay: 0
    }
  }

  return (
    <>
      {categoiresOnOff && categoiresOnOff.category_mode === '1' ? (
        <>
          {Data && Data.length > 0 ? (
            <div id='cn-main' expand='lg'>
              <div className='container py-2'>
                {isLoading ? (
                  <div>
                    <Skeleton height={200} count={3} />
                  </div>
                ) : (
                  <div className={`cn-main-div ${Data && Data.length > 10 ? 'flex-display' : 'block-display'}`}>
                    <Swiper {...swiperOption}>
                      {Data.map((element, index) => (
                        <SwiperSlide key={element.id} className='text-center'>
                          <Link id='catNav-links' href={`/categories-news/${element.id}`}>
                            <b>{element.category_name}</b>
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    {Data?.length > 10 ? (
                      <button
                        id='catNav-more'
                        onClick={() => {
                          navigate.push('/all-categories')
                        }}
                      >
                        {translate('More >>')}
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  )
}

export default CatNav
