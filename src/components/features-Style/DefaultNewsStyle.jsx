import Link from 'next/link'
import { HiOutlineArrowLongRight } from 'react-icons/hi2'
import { placeholderImage, translate, truncateText } from '../../utils'
import { LuCalendarDays } from 'react-icons/lu'
import { IoEye } from 'react-icons/io5'
import { FaArrowRightLong } from 'react-icons/fa6'

const DefaultNewsStyle = ({ Data }) => {

    return (
        <section className='defaultStyleSect'>
            {/* news */}
            {Data ? (
                <div id='rns-main' className='news_style_four'>
                    <div className='container'>
                        <div className='row'>
                            <div id='rns-cards-main' className=''>

                                <div className='row mt-5 mb-5'>
                                    {Data && Data?.map((value, index) => {
                                        return (
                                            <div className='col-xxl-4 col-lg-4 col-md-6 col-12' key={value.id}>
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
                                              {/* <div id='rns-img-overlay' className=' card-inverse mt-3'>
                                                <div className='categoryTag' type='button'>
                                                  {truncateText(value.category_name, 10)}
                                                </div>
                                              </div> */}
                                              <div id='rns-card-body' className='card-block mt-3'>
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
        </section>
    )
}

export default DefaultNewsStyle
