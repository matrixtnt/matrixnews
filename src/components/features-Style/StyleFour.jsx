import Link from 'next/link'
import { FaArrowRightLong } from "react-icons/fa6";
import { placeholderImage, translate, truncateText } from '../../utils'
import { BsFillPlayFill } from 'react-icons/bs'
import VideoPlayerModal from '../videoplayer/VideoPlayerModal'
import { useState } from 'react'
import AdSpaces from '../view/adSpaces/AdSpaces'
import CommonViewMoreDiv from './CommonViewMoreDiv'
import StyleFourSkeleton from '../skeletons/StyleFourSkeleton'
import { IoEye } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";

const StyleFour = ({ Data, isLoading }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const [Video_url, setVideo_url] = useState()
  const [typeUrl, setTypeUrl] = useState(null)
  const [modalShow, setModalShow] = useState(false)

  const handleVideoUrl = url => {
    setModalShow(true)
    setVideo_url(url)
  }


  const TypeUrl = type => {
    setTypeUrl(type)
  }

  return (
    <>

      {/* ad spaces */}
      {Data.ad_spaces && Data.id == Data.ad_spaces.ad_featured_section_id && Data.news_type === 'videos' ? (
        <>
          <AdSpaces ad_url={Data.ad_spaces.ad_url} ad_img={Data.ad_spaces.web_ad_image} style_web={'four'} />
        </>
      ) : null}

      {/* videos */}
      {Data.videos && Data.videos?.length > 0 ? (
        <div id='rns-main' className='video_style_four'>
          <div className='container'>
            <div className='row'>
              <div id='rns-cards-main' className=''>
                <CommonViewMoreDiv title={Data && Data.title} desc={Data && Data.short_description} link={`/video-news-view/${Data.slug}`} />

                <div className='row'>
                  {Data.videos.map((value, index) => {
                    return (
                      <div className='col-xxl-4 col-lg-4 col-md-4 col-sm-6 col-12' key={value.id}>
                        <div
                          id='rns-card'
                          className='card card_hover_two'
                          onClick={() => {
                            handleVideoUrl(value.content_value)
                            TypeUrl(value.type)
                          }}
                        >
                          <div className='banner_thumb'>
                            <img
                              id='rns-image'
                              src={value.image}
                              className='card-img-top'
                              alt={value.title}
                              onError={placeholderImage}
                            />
                          </div>
                          <div id='rns-img-overlay' className=' card-inverse'>
                            <div id='vps-btnVideo'>
                              <BsFillPlayFill id='vps-btnVideo-logo' className='pulse' fill='white' size={50} />
                            </div>
                          </div>
                          <div id='rns-card-body' className='card-block pb-0'>
                            <div className='d-flex align-items-center gap-4'>
                              <span className='d-flex align-items-center gap-2 views'> <IoEye size={20} /> {value?.total_views} {translate('views')}</span>
                            </div>
                            <p className='card-title mb-0'>{value?.title}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <VideoPlayerModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                // backdrop="static"
                keyboard={false}
                url={Video_url}
                type_url={typeUrl}
              // title={Data[0].title}
              />
            </div>
          </div>
        </div>
      ) : null}

      {/* ad spaces */}
      {Data.ad_spaces && Data.id == Data.ad_spaces.ad_featured_section_id && Data.news_type === 'news' ? (
        <>
          <AdSpaces ad_url={Data.ad_spaces.ad_url} ad_img={Data.ad_spaces.web_ad_image} style_web={'four'} />
        </>
      ) : null}

      {/* news */}
      {Data && Data.news?.length > 0 ? (
        <div id='rns-main' className='news_style_four'>
          <div className='container'>
            <div className='row'>
              <div id='rns-cards-main' className=''>
                <CommonViewMoreDiv title={Data && Data.title} desc={Data && Data.short_description} link={`/view-all/${Data.slug}`} />
                <div className='row mb-5'>
                  {Data.news.map((value, index) => {
                    return (
                      <div className='col-xxl-4 col-lg-4 col-md-4 col-sm-6 col-12' key={value.id}>
                        <Link id='rns-card' className='card card_hover_two'
                          href={{ pathname: `/news/${value.slug}`, query: { language_id: value.language_id } }}
                          // as={`/news/${value.slug}`}
                          title='detail-page'
                        >
                          <div className='banner_thumb'>
                            <img
                              id='rns-image'
                              src={value.image}
                              className='card-img-top'
                              alt={value.title}
                              onError={placeholderImage}
                            />
                          </div>
                          <div id='rns-img-overlay' className=' card-inverse mt-3'>
                            <div className='categoryTag' type='button'>
                              {truncateText(value.category_name, 10)}
                            </div>
                          </div>
                          <div id='rns-card-body' className='card-block'>
                            <div className='d-flex align-items-center gap-4'>
                              <span className='dateSpan d-flex align-items-center gap-2'><LuCalendarDays /> {new Date(value?.date).toLocaleString('en-us', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })}</span>
                              <span className='d-flex align-items-center gap-2 views'> <IoEye size={20} /> {value?.total_views} {translate('views')}</span>

                            </div>
                            <p className='card-title'>{value?.title}</p>
                            <hr />
                            <Link  href={{ pathname: `/news/${value.slug}`, query: { language_id: value.language_id } }}
                              // as={`/breaking-news/${value.slug}`}
                              title='detail-page' className='readMoreBtn'>
                              {translate('readmore')}
                              <FaArrowRightLong size={20} />
                            </Link>
                          </div>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* ad spaces */}
      {Data.ad_spaces && Data.id == Data.ad_spaces.ad_featured_section_id && Data.news_type === 'breaking_news' ? (
        <>
          <AdSpaces ad_url={Data.ad_spaces.ad_url} ad_img={Data.ad_spaces.web_ad_image} style_web={'four'} />
        </>
      ) : null}

      {/* breaking news */}
      {Data && Data.breaking_news?.length > 0 ? (
        <div id='rns-main' className='news_style_four'>
          <div className='container'>
            <div className='row'>
              <div id='rns-cards-main' className=''>
                <CommonViewMoreDiv title={Data && Data.title} desc={Data && Data.short_description} link={`/view-all/${Data.slug}`} />
                <div className='row mb-5'>
                  {Data && Data.breaking_news.map((value, index) => {
                    return (
                      <div className='col-xxl-4 col-lg-4 col-md-4 col-sm-6 col-12' key={value.id}>
                        <Link
                          id='rns-card'
                          className='card card_hover_two'
                          href={{ pathname: `/breaking-news/${value.slug}`, query: { language_id: value.language_id } }}
                          // as={`/breaking-news/${value.slug}`}
                          title='detail-page'
                        >
                          <div className='banner_thumb'>
                            <img
                              id='rns-image'
                              src={value.image}
                              className='card-img-top'
                              alt={value.title}
                              onError={placeholderImage}
                            />
                          </div>
                          <div id='rns-card-body' className='card-block'>
                            <div className='d-flex align-items-center gap-4'>
                              <span className='d-flex align-items-center gap-2 views'> <IoEye size={20} /> {value?.total_views} {translate('views')}</span>
                            </div>
                            <p className='card-title'>{value?.title}</p>
                            <hr />
                            <Link href={{ pathname: `/breaking-news/${value.slug}`, query: { language_id: value.language_id } }}
                              // as={`/breaking-news/${value.slug}`}
                              title='detail-page' className='readMoreBtn'>
                              {translate('readmore')}
                              <FaArrowRightLong size={20} />
                            </Link>
                          </div>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

    </>
  )
}

export default StyleFour
