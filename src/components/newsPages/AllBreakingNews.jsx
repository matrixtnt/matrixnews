'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect } from 'react'
import BreadcrumbNav from '../breadcrumb/BreadcrumbNav'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import { getbreakingNewsApi } from '../../store/actions/campaign'
import Skeleton from 'react-loading-skeleton'
import { translate } from '../../utils'
import no_image from '../../../public/assets/images/no_image.jpeg'

const AllBreakingNews = () => {
  const [Data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useRouter()
  const currentLanguage = useSelector(selectCurrentLanguage)
  useEffect(() => {
    getbreakingNewsApi(
      response => {
        const responseData = response.data
        setData(responseData)
        setLoading(false)
      },
      error => {
        if (error === 'No Data Found') {
          setData('')
          navigate.push('/')
          setLoading(false)
        }
      }
    )
    // eslint-disable-next-line
  }, [currentLanguage])

  return (
    <>
      <BreadcrumbNav SecondElement={translate('breakingNewsLbl')} ThirdElement='0' />
      <div id='BNV-main'>
        <div id='BNV-content' className='container'>
          {loading ? (
            <div>
              <Skeleton height={200} count={3} />
            </div>
          ) : (
            <div className='row my-5'>
              {Data.length > 0 ? (
                Data.map(element => (
                  <div className='col-md-4 col-12' key={element.id}>
                    <Link id='Link-all' href={`/breaking-news/${element.id}`}>
                      <div id='BNV-card' className='card'>
                        <img
                          id='BNV-card-image'
                          src={element.image ? element.image : no_image}
                          className='card-img'
                          alt='...'
                        />
                        <div id='BNV-card-body' className='card-body'>
                          <h5 id='BNV-card-title' className='card-title'>
                            {element.title.slice(0, 150)}...
                          </h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className='text-center my-5'>{translate('nodatafound')}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AllBreakingNews
