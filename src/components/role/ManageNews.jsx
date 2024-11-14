'use client'
import React, { useEffect, useState } from 'react'
import { deleteNewsApi } from '../../store/actions/campaign'
import { useSelector } from 'react-redux'
import BreadcrumbNav from '../breadcrumb/BreadcrumbNav'
import { placeholderImage, translate } from '../../utils'
import Skeleton from 'react-loading-skeleton'
import { useRouter } from 'next/navigation'
import { loadManageToEdit } from '../../store/reducers/createNewsReducer'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import { getNewsApi } from 'src/hooks/newsApi'
import { useQuery } from '@tanstack/react-query'
import { getLanguage } from 'src/utils/api'
import toast from 'react-hot-toast'
import Layout from '../layout/Layout'
import { Modal } from 'antd';
import NoDataFound from '../noDataFound/NoDataFound'
import Link from 'next/link'
import Card from '../skeletons/Card'
import Image from 'next/image'

import { PiProhibitInsetFill } from "react-icons/pi";

const { confirm } = Modal;

const ManageNews = () => {
  const navigate = useRouter()
  const [Data, setData] = useState([])
  const currentLanguage = useSelector(selectCurrentLanguage)
  let { id: language_id } = getLanguage()

  // api call
  const getNews = async () => {
    try {
      const { data } = await getNewsApi.getNews({
        get_user_news: 1,
        // language_id: language_id,
        latitude: null,
        longitude: null
      })
      setData(data.data)
      // console.log('manage-news :',data)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  // react query
  const { isLoading, isError, data, error, status } = useQuery({
    queryKey: ['getnews', currentLanguage],
    staleTime: 0,
    queryFn: getNews,

  })


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
    confirm({
      title: 'Do you want to delete these news?',
      centered: true,
      async onOk() {
        try {
          await new Promise((resolve, reject) => {
            deleteNewsApi({
              news_id: data.id,
              onSuccess: res => {
                toast.success('News deleted Successfully')
                const updatedData = Data.filter(item => item.id !== data.id)
                setData(updatedData)
              },
              onError: err => {
                toast.error(err.message)
              }
            })
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          });
        } catch (e) {
          console.log('Oops errors!');
        }
      },
      onCancel() { },
    });

  }

  return (
    <Layout>
      <BreadcrumbNav SecondElement={translate('manageNewsLbl')} />

      <div className='manage_news bg-white py-5'>
        <div className='container'>
          <div className='row'>
            {isLoading ? (
              <div className='row'>
                {[...Array(3)].map((_, index) => (
                  <div className='col-xl-4 col-md-6 col-12' key={index}>
                    <Card />
                  </div>
                ))}
              </div>
            ) : (
              <>
                {Data && Data.length > 0 ? (
                  Data.map((element, id) => (
                    <div className=' col-xl-4 col-md-6 col-12' key={id}>
                      <div className='manageNewsCard'>
                        <div className='upperDiv'>
                          <div className='imgCateWrapper'>
                            <img
                              src={element.image}
                              alt='manage news'
                              onError={placeholderImage}
                            />
                            <div>
                              <h1 className='cate'> {element?.category?.category_name}</h1>
                              <span className='date'> {new Date(element.created_at).toLocaleTimeString([], {
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                                hour12: true
                              })}</span>
                            </div>
                          </div>
                          <div>
                            <span className='categoryTag'>{element?.category?.category_name}</span>
                          </div>
                        </div>
                        <div className='midDiv'>
                          <h2 className='newsTitle'>{element?.title}</h2>
                          <div className='contentDiv'>
                            <h3 className='content title'>Sub Category :</h3>
                            <h4 className='content desc'>FIFA World Cup</h4>
                          </div>
                          <div className='contentDiv'>
                            <h3 className='content title'> {translate('contentTypeLbl')} :</h3>
                            <h4 className='content desc'>{typeReturn(element.content_type)}</h4>
                          </div>
                          <div className='newsStatus'>
                            <span> <PiProhibitInsetFill /> Expired News</span>
                            <span> <PiProhibitInsetFill /> Deactivated</span>
                          </div>
                        </div>
                        <div className='lowerDiv'>
                          <div className='actionBtns'>
                            <button className='edit'>{translate('editLbl')}</button>
                            <button className='delete'>{translate('deleteTxt')}</button>
                          </div>
                        </div>
                      </div>
                      {/* <div className='manage-data'>
                        <div className='manage-card'>

                          <div className='manage-img'>
                            <img
                              src={element.image}
                              alt='manage news'
                              onError={placeholderImage}
                            />
                          </div>

                          <div className='manage-title'>
                            <p>
                              {element.category_name}
                            </p>
                          </div>
                          <div className='manage-date'>
                            <p>
                              {new Date(element.created_at).toLocaleTimeString([], {
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
                            <p
                              className='mb-0'
                            >
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
                            {
                              element?.status === 0 && <span className='deactiveNews'>Deactive</span>
                            }
                             {
                              element?.is_expired === 1 && <span className='deactiveNews'>Expired</span>
                            }
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
                      </div> */}
                    </div>
                  ))
                ) : (
                  <>
                    {NoDataFound()}

                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ManageNews
