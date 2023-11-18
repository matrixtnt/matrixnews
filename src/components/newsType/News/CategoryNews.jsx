'use client'

import { FiCalendar } from 'react-icons/fi'
import Link from 'next/link'
import BreadcrumbNav from '../../breadcrumb/BreadcrumbNav'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../../store/reducers/languageReducer'
import Skeleton from 'react-loading-skeleton'
import { translate } from '../../../utils'
import { useRouter } from 'next/router.js'
import { access_key, getLanguage, getUser } from 'src/utils/api'
import { useQuery } from '@tanstack/react-query'
import { CategoriesApi } from 'src/hooks/categoriesApi'
import Layout from 'src/components/layout/Layout'

const CategoryNews = () => {
  const router = useRouter()
  const query = router.query
  const catId = query.slug
  const storedLatitude = localStorage.getItem('latitude')
  const storedLongitude = localStorage.getItem('longitude')
  let user = getUser()
  let { id: language_id } = getLanguage()
  useSelector(selectCurrentLanguage)

  // api call
  const getNewsByCategoryApi = async () => {
    try {
      const { data } = await CategoriesApi.getNewsByCategory({
        access_key: access_key,
        category_id: catId,
        subcategory_id: '',
        offset: '0',
        limit: '10',
        user_id: user,
        language_id: language_id,
        latitude: storedLatitude ? storedLatitude : null,
        longitude: storedLongitude ? storedLongitude : null
      })
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  // react query
  const { isLoading, data: Data } = useQuery({
    queryKey: ['category-news', catId],
    queryFn: getNewsByCategoryApi
  })

  return (
    <Layout>
      <section className='categoryview_Section'>
        <BreadcrumbNav SecondElement={'category' ? 'category' : ''} ThirdElement='0' />
        <div id='cv-main' className='bg-white py-5'>
          <div id='cv-content' className='my-5 container'>
            {isLoading ? (
              <div>
                <Skeleton height={200} count={3} />
              </div>
            ) : (
              <div className='row'>
                {Data && Data.length > 0 ? (
                  Data.map(element => (
                    <div className='col-lg-3 col-md-4 col-12 ' key={element.id}>
                      <Link id='Link-all' href={`/news/${element.id}`}>
                        <div id='cv-card' className='card'>
                          <img id='cv-card-image' src={element.image} className='card-img' alt='...' />
                          <div id='cv-card-body' className='card-body'>
                            <button id='cv-btnCatagory' className='btn btn-sm' type='button'>
                              {element.category_name}
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
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CategoryNews
