'use client'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { SetSearchPopUp } from '../../store/stateSlice/clickActionSlice'
import { store } from '../../store/store'
import { useRouter } from 'next/navigation'
import { AiOutlineClose } from 'react-icons/ai'
import { translate, truncateText } from '../../utils'
import { getNewsApi } from 'src/hooks/newsApi'
import { access_key, getLanguage, getUser } from 'src/utils/api'
import { useQuery } from '@tanstack/react-query'

const SearchPopup = () => {
  const [Data, setData] = useState([])
  const searchPopUp = useSelector(state => state.clickAction.searchPopUp)
  let { id: language_id } = getLanguage()
  let user = getUser()
  const [searchValue, setSearchValue] = useState('')

  const navigate = useRouter()

  // popup
  const actionSearch = () => {
    store.dispatch(SetSearchPopUp(!searchPopUp))
    setSearchValue('')
  }

  // input value
  const handleInputChange = event => {
    setSearchValue(event.target.value)
  }

  const storedLatitude = localStorage.getItem('latitude')
  const storedLongitude = localStorage.getItem('longitude')

  // api call
  const getNews = async () => {
    try {
      const { data } = await getNewsApi.getNews({
        access_key: access_key,
        offset: '0',
        limit: '5',
        user_id: user,
        get_user_news: '',
        search: searchValue, // {optional}
        language_id: language_id,
        latitude: storedLatitude && storedLatitude ? storedLatitude : null,
        longitude: storedLongitude && storedLongitude ? storedLongitude : null
      })
      if (searchValue !== '') {
        setData(data.data)
      } else {
        setData([])
      }
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  // react query
  const {} = useQuery({
    queryKey: ['getSearchNews', searchValue],
    queryFn: getNews,
    staleTime: 0
  })

  // redirect news page
  const redirectPage = (e, element) => {
    actionSearch()
    e.preventDefault()
    navigate.push(`/news/${element.id}`)
    setSearchValue('')
  }

  return (
    <>
      <div
        className={searchPopUp ? 'body-overlay active' : 'body-overlay'}
        id='body-overlay'
        onClick={actionSearch}
      ></div>
      <div className={searchPopUp ? 'td-search-popup active' : 'td-search-popup'} id='td-search-popup'>
        <div className='search-form'>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Search.....'
              value={searchValue}
              onChange={handleInputChange}
            />
          </div>
          <button type='submit' className='submit-btn' onClick={() => setSearchValue('')}>
            <AiOutlineClose />
          </button>
          <div id='ts-main' className='search_bar'>
            <div id='ts-content' className=''>
              <div className='row mx-auto'>
                {searchValue !== '' &&
                  Data &&
                  Data.length > 0 &&
                  Data.map(element => (
                    <div className='col-12' key={element.id}>
                      <div id='Link-all' onClick={e => redirectPage(e, element)}>
                        <div id='ts-card' className='card'>
                          <img id='ts-card-image' src={element.image} className='card-img' alt='...' />
                          <div id='ts-card-body' className='card-body'>
                            <h5 id='ts-card-title' className='card-title'>
                              {truncateText(element.title, 150)}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                {searchValue !== '' && Data && Data.length === 0 && (
                  <p className='text-dark bg-white p-4 text-center'>{translate('nodatafound')}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* search popup end*/}
    </>
  )
}

export default SearchPopup
