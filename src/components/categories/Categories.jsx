'use client'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { IoArrowForwardCircleSharp } from 'react-icons/io5'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import { useSelector } from 'react-redux'
import BreadcrumbNav from '../breadcrumb/BreadcrumbNav'
import Link from 'next/link'
import { settingsData } from '../../store/reducers/settingsReducer'
import { NoDataFound, placeholderImage, translate } from '../../utils'
import { CategoriesApi } from 'src/hooks/categoriesApi'
import { useQuery } from '@tanstack/react-query'
import Layout from '../layout/Layout'
import LoadMoreBtn from '../view/loadMoreBtn/LoadMoreBtn'
import AllCategorySkeleton from '../skeletons/AllCategorySkeleton'

const Categories = () => {


  const dataPerPage = 9
  const currentLanguage = useSelector(selectCurrentLanguage)


  const categoiresOnOff = useSelector(settingsData)

  const [isLoading, setIsLoading] = useState({
    loading: false,
    loadMoreLoading: false
  })
  const [loadMore, setLoadMore] = useState(false)
  const [categories, setCategories] = useState([])
  const [offset, setOffset] = useState(0)
  const [totalData, setTotalData] = useState('')

  const handleLoadMore = () => {
    setLoadMore(true)
    setOffset(offset + 1)
  }

  // api call
  const categoriesApi = async () => {
    !loadMore ? setIsLoading({ loading: true }) : setIsLoading({ loadMoreLoading: true })
    try {
      const { data } = await CategoriesApi.getCategories({
        offset: offset * dataPerPage,
        limit: dataPerPage,
        language_id: currentLanguage.id
      })
      setTotalData(data.total)
      setIsLoading({ loading: false })
      setIsLoading({ loadMoreLoading: false })
      return data
    } catch (error) {
      console.log(error)
      setCategories([])
      setIsLoading({ loading: false })
    }
  }


  // react query
  const { data: Data } = useQuery({
    queryKey: ['categories', currentLanguage.id, offset],
    queryFn: () => categoriesApi(),
    staleTime: 0
  })

  useEffect(() => {
    if (Data && Data.data) {
      setCategories((prevData) => [...prevData, ...Data.data]);
    }
  }, [Data])

  useEffect(() => {

  }, [totalData, isLoading])


  // slice the array to get the current posts
  const currentData = Data && Data.data && Data.data.slice(0, dataPerPage)

  const lengthdata = (Data && Data.total) || 0

  return (
    <Layout>
      <BreadcrumbNav SecondElement='Categories' />
      {categoiresOnOff && categoiresOnOff.category_mode === '1' ? (
        <div className='container my-5'>
          {isLoading.loading ? (
            <div className='row'>
              {[...Array(6)].map((_, index) => (
                <div className='col-md-4 col-12' key={index}>
                  {/* <Card isLoading={true} /> */}
                  <AllCategorySkeleton />
                </div>
              ))}
            </div>
          ) : (
            <div className='row'>
              {categories && categories?.length > 0 ? (
                categories.map(element => (
                  <div className='col-md-4 col-12 mb-4'>
                    <Link
                      id='cat-section-card'
                      key={element.id}
                      className='card'
                      href={{
                        pathname: `/categories-news/${element.slug}`,
                        // query: {
                        //   category_slug: element.slug
                        // }
                      }}
                      title='category-news'
                    >
                      <img
                        id='cat-section-card-image'
                        src={element.image}
                        className='categories card news image'
                        alt={element.category_name}
                        onError={placeholderImage}
                      />
                      <div id='cat-section-card-body' className='card-img-overlay'>
                        <h5 id='cat-card-text' className='categoryTag'>
                          {element.category_name}
                        </h5>
                        <button id='btn-cat-more' className='btn' type='button'>
                          <IoArrowForwardCircleSharp size={40} />
                        </button>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <>
                  {NoDataFound()}
                </>
              )}
              {totalData > dataPerPage && totalData !== categories.length ? (
                <LoadMoreBtn handleLoadMore={handleLoadMore} loadMoreLoading={isLoading.loadMoreLoading} />
              ) : null}
            </div>
          )}
        </div>
      ) : (
        <>
          {NoDataFound()}

        </>
      )}
    </Layout>
  )
}

export default Categories
