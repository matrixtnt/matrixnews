'use client'
import React, { useEffect, useState } from 'react'
import SwitchButton from 'bootstrap-switch-button-react'
import { categoriesApi, getuserbyidApi, setusercategoriesApi } from '../../store/actions/campaign'
import { translate } from '../../utils'
import ReactPaginate from 'react-paginate'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import toast from 'react-hot-toast'
import Layout from '../layout/Layout'
import Card from '../skeletons/Card'

const UserBasedCategories = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [finalToggleID, setFinalToggleID] = useState('')
  const [totalLength, setTotalLength] = useState(0)
  const [offsetdata, setOffsetdata] = useState(0)
  const limit = 6
  const currentLanguage = useSelector(selectCurrentLanguage)
  // get user by id
  useEffect(() => {
    getuserbyidApi({
      onSuccess:response => {
        const useridData = response.data
        // user categories
        const alluserIds = useridData.user_category.map(category => category.category_id);
        // common id get
        const CommanID = []
        for (let i = 0; i < alluserIds.length; i++) {
          const values = alluserIds[i].split(',')
          for (let j = 0; j < values.length; j++) {
            CommanID.push(values[j])
          }
        }

        // category api call
        categoriesApi({
          offset:offsetdata.toString(),
          limit:limit.toString(),
          language_id:currentLanguage.id,
          onSuccess:response => {
            setTotalLength(response.total)
            const toggledData = response.data.map(element => {
              // here set isToggleOn has boolean with actual data
              const isToggledOn = CommanID.includes(element.id.toString())
              return { ...element, isToggledOn }
            })
            setData(toggledData)
            setLoading(false)
          },
          onError:error => {
            if (error === 'No Data Found') {
              setData('')
              setLoading(false)
            }
          }
        }
        )
      },
      onError:error => {
        console.error(error)
      }
    }
    )
  }, [offsetdata, currentLanguage])

  // handle switch
  const handleSwitchChange = id => {
    setData(prevData => {
      // return those toggle is true
      const newData = prevData.map(element => {
        if (element.id === id) {
          return { ...element, isToggledOn: !element.isToggledOn }
        }
        return element
      })
      const toggledIds = newData.filter(element => element.isToggledOn).map(element => element.id)

      const finalToggleID = toggledIds.length === 0 ? 0 : toggledIds.join(',')

      setFinalToggleID(finalToggleID)
      return newData
    })
  }

  // here final submit button
  const finalSubmit = e => {
    e.preventDefault()
    setusercategoriesApi({
      category_id:finalToggleID,
      onSuccess:response => {
        toast.success(response.message)
      },
      onError:error => {
        toast.error(error)
      }
    }
    )
  }

  const handlePageChange = selectedPage => {
    const newOffset = selectedPage.selected * limit
    setOffsetdata(newOffset)
  }

  // button style
  const switchButtonStyle = {
    width: '100%',
    marginLeft: '3rem',
    marginRight: '3rem'
  }

  return (
    <Layout>
      <section className='manage_preferences py-5'>
        <div className='container'>
          {loading ? (
            <div className='row'>
              {[...Array(3)].map((_, index) => (
                <div className='col-md-4 col-12' key={index}>
                  <Card isLoading={true} />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className='row'>
                {data && data.length > 0
                  ? data.map((element, index) => (
                      <div className='col-md-4 col-12' key={index}>
                        <div className='manage_card'>
                          <div className='inner_manage'>
                            <div className='manage_image'>
                              <img src={element.image} alt={element.category_name} />
                            </div>
                            <div className='manage_title'>
                              <p className='mb-0'>{element.category_name}</p>
                            </div>
                            <div className='manage_toggle'>
                              <SwitchButton
                                checked={element.isToggledOn}
                                onlabel='ON'
                                onstyle='success'
                                offlabel='OFF'
                                offstyle='danger'
                                style={switchButtonStyle}
                                onChange={() => handleSwitchChange(element.id)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
              <button className='finalsumit_btn mb-5' onClick={e => finalSubmit(e)}>
                {translate('saveLbl')}
              </button>
            </>
          )}
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
      </section>
    </Layout>
  )
}

export default UserBasedCategories
