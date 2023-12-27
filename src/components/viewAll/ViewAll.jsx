'use client'

import { useState } from 'react'
import Link from 'next/link'
import BreadcrumbNav from '../breadcrumb/BreadcrumbNav'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import { translate } from '../../utils'
import no_image from '../../../public/assets/images/no_image.jpeg'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { getFeatureSectionApi } from 'src/hooks/getfeatureSectionbyidApi'
import { access_key, getLanguage, getUser } from 'src/utils/api'
import Layout from '../layout/Layout'
import Card from '../skeletons/Card'
import { locationData } from 'src/store/reducers/settingsReducer'

const ViewAll = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const dataPerPage = 6 // number of posts per page
  const pagesVisited = currentPage * dataPerPage
  const router = useRouter()
  const query = router.query
  const catid = query.slug
  const location = useSelector(locationData)
  const storedLatitude = location && location.lat
  const storedLongitude = location && location.long
  let user = getUser()
  let { id: language_id } = getLanguage()
  // handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
  }

  const currentLanguage = useSelector(selectCurrentLanguage)

  const getFeatureSection = async () => {
    try {
      const { data } = await getFeatureSectionApi.getFeatureSection({
        access_key: access_key,
        section_id: catid,
        language_id: language_id,
        offset: '',
        limit: '10',
        slug:catid,
        latitude: storedLatitude,
        longitude: storedLongitude
      })
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  // react query
  const { isLoading, data: Data } = useQuery({
    queryKey: ['viewallFeaturebyslug', catid, currentLanguage,location],
    queryFn: getFeatureSection
  })

  // slice the array to get the current posts

  const currentData =
    Data && Data[0]?.news
      ? Data && Data[0]?.news.slice(pagesVisited, pagesVisited + dataPerPage)
      : Data && Data[0]?.breaking_news.slice(pagesVisited, pagesVisited + dataPerPage)

  const lengthdata = Data && Data[0]?.news ? Data && Data[0]?.news.length : Data && Data[0]?.breaking_news.length

  return (
    <Layout>
      {Data && Data[0]?.news ? (
        <>
          <BreadcrumbNav SecondElement={Data[0].title} ThirdElement='0' />
          <div id='BNV-main'>
            <div id='BNV-content' className='container'>
              {isLoading ? (
                <div className='row'>
                  {[...Array(3)].map((_, index) => (
                    <div className='col-md-4 col-12' key={index}>
                      <Card isLoading={true} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className='row'>
                  {currentData ? (
                    currentData.map(element => (
                      <div className='col-md-4 col-12' key={element.id}>
                        <Link id='Link-all' href={{pathname:`/news/${element.slug}`,query: { language_id: element.language_id}}}>
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
      {Data && Data[0]?.breaking_news ? (
        <>
          <BreadcrumbNav SecondElement={Data[0].title} ThirdElement='0' />
          <div id='BNV-main'>
            <div id='BNV-content' className='container'>
              {isLoading ? (
                <div className='row'>
                  {[...Array(3)].map((_, index) => (
                    <div className='col-md-4 col-12' key={index}>
                      <Card isLoading={true} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className='row'>
                  {currentData ? (
                    currentData.map(element => (
                      <div className='col-md-4 col-12' key={element.id}>
                        <Link id='Link-all' href={`/breaking-news/${element.slug}`}>
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
    </Layout>
  )
}

export default ViewAll
