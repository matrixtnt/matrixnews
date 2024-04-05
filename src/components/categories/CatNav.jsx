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
import { FaAngleDown, FaChevronRight } from 'react-icons/fa'
import { IoClose } from "react-icons/io5";
import Card from '../skeletons/Card'



SwiperCore.use([Navigation, Pagination])
const CatNav = () => {
  const navigate = useRouter()
  const currentLanguage = useSelector(selectCurrentLanguage)
  const categoiresOnOff = useSelector(settingsData)
  const [catId, setCatId] = useState('')
  const [subCatSlug, setSubCatSlug] = useState('')

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
    // console.log(categories.sub_categories)
    if (categories.slug) {
      // navigate.push(`/categories-news/${categories.slug}?category_id=${categories.id}`)
      navigate.push(`/categories-news/${categories.slug}`)
      setSubCatDrop(false)
    }
  }
  
  const handleSubCategoryChange = () => {
    // console.log(categories.sub_categories)
    if (subCatSlug) {
      navigate.push(`/categories-news/sub-category/${subCatSlug}`)
      setSubCatDrop(false)
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
        category_id: catId,
        subcategory_slug: subCatSlug,
        tag_id: '',
        slug: '',
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
  const { data: subCatData, isLoading: subLoading } = useQuery({
    queryKey: ['category-news', 6, changelanguage, location, currentPage, catId, subCatSlug],
    queryFn: () => getNewsByCategoryApi(currentPage)
  })

  // slice the array to get the current posts
  const currentData = subCatData && subCatData.data && subCatData.data.slice(0, dataPerPage)

  const lengthdata = (subCatData && subCatData.total) || 0


  const [subCatDrop, setSubCatDrop] = useState(false)
  const [currentCategory, setCurrentCategory] = useState([])

  const handleSubCatDropdown = (category) => {
    setCurrentCategory(category)
    setCatId(category.id)
    setSubCatDrop(true)
    setSubCatSlug('')
  }

  useEffect(() => {

    // console.log(currentCategory, 'currCat')
    // console.log(currentCategory.sub_categories?.map((e) => {
    //   return e.subcategory_name
    // }), "subbbbcaaa")

  }, [currentCategory])

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
                  <div className={`cn-main-div catSubCatWrapper flex-display`}>

                    {Data.map((element, index) => (
                      <div key={element.id} className='text-center'
                      >
                        {
                          element?.sub_categories?.length > 0 ?
                            <span
                              className='catNav-links'
                              onClick={() => handleSubCatDropdown(element)}
                              onMouseEnter={() => handleSubCatDropdown(element)}

                            >

                              <b>{element.category_name} </b> <FaAngleDown />
                            </span> : <span
                              className='catNav-links'
                              onClick={() => handleCategoryChange(element)}
                            >

                              <b>{element.category_name} </b>
                            </span>
                        }

                        {
                          subCatDrop && currentCategory && currentCategory.id === element.id ? <>
                            <div className='subCatDropdown' >
                              <div className="row"
                              onMouseLeave={() => setSubCatDrop(false)}

                              >
                                <div className="col-lg-3">
                                  <div className="subCatNamesWrapper">
                                    <div onClick={() => setSubCatSlug('')}>
                                      <span className={subCatSlug === '' ? 'subNavActive' : ''} >
                                        All
                                      </span>
                                      {subCatSlug === '' ? <FaChevronRight /> : null}
                                    </div>
                                    {
                                      currentCategory.sub_categories?.map((e) => {
                                        return <div onClick={() => setSubCatSlug(e?.slug)} key={e.slug}>
                                          <span className={subCatSlug === e.slug ? 'subNavActive' : ''} >
                                            {e.subcategory_name}
                                          </span>
                                          {subCatSlug === e.slug ? <FaChevronRight /> : null}
                                        </div>
                                      })
                                    }
                                  </div>
                                </div>
                                <div className="col-lg-9">
                                  <div className="subCatDataWrappper">
                                    {/* <span className='close' onClick={()=>setSubCatDrop(false)}><IoClose/></span> */}
                                    <div className='row'>
                                      {
                                        subLoading ? <Card /> : <>
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
                                                      {/* <p id='cv-card-date'>
                                                    <FiCalendar size={18} id='cv-logoCalendar' />
                                                    {formatDate(element.date)}
                                                  </p> */}
                                                    </div>
                                                  </div>
                                                </Link>
                                              </div>
                                            ))
                                          ) : (
                                            <NoDataFound />
                                          )}
                                        </>
                                      }
                                      {
                                        lengthdata > 1 ?
                                          <div className="col-12 viewAllWrapper">
                                            {
                                              subCatSlug === '' ?
                                                <button className='viewAll' onClick={() => handleCategoryChange(element)}>View All</button> :
                                                <button className='viewAll' onClick={() => handleSubCategoryChange()}>View All</button>
                                            }
                                          </div> : null
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </> : null
                        }
                      </div>
                    ))}


                    {/* <Swiper {...swiperOption}>
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
                    </Swiper> */}
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
