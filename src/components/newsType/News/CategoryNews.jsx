'use client'
import { FiCalendar } from 'react-icons/fi'
import Link from 'next/link'
import BreadcrumbNav from '../../breadcrumb/BreadcrumbNav'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../../store/reducers/languageReducer'
import { translate } from '../../../utils'
import { useRouter } from 'next/router.js'
import { access_key, getLanguage } from 'src/utils/api'
import { useQuery } from '@tanstack/react-query'
import Layout from 'src/components/layout/Layout'
import Card from 'src/components/skeletons/Card'
import { locationData } from 'src/store/reducers/settingsReducer'
import { getNewsApi } from 'src/hooks/newsApi'
import ReactPaginate from 'react-paginate'
import { useState } from 'react'

const CategoryNews = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const dataPerPage = 8 // number of posts per page
  const router = useRouter()
  const query = router.query
  const catId = query.category_id
  let { id: language_id } = getLanguage()
  const changelanguage = useSelector(selectCurrentLanguage)
  const location = useSelector(locationData)
  const storedLatitude = location && location.lat
  const storedLongitude = location && location.long

  // handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
  }

  // api call
  const getNewsByCategoryApi = async page => {
    try {
      const { data } = await getNewsApi.getNews({
        access_key: access_key,
        offset: page * dataPerPage,
        limit: dataPerPage,
        get_user_news: '',
        search: '',
        language_id: language_id,
        category_id: catId,
        subcategory_id: '',
        tag_id: '',
        latitude: storedLatitude,
        longitude: storedLongitude
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }

  // react query
  const { isLoading, data: Data } = useQuery({
    queryKey: ['category-news', catId, changelanguage, location, currentPage],
    queryFn: () => getNewsByCategoryApi(currentPage)
  })

  // slice the array to get the current posts
  const currentData = Data && Data.data && Data.data.slice(0, dataPerPage)

  const lengthdata = (Data && Data.total) || 0

  return (
    <Layout>
      <section className='categoryview_Section'>
        <BreadcrumbNav SecondElement={'category' ? 'category' : ''} ThirdElement='0' />
        <div id='cv-main' className='bg-white py-5'>
          <div id='cv-content' className='my-5 container'>
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
                {currentData && currentData.length > 0 ? (
                  currentData.map(element => (
                    <div className='col-lg-3 col-md-4 col-12 ' key={element.id}>
                      <Link
                        id='Link-all'
                        href={{ pathname: `/news/${element.slug}`, query: { language_id: element.language_id } }}
                      >
                        <div id='cv-card' className='card'>
                          <img id='cv-card-image' src={element.image} className='card-img' alt={element.title} />
                          <div id='cv-card-body' className='card-body'>
                            <button id='cv-btnCatagory' className='btn btn-sm' type='button'>
                              {element.category.category_name}
                            </button>
                            <p id='cv-card-title' className='card-title'>
                              {element.title}
                            </p>
                            <p id='cv-card-date'>
                              <FiCalendar size={18} id='cv-logoCalendar' />
                              {element.date}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className='text-center my-5'>{translate('nodatafound')}</div>
                )}
                {lengthdata != 0 ? (
                  <ReactPaginate
                    initialPage={currentPage}
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
                ) : null}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CategoryNews
