'use client'
import Link from 'next/link'
import BreadcrumbNav from '../breadcrumb/BreadcrumbNav'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import { placeholderImage, translate, NoDataFound } from '../../utils'
import no_image from '../../../public/assets/images/no_image.jpeg'
import { AllBreakingNewsApi } from 'src/hooks/allBreakingNewsApi'
import { getLanguage } from 'src/utils/api'
import { useQuery } from '@tanstack/react-query'
import Layout from '../layout/Layout'
import Card from '../skeletons/Card'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LoadMoreBtn from '../view/loadMoreBtn/LoadMoreBtn'

const AllBreakingNews = () => {
  let { id: language_id } = getLanguage()
  const currentlanguage = useSelector(selectCurrentLanguage)

  const router = useRouter()

  const dataPerPage = 6;

  const [isLoading, setIsLoading] = useState({
    loading: false,
    loadMoreLoading: false
  })
  const [loadMore, setLoadMore] = useState(false)
  const [breakingNewsData, setBreakingNewsData] = useState([])
  const [offset, setOffset] = useState(0)
  const [totalData, setTotalData] = useState('')
  const [Data, setData] = useState([])

  const handleLoadMore = () => {
    setLoadMore(true)
    setOffset(offset + 1)
  }


  // api call 
  const getBreakingNewsApi = async () => {
    !loadMore ? setIsLoading({ loading: true }) : setIsLoading({ loadMoreLoading: true })
    try {
      const { data } = await AllBreakingNewsApi.getBreakingNews({
        language_id: language_id,
        offset: offset * dataPerPage,
        limit: dataPerPage,
      })
      setTotalData(data.total)
      setIsLoading({ loading: false })
      setIsLoading({ loadMoreLoading: false })
      setData(data?.data)
      return data.data
    } catch (error) {
      console.log(error)
      setBreakingNewsData([])
      setIsLoading({ loading: false })
    }
  }

  // react query
  // const { data: Data } = useQuery({
  //   queryKey: ['all-breaking-news', language_id, currentlanguage, offset],
  //   queryFn: getBreakingNewsApi,
  //   staleTime: 0
  // })
  
  useEffect(() => {
    if(language_id){
      getBreakingNewsApi()
    }
  }, [language_id, currentlanguage, offset])
  



  useEffect(() => {
    if (Data && Data) {
      setBreakingNewsData((prevData) => [...prevData, ...Data]);
    }
  }, [Data])

  useEffect(() => {

  }, [totalData, isLoading])

  return (
    <Layout>
      <BreadcrumbNav SecondElement={translate('breakingNewsLbl')} />
      <div id='BNV-main'>
        <div id='BNV-content' className='container'>
          {isLoading.loading ? (
            <div className='row'>
              {[...Array(3)].map((_, index) => (
                <div className='col-md-4 col-12' key={index}>
                  <Card isLoading={true} />
                </div>
              ))}
            </div>
          ) : (
            <div className='row my-5 commonRowGap'>
              {breakingNewsData && breakingNewsData.length > 0 ? (
                breakingNewsData.map(element => (
                  <div className='col-md-4 col-12' key={element.id}>
                    <Link id='Link-all'
                      href={{ pathname: `/breaking-news/${element.slug}`, query: { language_id: element.language_id } }}
                      // as={`/breaking-news/${element.slug}`}
                      title='detail-page'
                    >
                      <div id='BNV-card' className='card'>
                        <img
                          id='BNV-card-image'
                          src={element.image ? element.image : no_image}
                          className='card-img'
                          alt='breaking news image'
                          onError={placeholderImage}
                        />
                        <div id='BNV-card-body' className='card-body'>
                          <h5 id='BNV-card-title' className='card-title'>
                            {
                              element?.title.length > 120 ?
                              element.title.slice(0, 150) + '...'  :
                              element?.title
                            }
                            {/* {element.title.slice(0, 150)}... */}
                          </h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <>
                  {NoDataFound()}
                </>
              )}
            </div>
          )}
          {totalData > dataPerPage && totalData !== breakingNewsData.length ? (
            <LoadMoreBtn handleLoadMore={handleLoadMore} loadMoreLoading={isLoading.loadMoreLoading} />
          ) : null}
        </div>
      </div>
    </Layout>
  )
}

export default AllBreakingNews
