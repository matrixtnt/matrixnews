'use client'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage, selectCurrentLanguageLabels } from '../../store/reducers/languageReducer'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { formatDate, placeholderImage, translate } from '../../utils'
import Skeleton from 'react-loading-skeleton'
import { locationData, settingsData } from '../../store/reducers/settingsReducer'
import Link from 'next/link'
import { CategoriesApi } from 'src/hooks/categoriesApi'
import { access_key, getLanguage } from 'src/utils/api'
import { useQuery } from '@tanstack/react-query'
import { loadCategoryCount, loadSubCategories, subCategories } from 'src/store/reducers/tempDataReducer'
import { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import NoDataFound from '../noDataFound/NoDataFound'
import { getNewsApi } from 'src/hooks/newsApi'
import { FiCalendar } from 'react-icons/fi'
import { FaAngleDown } from 'react-icons/fa'



SwiperCore.use([Navigation, Pagination])
const CatNav = () => {
  const navigate = useRouter()
  const currentLanguage = useSelector(selectCurrentLanguage)
  const categoiresOnOff = useSelector(settingsData)
  const [subCat, setSubCat] = useState([])

  // api call
  const categoriesApi = async () => {
    try {
      const { data } = await CategoriesApi.getCategories({
        access_key: access_key,
        offset: '0',
        limit: '40',
        language_id: currentLanguage.id
      })

      loadCategoryCount({ categoryCount: data?.total });
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  // react query
  const { data: Data, isLoading } = useQuery({
    queryKey: ['categoriesNav', currentLanguage],
    queryFn: categoriesApi
  })

  // useEffect(() => {
  //   const subCategoriesObject = Data?.reduce((acc, category) => {
  //     if (Array.isArray(category.sub_categories)) {
  //       // Assuming each subcategory has a unique ID, use it as the key
  //       category.sub_categories.forEach(subCategory => {
  //         // acc[subCategory.id] = subCategory;
  //         acc?.push(subCategory)
  //       });
  //     }
  //     return acc;
  //   }, []);
  //   setSubCat(subCategoriesObject)
  // }, [Data])


  const swiperOption = {
    loop: Data && Data.length > 10 ? true : false,
    speed: 3000,
    spaceBetween: 10,
    slidesPerView: 'auto',
    navigation: false,
    freeMode: true,
    observer: true,
    observeParents: true,
    parallax: true,
    breakpoints: {
      1200: {
        slidesPerView: 11
      }
    },
    autoplay: {
      delay: 0
    }
  }

  const handleCategoryChange = (categories) => {
    console.log(categories.sub_categories)
    loadSubCategories({ subCategories: categories.sub_categories });
    if (categories.slug) {
      navigate.push(`/categories-news/${categories.slug}?category_id=${categories.id}`)
    }
  }

  const [currentPage, setCurrentPage] = useState(0)
  const dataPerPage = 8 // number of posts per page

  const changelanguage = useSelector(selectCurrentLanguageLabels)
  const location = useSelector(locationData)

  let { id: language_id } = getLanguage()
  const storedLatitude = location && location.lat
  const storedLongitude = location && location.long
  // api call
  const getNewsByCategoryApi = async page => {
    try {
      const { data } = await getNewsApi.getNews({
        access_key: access_key,
        offset: page * dataPerPage,
        limit: dataPerPage,
        get_user_news: '',
        search: '',
        language_id: language_id,
        category_id: 6,
        subcategory_id: '',
        tag_id: '',
        slug: "",
        latitude: storedLatitude,
        longitude: storedLongitude
      })
      // console.log('categories', data)
      return data
    } catch (error) {
      console.log(error)
    }
  }



  // react query
  const { data: subCatData } = useQuery({
    queryKey: ['category-news', 6, changelanguage, location, currentPage],
    queryFn: () => getNewsByCategoryApi(currentPage)
  })

  // slice the array to get the current posts
  const currentData = subCatData && subCatData.data && subCatData.data.slice(0, dataPerPage)

  const lengthdata = (subCatData && subCatData.total) || 0

  return (
    <>
      {categoiresOnOff && categoiresOnOff.category_mode === '1' ? (
        <>
          {Data && Data.length > 0 ? (
            <div id='cn-main' expand='lg' className='catNavWrapper'>
              <div className='container py-2'>
                {isLoading ? (
                  <div>
                    <Skeleton height={200} count={3} />
                  </div>
                ) : (
                  <div className={`cn-main-div ${Data && Data.length > 10 ? 'flex-display' : 'block-display'}`}>

                    {/* <div className="row">
                      <div className="col-lg-3">
                        <div className="subcategoryWrapper">
                          <div>
                            <span>All</span>
                          </div>

                          {
                            element.sub_categories.map((subData) => {
                              return (
                                <div>
                                  <span>{subData?.subcategory_name}</span>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                      <div className="col-lg-9">
                        <div className="row">
                          {currentData && currentData.length > 0 ? (
                            currentData.map(element => (
                              <div className='col-lg-3 col-md-4 col-12 ' key={element.id}>
                                <Link
                                  id='Link-all'
                                  href={{ pathname: `/news/${element.slug}`, query: { language_id: element.language_id } }}
                                >
                                  <div id='cv-card' className='card'>
                                    <img id='cv-card-image' src={element.image} className='card-img' alt={element.title} onError={placeholderImage} />
                                    <div id='cv-card-body' className='card-body'>
                                      <button id='cv-btnCatagory' className='btn btn-sm' type='button'>
                                        {element.category.category_name}
                                      </button>
                                      <p id='cv-card-title' className='card-title'>
                                        {element.title}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            ))
                          ) : (
                            <NoDataFound />
                          )}
                        </div>
                      </div>
                    </div> */}

                    <Swiper {...swiperOption}>
                      {Data.map((element, index) => (
                        <SwiperSlide key={element.id} className='text-center'
                          onClick={() => handleCategoryChange(element)}
                        >
                          <span
                            className='catNav-links'
                            // href={{
                            //   pathname: `/categories-news/${element.slug}`,
                            //   query: {
                            //     category_id: element.id
                            //   }
                            // }}
                          >
                          <b>{element.category_name}</b>
                          </span>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    {Data?.length > 10 ? (
                      <button
                        id='catNav-more'
                        onClick={() => {
                          navigate.push('/all-categories')
                        }}
                      >
                        {translate('More >>')}
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  )
}

export default CatNav
