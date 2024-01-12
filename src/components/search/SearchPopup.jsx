'use client'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { SetSearchPopUp } from '../../store/stateSlice/clickActionSlice'
import { store } from '../../store/store'
import { useRouter } from 'next/navigation'
import { AiOutlineClose } from 'react-icons/ai'
import { truncateText } from '../../utils'
import { getNewsApi } from 'src/hooks/newsApi'
import { access_key, getLanguage, getUser } from 'src/utils/api'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { locationData } from 'src/store/reducers/settingsReducer'

const SearchPopup = () => {
  const [Data, setData] = useState([])
  const [total, setTotal] = useState(null)
  const [dataLimit, setDataLimit] = useState(5) // Initial data limit
  const searchPopUp = useSelector(state => state.clickAction.searchPopUp)
  let { id: language_id } = getLanguage()
  let user = getUser()
  const [searchValue, setSearchValue] = useState('')
  const location = useSelector(locationData)
  const storedLatitude = location && location.lat
  const storedLongitude = location && location.long
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

  // api call
  const getNews = async () => {
    try {
      const { data } = await getNewsApi.getNews({
        access_key: access_key,
        offset: '0',
        limit: dataLimit.toString(),
        user_id: user,
        get_user_news: '',
        search: searchValue, // {optional}
        language_id: language_id,
        latitude: storedLatitude,
        longitude: storedLongitude
      })

      // Check if the total count of loaded data exceeds the total count from the API
      const totalItemsFromAPI = parseInt(data.total) // Assuming 'total' is the total count from API response
      const loadedItemsCount = data.length + parseInt(dataLimit)

      if (data.error) {
        setData([])
        setTotal(0)
      }

      if (loadedItemsCount > totalItemsFromAPI) {
        // If loaded items exceed the total count, set Data to empty array
        setData([])
      } else {
        if (searchValue !== '') {
          setTotal(data.total)
          setData(data)
        } else {
          setData([])
        }
      }
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  // react query
  const { refetch } = useQuery({
    queryKey: ['getSearchNews', searchValue,location],
    queryFn: getNews,
    staleTime: 0
  })

  // redirect news page
  const redirectPage = (e, element) => {
    actionSearch()
    e.preventDefault()
    navigate.push({
      pathname: `/news/${element.slug}`,
      query: { language_id: element.language_id }
    })
    setSearchValue('')
  }

  const handleLoadMore = () => {
    setDataLimit(prevLimit => prevLimit + 5) // Increment data limit by 5
  }

  // UseEffect to call getNews whenever dataLimit changes
  useEffect(() => {
    refetch()
  }, [dataLimit])

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
          <div
            id='ts-main'
            className='search_bar'
            style={{
              height: total < 3 || (Data && Data?.error === 'true') || searchValue === '' ? 'auto' : '500px',
              overflowY:
                total < 3 || (Data && total > 3 && Data?.error === 'true') || searchValue === '' ? 'visible' : 'scroll'
            }}
          >
            <div id='ts-content' className=''>
              <div className='row mx-auto'>
                {searchValue !== '' &&
                  Data &&
                  Data.data?.length > 0 &&
                  Data.data.map(element => (
                    <div className='col-12 px-0' key={element.id}>
                      <div id='Link-all' onClick={e => redirectPage(e, element)}>
                        <div id='ts-card' className='card'>
                          <img id='ts-card-image' src={element.image} className='card-img' alt={element.title} />
                          <div id='ts-card-body' className='card-body'>
                            <h5 id='ts-card-title' className='card-title'>
                              {truncateText(element.title, 150)}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                {searchValue !== '' && Data?.data?.length > 0 && (
                  <div
                    className='load-more-btn text-center'
                    style={{
                      padding: total < 3 || (Data && Data?.error === 'true') || searchValue === '' ? '0px' : '15px'
                    }}
                  >
                    {Data && Data?.data.length < parseInt(total) && <button onClick={handleLoadMore}>Load More</button>}
                  </div>
                )}
                {Data && Data?.error === 'true' && <p className='text-dark bg-white p-4 text-center'>No data found</p>}
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
