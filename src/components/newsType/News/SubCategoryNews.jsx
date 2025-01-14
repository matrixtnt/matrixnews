'use client'
import BreadcrumbNav from '../../breadcrumb/BreadcrumbNav'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../../store/reducers/languageReducer'
import { NoDataFound } from '../../../utils'
import { useRouter } from 'next/router.js'
import { getLanguage } from 'src/utils/api'
import { useQuery } from '@tanstack/react-query'
import Layout from 'src/components/layout/Layout'
import Card from 'src/components/skeletons/Card'
import { locationData } from 'src/store/reducers/settingsReducer'
import { getNewsApi } from 'src/hooks/newsApi'
import { useEffect, useState } from 'react'
import LoadMoreBtn from 'src/components/view/loadMoreBtn/LoadMoreBtn'
import NewsCard from 'src/components/view/NewsCard'

const SubCategory = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const dataPerPage = 8 // number of posts per page
  const router = useRouter()
  const query = router.query
  // console.log(query,'query')
  const catId = query.category_id
  const subCatSlug = query.slug
  // console.log('subCatSlug',subCatSlug)
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
  const [subCategories, setSubCategories] = useState([])
  const [offset, setOffset] = useState(0)
  const [totalData, setTotalData] = useState('')

  const handleLoadMore = () => {
    setLoadMore(true)
    setOffset(offset + 1)
  }

  // api call
  const getNewsByCategoryApi = async () => {
    !loadMore ? setIsLoading({ loading: true }) : setIsLoading({ loadMoreLoading: true })
    try {
      const { data } = await getNewsApi.getNews({
        offset: offset * dataPerPage,
        limit: dataPerPage,
        category_id: catId,
        language_id: language_id,
        subcategory_slug: subCatSlug,
        latitude: storedLatitude,
        longitude: storedLongitude
      })
      // console.log('categories', data)
      setTotalData(data.total)
      setIsLoading({ loading: false })
      setIsLoading({ loadMoreLoading: false })
      return data
    } catch (error) {
      console.log(error)
      setSubCategories([])
      setIsLoading({ loading: false })
    }
  }

  // react query
  const { data: Data } = useQuery({
    queryKey: ['sub-category-news', catId, changelanguage, location, offset, query, subCatSlug],
    queryFn: () => getNewsByCategoryApi(),
    staleTime: 0
  })

  // slice the array to get the current posts
  const currentData = Data && Data.data && Data.data.slice(0, dataPerPage)

  const lengthdata = (Data && Data.total) || 0

  useEffect(() => {
    if (Data && Data.data) {
      loadMore ? setSubCategories((prevData) => [...prevData, ...Data.data]) :
        setSubCategories(Data.data);
    }
  }, [Data])

  useEffect(() => {

  }, [totalData, isLoading])


  useEffect(() => {
    setLoadMore(false)
    setOffset(0)
  }, [query])

  return (
    <Layout>
      <section className='categoryview_Section'>
        {
          subCatSlug &&
          <BreadcrumbNav SecondElement={'category'} ThirdElement={'Sub-Category'} FourthElement={subCatSlug} />
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
                {subCategories && subCategories.length > 0 ? (
                  subCategories.map(element => (
                    <div className='col-lg-3 col-sm-6 col-md-4 col-12 ' key={element.id}>
                      <NewsCard element={element} />
                    </div>
                  ))
                ) : (
                  <>
                    {NoDataFound()}

                  </>
                )}
                {totalData > dataPerPage && totalData !== subCategories.length ? (
                  <LoadMoreBtn handleLoadMore={handleLoadMore} loadMoreLoading={isLoading.loadMoreLoading} />
                ) : null}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}



export default SubCategory
