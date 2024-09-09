'use client'
import BreadcrumbNav from '../../breadcrumb/BreadcrumbNav'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../../store/reducers/languageReducer'
import { NoDataFound, translate } from '../../../utils'
import { useRouter } from 'next/router.js'
import { getLanguage } from 'src/utils/api'
import { useQuery } from '@tanstack/react-query'
import Layout from 'src/components/layout/Layout'
import Card from 'src/components/skeletons/Card'
import { locationData, settingsData } from 'src/store/reducers/settingsReducer'
import { getNewsApi } from 'src/hooks/newsApi'
import { useEffect, useState } from 'react'
import LoadMoreBtn from 'src/components/view/loadMoreBtn/LoadMoreBtn'
import NewsCard from 'src/components/view/NewsCard'
import Meta from 'src/components/seo/Meta'

const CategoryNews = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const dataPerPage = 8 // number of posts per page
  const router = useRouter()
  const query = router.query
  const catId = query.category_slug
  const catSlug = query.slug
  const slug = query.slug
  let { id: language_id } = getLanguage()
  const changelanguage = useSelector(selectCurrentLanguage)
  const location = useSelector(locationData)
  const storedLatitude = location && location.lat
  const storedLongitude = location && location.long



  const [isLoading, setIsLoading] = useState({
    loading: false,
    loadMoreLoading: false
  })
  const [loadMore, setLoadMore] = useState(false)
  const [categoriesNewsData, setCategoriesNewsData] = useState([])
  const [offset, setOffset] = useState(0)
  const [totalData, setTotalData] = useState('')

  const handleLoadMore = () => {
    setLoadMore(true)
    setOffset(offset + 1)
  }

  // handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
  }
  // console.log(language_id)
  // api call
  const getNewsByCategoryApi = async () => {

    if (location || currentPage || catSlug) {

      !loadMore ? setIsLoading({ loading: true }) : setIsLoading({ loadMoreLoading: true })
      try {
        const { data } = await getNewsApi.getNews({
          offset: offset * dataPerPage,
          limit: dataPerPage,
          language_id: language_id,
          category_slug: catSlug,
          latitude: storedLatitude,
          longitude: storedLongitude
        })
        // console.log('categories', data)
        data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTotalData(data.total)
        setIsLoading({ loading: false })
        setIsLoading({ loadMoreLoading: false })
        return data
      } catch (error) {
        console.log(error)
        setCategoriesNewsData([])
        setIsLoading({ loading: false })
      }
    }
  }


  // react query
  const { data: Data } = useQuery({
    queryKey: ['category-news', language_id, location, catSlug, offset],
    queryFn: () => getNewsByCategoryApi()
  })


  useEffect(() => {
    if (Data && Data.data) {
      loadMore ? setCategoriesNewsData((prevData) => [...prevData, ...Data.data]) :
        setCategoriesNewsData(Data.data);
    }
  }, [Data])

  useEffect(() => {

  }, [totalData, isLoading])

  // slice the array to get the current posts
  const currentData = Data && Data.data && Data.data.slice(0, dataPerPage)
  const CurrentCategoryName = Data && Data.data && Data.data[0]?.category?.category_name
  const lengthdata = (Data && Data.total) || 0



  const settings = useSelector(settingsData)

  const webName = settings?.web_setting?.web_name

  return (
    <>

      <Meta title={`${webName} | ${translate('categoryLbl')} | ${catSlug}`} description='' keywords='' ogImage='' pathName='' schema='' />
      <Layout>
        <section className='categoryview_Section'>
          {
            CurrentCategoryName &&
            <BreadcrumbNav SecondElement={'category'} ThirdElement={CurrentCategoryName && CurrentCategoryName} link="/all-categories" />
          }
          <div id='cv-main' className='bg-white py-3'>
            <div id='cv-content' className='my-5 container'>
              {isLoading.loading ? (
                <div className='row'>
                  {[...Array(4)].map((_, index) => (
                    <div className='col-lg-3 col-sm-6 col-md-4 col-12' key={index}>
                      <Card isLoading={true} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className='row commonRowGap'>
                  {categoriesNewsData && categoriesNewsData?.length > 0 ? (
                    categoriesNewsData.map(element => (
                      <div className='col-lg-3 col-sm-6 col-md-4 col-12 ' key={element.id}>
                        <NewsCard element={element} />
                      </div>
                    ))
                  ) : (
                    <>
                      {NoDataFound()}

                    </>
                  )}
                  {totalData > dataPerPage && totalData !== categoriesNewsData.length ? (
                    <LoadMoreBtn handleLoadMore={handleLoadMore} loadMoreLoading={isLoading.loadMoreLoading} />
                  ) : null}


                </div>
              )}
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default CategoryNews
