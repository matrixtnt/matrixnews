'use client'
import React, { useEffect, useState } from 'react'
import { deleteNewsApi } from '../../store/actions/campaign'
import { useSelector } from 'react-redux'
import BreadcrumbNav from '../breadcrumb/BreadcrumbNav'
import { placeholderImage, translate, truncateText } from '../../utils'
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
import expire from '../../../public/assets/images/expire.svg'
import deactivated from '../../../public/assets/images/deactive.svg'

import { PiProhibitInsetFill } from "react-icons/pi";
import { FcExpired } from "react-icons/fc";

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

  const expireIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_510_4741)">
      <path d="M8 8.46875C8.25888 8.46875 8.46875 8.25888 8.46875 8C8.46875 7.74112 8.25888 7.53125 8 7.53125C7.74112 7.53125 7.53125 7.74112 7.53125 8C7.53125 8.25888 7.74112 8.46875 8 8.46875Z" fill="#BE151E" />
      <path d="M7.33106 13.8323L10.1881 8.78556C10.5622 8.12469 11.239 7.73012 11.9985 7.73012C12.7579 7.73012 13.4347 8.12469 13.8088 8.78556L14.0169 9.15309C14.0882 8.77687 14.125 8.39128 14.125 8C14.125 6.36394 13.4879 4.82584 12.3311 3.66897C11.1742 2.51212 9.63603 1.875 8 1.875C6.36397 1.875 4.82584 2.51212 3.66897 3.66894C2.51212 4.82584 1.875 6.36394 1.875 8C1.875 9.63606 2.51212 11.1742 3.66894 12.331C4.63825 13.3003 5.87528 13.9045 7.21322 14.075C7.247 13.9926 7.28622 13.9115 7.33106 13.8323ZM5.17188 8.45312C4.913 8.45312 4.70312 8.24325 4.70312 7.98438C4.70312 7.7255 4.913 7.51562 5.17188 7.51562H6.67975C6.82384 7.12406 7.13756 6.814 7.53125 6.67438V5.15625C7.53125 4.89738 7.74113 4.6875 8 4.6875C8.25887 4.6875 8.46875 4.89738 8.46875 5.15625V6.67438C9.01434 6.86788 9.40625 7.38891 9.40625 8C9.40625 8.77541 8.77544 9.40625 8 9.40625C7.38312 9.40625 6.85812 9.00681 6.66909 8.45312H5.17188Z" fill="#BE151E" />
      <path d="M7.34425 15.9049C7.17881 15.6212 7.08506 15.3127 7.06309 15.0008C5.53178 14.7991 4.11653 14.1044 3.00606 12.9939C1.67212 11.66 0.9375 9.88647 0.9375 8C0.9375 6.11353 1.67212 4.34 3.00603 3.00603C4.34 1.67213 6.11356 0.9375 8 0.9375C9.88644 0.9375 11.66 1.67213 12.994 3.00606C14.3279 4.34 15.0625 6.11353 15.0625 8C15.0625 8.80078 14.9297 9.581 14.6753 10.3161L15.2651 11.3581C15.7461 10.3191 16 9.17913 16 8C16 5.86313 15.1678 3.85413 13.6569 2.34313C12.1458 0.832156 10.1369 0 8 0C5.86312 0 3.85416 0.832156 2.34313 2.34313C0.832156 3.85413 0 5.86313 0 8C0 10.1369 0.832156 12.1459 2.34313 13.6569C3.70906 15.0228 5.48194 15.8338 7.38831 15.977C7.37328 15.9533 7.35847 15.9294 7.34425 15.9049Z" fill="#BE151E" />
      <path d="M15.85 14.2943L12.993 9.24754C12.7875 8.88447 12.4157 8.66772 11.9985 8.66772C11.5813 8.66772 11.2095 8.88447 11.004 9.24754L8.14696 14.2943C7.94442 14.652 7.94711 15.0777 8.15421 15.4329C8.3613 15.788 8.73039 16.0001 9.14152 16.0001H14.8555C15.2667 16.0001 15.6358 15.788 15.8429 15.4329C16.0499 15.0777 16.0526 14.652 15.85 14.2943ZM12.4577 14.4791C12.4135 14.6955 12.2194 14.8559 11.998 14.8559C11.8025 14.8559 11.6225 14.7296 11.557 14.5452C11.4916 14.3609 11.5489 14.1492 11.7008 14.025C11.8527 13.9009 12.0704 13.8851 12.2389 13.9853C12.4065 14.0851 12.4967 14.2877 12.4577 14.4791ZM12.4673 12.5654C12.4673 12.8243 12.2574 13.0342 11.9985 13.0342C11.7396 13.0342 11.5298 12.8243 11.5298 12.5654V11.0607C11.5298 10.8018 11.7396 10.5919 11.9985 10.5919C12.2574 10.5919 12.4673 10.8018 12.4673 11.0607V12.5654Z" fill="#BE151E" />
    </g>
    <defs>
      <clipPath id="clip0_510_4741">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>

  const deactivateIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_510_4769)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.499756 8C0.499756 3.85787 3.85763 0.5 7.99976 0.5C12.1419 0.5 15.4998 3.85787 15.4998 8C15.4998 12.1421 12.1419 15.5 7.99976 15.5C3.85763 15.5 0.499756 12.1421 0.499756 8ZM11.1462 11.8535C11.3415 12.0488 11.6581 12.0488 11.8533 11.8535C12.0486 11.6583 12.0486 11.3417 11.8533 11.1464L4.78223 4.07535C4.58698 3.8801 4.27041 3.8801 4.07513 4.07535C3.87988 4.27062 3.87988 4.5872 4.07513 4.78247L11.1462 11.8535Z" fill="#BE151E" />
    </g>
    <defs>
      <clipPath id="clip0_510_4769">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>



  return (
    <Layout>
      <BreadcrumbNav SecondElement={translate('manageNewsLbl')} />

      <div className='manage_news bg-white py-5'>
        <div className='container'>
          <div className='row mainRow'>
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
                {
                  Data && Data.length > 0 ? (
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
                                <span className='date'>{new Date(element?.created_at).toLocaleString('en-us', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })
                                }</span>
                              </div>
                            </div>
                            {
                              element?.tag_name &&
                              <div>
                                <span className='categoryTag'>{element?.tag_name}</span>
                              </div>
                            }
                          </div>
                          <hr />
                          <div className='midDiv'>
                            <h2 className='newsTitle'>{truncateText(element?.title, 70)}</h2>
                            {
                              element?.sub_category?.sub_category_name &&
                              <div className='contentDiv'>
                                <h3 className='content title'>{translate('subcatLbl')} :</h3>
                                <h4 className='content desc'>{element?.sub_category?.sub_category_name}</h4>
                              </div>
                            }
                            <div className='contentDiv'>
                              <h3 className='content title'> {translate('contentTypeLbl')} :</h3>
                              <h4 className='content desc'>{typeReturn(element.content_type)}</h4>
                            </div>
                            <div className='newsStatus'>
                              {
                                element?.is_expired === 1 &&
                                <div className='d-flex align-items-center gap-2'>
                                  <span className='statusIcon'>{expireIcon}</span>
                                  <span>{translate('expireNews')}</span>
                                </div>
                              }
                              {
                                element?.status === 0 &&
                                <div className='d-flex align-items-center gap-2'>
                                  <span className='statusIcon'>{deactivateIcon}</span>
                                  <span>{translate('deactiveNews')}</span>
                                </div>
                              }
                            </div>
                          </div>
                          <hr />
                          <div className='lowerDiv'>
                            <div className='actionBtns'>
                              <button className='edit' onClick={e => editNews(element)}>{translate('editLbl')}</button>
                              <button className='delete' onClick={e => deleteNews(element)}>{translate('deleteTxt')}</button>
                            </div>
                          </div>
                        </div>
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
