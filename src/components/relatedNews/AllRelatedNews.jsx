'use client'
import { getLanguage } from 'src/utils/api'
import { useQuery } from '@tanstack/react-query'
import { locationData } from 'src/store/reducers/settingsReducer'
import { useSelector } from 'react-redux'
import { getNewsApi } from 'src/hooks/newsApi'
import Layout from '../layout/Layout'
import { useEffect, useState } from 'react'
import Card from '../skeletons/Card'
import LoadMoreBtn from '../view/loadMoreBtn/LoadMoreBtn'
import NewsCard from '../view/NewsCard'
import BreadcrumbNav from '../breadcrumb/BreadcrumbNav.jsx';
import { useRouter } from 'next/router'

const AllRelatedNews = () => {

  const router = useRouter()
  const catSlug = router.query.slug;
  let { id: language_id } = getLanguage()
  const location = useSelector(locationData)
  const storedLatitude = location && location.lat
  const storedLongitude = location && location.long

  const dataPerPage = 9
  const [isLoading, setIsLoading] = useState({
    loading: false,
    loadMoreLoading: false
  })
  const [loadMore, setLoadMore] = useState(false)
  const [viewAllData, setViewAllData] = useState([])
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
        category_slug: catSlug,
        language_id: language_id,
        latitude: storedLatitude,
        longitude: storedLongitude
      })

      setTotalData(data.total)
      setIsLoading({ loading: false })
      setIsLoading({ loadMoreLoading: false })
      // Filter out elements with the same id as props.Cid
      // const filteredData = data.data.filter(element => element.slug !== props.Nid)
      const filteredData = data.data;
      filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
      return filteredData
    } catch (error) {
      setViewAllData([])
      setIsLoading({ loading: false })
    }
  }

  // react query
  const { data: Data } = useQuery({
    queryKey: ['realated-news-section', catSlug, location, offset],
    queryFn: getNewsByCategoryApi
  })

  useEffect(() => {
    if (Data) {
      setViewAllData((prevData) => [...prevData, ...Data]);
    }
  }, [Data])

  useEffect(() => {

  }, [totalData, isLoading])

  return (
    <Layout>
      <>
        <BreadcrumbNav SecondElement={'Related News'} ThirdElement={catSlug} />
        <div id='BNV-main' className='mb-5'>
          <div id='BNV-content' className='container'>
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
                {viewAllData && viewAllData ? (
                  viewAllData && viewAllData.map(element => (
                    <div className='col-md-4 col-lg-3 col-sm-6 col-12' key={element.id}>
                      <NewsCard element={element} />
                    </div>
                  ))
                ) : (
                  <>
                    {NoDataFound()}

                  </>
                )}
              </div>
            )}
            {totalData > dataPerPage && totalData !== viewAllData?.length ? (
              <LoadMoreBtn handleLoadMore={handleLoadMore} loadMoreLoading={isLoading.loadMoreLoading} />
            ) : null}
          </div>
        </div>
      </>
    </Layout>
  )
}

export default AllRelatedNews
