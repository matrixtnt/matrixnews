'use client'
import React, { useState } from 'react'
import { deleteNewsApi } from '../../store/actions/campaign'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/reducers/userReducer'
import BreadcrumbNav from '../breadcrumb/BreadcrumbNav'
import { translate } from '../../utils'
import Skeleton from 'react-loading-skeleton'
import { useRouter } from 'next/navigation'
import { loadManageToEdit } from '../../store/reducers/createNewsReducer'
import { toast } from 'react-toastify'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import { getNewsApi } from 'src/hooks/newsApi'
import { useQuery } from '@tanstack/react-query'
import { access_key, getLanguage, getUser } from 'src/utils/api'

const ManageNews = () => {
  const navigate = useRouter()
  const userData = useSelector(selectUser)
  const [Data, setData] = useState([])
  const currentLanguage = useSelector(selectCurrentLanguage)
  let { id: language_id } = getLanguage()
  let user = getUser()

  // api call
  const getNews = async () => {
    try {
      const { data } = await getNewsApi.getNews({
        access_key: access_key,
        offset: '',
        limit: '',
        user_id: user,
        get_user_news: userData.data.id,
        search: '', // {optional}
        language_id: language_id,
        latitude: null,
        longitude: null
      })
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  // react query
  const { isLoading, isError, data, error, status } = useQuery({
    queryKey: ['getnews', currentLanguage],
    queryFn: getNews
  })

  if (isLoading) {
    return (
      <div>
        <Skeleton height={200} count={3} />
      </div>
    )
  }

  if (status === 'error') {
    return <div className='text-center my-5'>{translate('nodatafound')}</div>
  }

  // type return
  const typeReturn = type => {
    if (type === 'video_upload') {
      return translate('videoUploadLbl')
    } else if (type === 'standard_post') {
      return translate('stdPostLbl')
    } else if (type === 'video_youtube') {
      return translate('videoYoutubeLbl')
    } else if (type === 'video_other') {
      return translate('videoOtherUrlLbl')
    }
  }

  const editNews = data => {
    loadManageToEdit(data)
    navigate.push(`/edit-news`)
  }

  const deleteNews = data => {
    deleteNewsApi(
      data.id,
      res => {
        toast.success(res.message)
        const updatedData = Data.filter(item => item.id !== data.id)
        setData(updatedData)
      },
      err => {
        toast.error(err.message)
      }
    )
  }

  return (
    <>
      <BreadcrumbNav SecondElement={translate('manageNewsLbl')} ThirdElement='0' />

      <div className='manage_news bg-white py-5'>
        <div className='container'>
          <div className='row'>
            {data &&
              data.map((element, id) => (
                <div className=' col-xl-4 col-md-6 col-12' key={id}>
                  <div className='manage-data'>
                    <div className='manage-card'>
                      <div className='manage-img'>
                        <img src={element.image} alt='' onClick={() => navigate.push(`/news/${element.id}`)} />
                      </div>
                      <div className='manage-title'>
                        <p onClick={() => navigate.push(`/news/${element.id}`)}>{element.category_name}</p>
                      </div>
                      <div className='manage-date'>
                        <p>
                          {new Date(element.date).toLocaleTimeString([], {
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            hour12: true
                          })}
                        </p>
                      </div>
                    </div>
                    <div className='manage-right'>
                      <div className='manage-title'>
                        <p className='mb-0' onClick={() => navigate.push(`/news/${element.id}`)}>
                          {element.title}
                        </p>
                      </div>
                      <div className='manage_type'>
                        <p className='mb-1'>
                          {translate('contentTypeLbl')} : <span>{typeReturn(element.content_type)}</span>
                        </p>
                      </div>
                      <div className='manage-tag'>
                        {element?.tag_name?.includes(',') ? (
                          element?.tag_name?.split(',').map((tagName, index) => (
                            <p key={index} onClick={() => navigate.push(`/tag/${element.tag_id}`)}>
                              {tagName}
                            </p>
                          ))
                        ) : (
                          <p onClick={() => navigate.push(`/tag/${element.tag_id}`)}>{element.tag_name}</p>
                        )}
                      </div>
                      <div className='manage-buttons'>
                        <div className='manage-button-edit'>
                          <button className='btn btn-dark' onClick={e => editNews(element)}>
                            {translate('editLbl')}
                          </button>
                        </div>
                        <div className='manage-button-delete'>
                          <button className='btn btn-dark' onClick={e => deleteNews(element)}>
                            {translate('deleteTxt')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageNews
