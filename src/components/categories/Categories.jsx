'use client'
import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { IoArrowForwardCircleSharp } from 'react-icons/io5'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import { useSelector } from 'react-redux'
import BreadcrumbNav from '../breadcrumb/BreadcrumbNav'
import Link from 'next/link'
import { settingsData } from '../../store/reducers/settingsReducer'
import { translate } from '../../utils'
import { CategoriesApi } from 'src/hooks/categoriesApi'
import { access_key } from 'src/utils/api'
import { useQuery } from '@tanstack/react-query'

const Categories = () => {
  const currentLanguage = useSelector(selectCurrentLanguage)
  const categoiresOnOff = useSelector(settingsData)
  const [totalLength, setTotalLength] = useState(0)
  const [offsetdata, setOffsetdata] = useState(0)
  const limit = 12

  const handlePageChange = selectedPage => {
    const newOffset = selectedPage.selected * limit
    setOffsetdata(newOffset)
  }

  // api call
  const categoriesApi = async () => {
    try {
      const { data } = await CategoriesApi.getCategories({
        access_key,
        offset: offsetdata.toString(),
        limit: limit.toString(),
        language_id: currentLanguage.id
      })
      setTotalLength(data.total)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  // react query
  const { data } = useQuery({
    queryKey: ['categories', access_key, offsetdata.toString(), limit.toString(), currentLanguage.id],
    queryFn: categoriesApi
  })


  return (
    <>
      <BreadcrumbNav SecondElement='Categories' ThirdElement='0' />
      {categoiresOnOff && categoiresOnOff.category_mode === '1' ? (
        <div className='container my-5'>
          <div className='row'>
            {data &&
              data.map(element => (
                <div className='col-md-4 col-12 mb-4'>
                  <Link id='cat-section-card' key={element.id} className='card' href={`/categories-news/${element.id}`}>
                    <img id='cat-section-card-image' src={element.image} className='card-img' alt='...' />
                    <div id='cat-section-card-body' className='card-img-overlay'>
                      <h5 id='cat-card-text' className='card-text mb-0'>
                        {element.category_name}
                      </h5>
                      <button id='btn-cat-more' className='btn' type='button'>
                        <IoArrowForwardCircleSharp size={40} />
                      </button>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
          <ReactPaginate
            previousLabel={translate('previous')}
            nextLabel={translate('next')}
            breakLabel='...'
            breakClassName='break-me'
            pageCount={Math.ceil(totalLength / limit)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            previousLinkClassName={'pagination__link'}
            nextLinkClassName={'pagination__link'}
            disabledClassName={'pagination__link--disabled'}
            activeClassName={'pagination__link--active'}
          />
        </div>
      ) : (
        <>
          <div className='text-center my-5'>{translate('disabledCategory')}</div>
        </>
      )}
    </>
  )
}

export default Categories
