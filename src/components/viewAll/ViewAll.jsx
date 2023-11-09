'use client'

import { useState } from 'react'
import Link from 'next/link'
import BreadcrumbNav from '../breadcrumb/BreadcrumbNav'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import Skeleton from 'react-loading-skeleton'
import { translate } from '../../utils'
import no_image from '../../../public/assets/images/no_image.jpeg'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { getFeatureSectionByIdApi } from 'src/hooks/getfeatureSectionbyidApi'
import { getLanguage, getUser } from 'src/utils/api'

const ViewAll = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const dataPerPage = 6 // number of posts per page
  const pagesVisited = currentPage * dataPerPage
  const router = useRouter()
  const query = router.query
  const catid = query.slug
  const storedLatitude = localStorage.getItem('latitude')
  const storedLongitude = localStorage.getItem('longitude')
  let user = getUser()
  let { id: language_id } = getLanguage()
  // handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
  }

  const currentLanguage = useSelector(selectCurrentLanguage)

  const getFeatureSectionById = async () => {
    try {
      const { data } = await getFeatureSectionByIdApi.getFeatureSectionById({
        access_key: access_key,
        section_id: catid,
        language_id: language_id,
        user_id: user,
        offset: '',
        limit: '10',
        latitude: storedLatitude && storedLatitude ? storedLatitude : null,
        longitude: storedLongitude && storedLongitude ? storedLongitude : null
      })
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  // react query
  const { isLoading, data: Data } = useQuery({
    queryKey: ['viewallFeaturebyid', catid, currentLanguage],
    queryFn: getFeatureSectionById
  })

  // slice the array to get the current posts

  const currentData = Data[0]?.news
    ? Data[0]?.news.slice(pagesVisited, pagesVisited + dataPerPage)
    : Data[0]?.breaking_news.slice(pagesVisited, pagesVisited + dataPerPage)

  const lengthdata = Data[0]?.news ? Data[0]?.news.length : Data[0]?.breaking_news.length

  return (
    <>
      {Data[0]?.news ? (
        <>
          <BreadcrumbNav SecondElement={Data[0].title} ThirdElement='0' />
          <div id='BNV-main'>
            <div id='BNV-content' className='container'>
              {isLoading ? (
                <div>
                  <Skeleton height={200} count={3} />
                </div>
              ) : (
                <div className='row'>
                  {currentData ? (
                    currentData.map(element => (
                      <div className='col-md-4 col-12' key={element.id}>
                        <Link id='Link-all' href={`/news/${element.id}`}>
                          <div id='BNV-card' className='card'>
                            <img
                              id='BNV-card-image'
                              src={element.image ? element.image : no_image}
                              className='card-img'
                              alt='...'
                            />
                            <div id='BNV-card-body' className='card-body'>
                              {/* <button id='BNV-btnCatagory' className='btn btn-sm' type="button" >{element.category_name}</button> */}
                              <h5 id='BNV-card-title' className='card-title'>
                                {element.title}
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
              <ReactPaginate
                previousLabel={translate('previous')}
                nextLabel={translate('next')}
                pageCount={Math.ceil(lengthdata / dataPerPage)}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                previousLinkClassName={'pagination__link'}
                nextLinkClassName={'pagination__link'}
                disabledClassName={'pagination__link--disabled'}
                activeClassName={'pagination__link--active'}
              />
            </div>
          </div>
        </>
      ) : null}
      ;
      {Data[0]?.breaking_news ? (
        <>
          <BreadcrumbNav SecondElement={Data[0].title} ThirdElement='0' />
          <div id='BNV-main'>
            <div id='BNV-content' className='container'>
              {isLoading ? (
                <div>
                  <Skeleton height={200} count={3} />
                </div>
              ) : (
                <div className='row'>
                  {currentData ? (
                    currentData.map(element => (
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
                              {/* <button id='BNV-btnCatagory' className='btn btn-sm' type="button" >{element.category_name}</button> */}
                              <h5 id='BNV-card-title' className='card-title'>
                                {element.title}
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
              <ReactPaginate
                previousLabel={translate('previous')}
                nextLabel={translate('next')}
                pageCount={Math.ceil(lengthdata / dataPerPage)}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                previousLinkClassName={'pagination__link'}
                nextLinkClassName={'pagination__link'}
                disabledClassName={'pagination__link--disabled'}
                activeClassName={'pagination__link--active'}
              />
            </div>
          </div>
        </>
      ) : null}
      ;
    </>
  )
}

export default ViewAll
