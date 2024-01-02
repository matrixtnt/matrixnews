'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import BreadcrumbNav from '../breadcrumb/BreadcrumbNav'
import { translate, truncateText } from '../../utils'
import Skeleton from 'react-loading-skeleton'
import { imgError } from '../../utils/index'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import ReactPaginate from 'react-paginate'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { useQuery } from '@tanstack/react-query'
import { getNotificationsApi } from 'src/hooks/getNotificationApi'
import { access_key, getLanguage } from 'src/utils/api'
import Layout from '../layout/Layout'

const NewsNotification = () => {
  const currentLanguage = useSelector(selectCurrentLanguage)
  const [totalLength, setTotalLength] = useState(0)
  const [offsetdata, setOffsetdata] = useState(0)
  const limit = 6
  let { id: language_id } = getLanguage()

  const handlePageChange = selectedPage => {
    // console.log(selectedPage)
    const newOffset = selectedPage?.selected * limit
    setOffsetdata(newOffset)
  }

  // api call
  const getNotifications = async () => {
    try {
      const { data } = await getNotificationsApi.getNotifications({
        access_key: access_key,
        offset: offsetdata.toString(),
        limit: limit.toString(),
        language_id: language_id
      })
      setTotalLength(data.total)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  // react query
  const {
    isLoading,
    data: Data,
  } = useQuery({
    queryKey: ['getNotification', currentLanguage, offsetdata],
    queryFn: getNotifications,
    staleTime: 0
  })
  

  // Function to format the date as "day Month year"
  const formatDate = dateString => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`
  }

  return (
    <Layout>
      <BreadcrumbNav SecondElement={translate('notificationLbl')} ThirdElement='0' />
      <div className='new_noti-sec py-5 bg-white'>
        <div className='container new_notification'>
          <div className='d-flex bd-highlight mb-3'>
            <Link href='/personal-notification' id='btnNotification11' className='btn mx-1 bd-highlight'>
              {translate('personalLbl')}
            </Link>
            <Link href='/news-notification' id='btnNewsnoti1' className='btn mx-1 bd-highlight'>
              {translate('news')}
            </Link>
          </div>
          <div className='my-3'>
            {isLoading ? (
              <div className='col-12 loading_data'>
                <Skeleton height={20} count={22} />
              </div>
            ) : Data && Data.length > 0 ? (
              Data.map((element, index) => (
                <Link
                  className={`card my-3${element.category_id === '0' ? ' disabled-link' : ''}`}
                  key={index}
                  href={{pathname:`/news/${element.news.slug}`,query: { language_id: element.language_id}}}
                >
                  <div className='card-body bd-highlight' id='card-noti'>
                    <img id='noti_profile' src={element.image} alt='notification' onError={imgError} />
                    <div className='Noti-text'>
                      <p className='bd-highlight bd-title'>{truncateText(element.title, 100)}</p>
                      <p className='bd-highlight bd-title message-title'>{truncateText(element.message, 550)}</p>
                      <p className='bd-highlight mb-0'> {formatDate(element.date_sent)}</p>
                    </div>
                    {element.category_id !== '0' ? (
                      <p className='redirect_arrow'>
                        <BsFillArrowRightCircleFill />
                      </p>
                    ) : null}
                  </div>
                </Link>
              ))
            ) : (
              <div className='col-12 no_data mt-5'>
                <p className='text-center'>{translate('nodatafound')}</p>
              </div>
            )}
          </div>
          {totalLength > 0 ? (
            <ReactPaginate
              previousLabel={translate('previous')}
              nextLabel={translate('next')}
              breakLabel='...'
              breakClassName='break-me'
              pageCount={Math.ceil(totalLength / limit)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={'pagination'}
              previousLinkClassName={'pagination__link'}
              nextLinkClassName={'pagination__link'}
              disabledClassName={'pagination__link--disabled'}
              activeClassName={'pagination__link--active'}
            />
          ) : null}
        </div>
      </div>
    </Layout>
  )
}

export default NewsNotification
