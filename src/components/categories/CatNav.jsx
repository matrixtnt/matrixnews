'use client'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentLanguage, selectCurrentLanguageLabels } from '../../store/reducers/languageReducer'
import { getClosest, getSiblings, slideToggle, slideUp, translate } from '../../utils'
import Skeleton from 'react-loading-skeleton'
import { locationData, settingsData } from '../../store/reducers/settingsReducer'
import { getLanguage } from 'src/utils/api'
import { useEffect, useState } from 'react'
import NoDataFound from '../noDataFound/NoDataFound'
import { FaAngleDown, FaAngleUp, FaChevronRight } from 'react-icons/fa'
import Card from '../skeletons/Card'
import { loadNews, newsUpdateLanguage } from 'src/store/reducers/newsReducer'
import { categoriesCacheData } from 'src/store/reducers/CatNavReducers'
import NewsCard from '../view/NewsCard'
import Link from 'next/link'
import { Dropdown } from 'react-bootstrap'
import toast from 'react-hot-toast'

const CatNav = () => {

  const navigate = useRouter()
  const currentLanguage = useSelector(selectCurrentLanguage)
  const categoiresOnOff = useSelector(settingsData)

  const categories = useSelector(categoriesCacheData)

  const [catId, setCatId] = useState('')
  const [subCatSlug, setSubCatSlug] = useState('')
  const [subCatData, setSubCatData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [subLoading, setSubLoading] = useState(true)

  const dispatch = useDispatch();

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
  const dataPerPage = 4 // number of posts per page

  const changelanguage = useSelector(selectCurrentLanguageLabels)
  const location = useSelector(locationData)

  let { id: language_id } = getLanguage()
  const storedLatitude = location && location.lat
  const storedLongitude = location && location.long

  // api call
  const getNewsByCategoryApi = async page => {
    setSubLoading(true)
    loadNews({
      offset: page * dataPerPage,
      limit: dataPerPage,
      get_user_news: 0,
      search: '',
      language_id: language_id,
      category_id: catId,
      subcategory_slug: subCatSlug,
      tag_id: '',
      slug: '',
      latitude: storedLatitude,
      longitude: storedLongitude,
      onSuccess: response => {
        setSubCatData(response)
        setSubLoading(false)
        // console.log(currentLanguage.id,'langId-catnav')

        dispatch(newsUpdateLanguage(currentLanguage.id))

      },
      onError: error => {
        setSubLoading(false)
        setSubCatData([])
        console.log(error)
      }
    })
  }


  useEffect(() => {
    if (language_id) {
      getNewsByCategoryApi(currentPage)
    }

  }, [subCatSlug, currentPage, catId, currentLanguage])


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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onClickHandler = e => {
    const target = e.currentTarget
    const parentEl = target.parentElement
    if (parentEl?.classList.contains('menu-toggle') || target.classList.contains('menu-toggle')) {
      const element = target.classList.contains('icon') ? parentEl : target
      const parent = getClosest(element, 'li')
      const childNodes = parent.childNodes
      const parentSiblings = getSiblings(parent)
      parentSiblings.forEach(sibling => {
        const sibChildNodes = sibling.childNodes
        sibChildNodes.forEach(child => {
          if (child.nodeName === 'UL') {
            slideUp(child, 1000)
          }
        })
      })
      childNodes.forEach(child => {
        if (child.nodeName === 'UL') {
          slideToggle(child, 1000)
        }
      })
      setIsMenuOpen(!isMenuOpen);
    }
  }

  return (
    <>
      {categoiresOnOff && categoiresOnOff.category_mode === '1' ? (
        <>
          {categories && categories.length > 0 ? (
            <div id='cn-main' expand='lg' className='catNavWrapper'>
              <div className='container py-2'>
                {isLoading ? (
                  <div>
                    <Skeleton height={200} count={3} />
                  </div>
                ) : (
                  <div className={`cn-main-div catSubCatWrapper flex-display`}>
                    <div className="catContainer flex-display">

                      {categories?.slice(0, 10).map((element, index) => (
                        <div key={element.id} className='text-center'
                        >
                          <div>

                            {
                              element?.sub_categories?.length > 0 && categoiresOnOff && categoiresOnOff.subcategory_mode === '1' ?
                                <span
                                  className={`catNav-links  ${subCatDrop && currentCategory && currentCategory.id === element.id ? 'activeSubDrop' : ''}`}
                                  onClick={() => handleSubCatDropdown(element)}

                                >

                                  <b>{element.category_name} </b> {subCatDrop && currentCategory && currentCategory.id === element.id ? <FaAngleUp /> : <FaAngleDown />}
                                </span> : 
                                <span
                                  className={`catNav-links  ${subCatDrop && currentCategory && currentCategory.id === element.id ? 'activeSubDrop' : ''}`}
                                  onClick={() => handleCategoryChange(element)}
                                >

                                  <b>{element.category_name} </b>
                                </span>
                            }
                          </div>

                          {
                            categoiresOnOff && categoiresOnOff.subcategory_mode === '1' ?
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
                                            subLoading ? <>
                                              {[...Array(4)].map((_, index) => (
                                                <div className='col-lg-3 col-sm-6 col-md-4 col-12' key={index}>
                                                  <Card catNav={true} />
                                                </div>
                                              ))}
                                            </> : <>
                                              {currentData && currentData.length > 0 ? (
                                                currentData.map(element => (
                                                  <div className='col-lg-3 col-sm-6 col-md-4 col-12 ' key={element.id}>
                                                    <NewsCard element={element} subDropCard={true} />
                                                  </div>
                                                ))
                                              ) : (
                                                <NoDataFound />
                                              )}
                                            </>
                                          }
                                          {
                                            lengthdata > dataPerPage ?
                                              <div className="col-12 viewAllWrapper">
                                                {
                                                  subCatSlug === '' ?
                                                    <button className='viewAll commonBtn' onClick={() => handleCategoryChange(element)}>View All</button> :
                                                    <button className='viewAll commonBtn' onClick={() => handleSubCategoryChange()}>View All</button>
                                                }
                                              </div> : null
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                              </> : null
                              : null
                          }
                        </div>
                      ))}
                    </div>

                    {/* {categories?.length > 10 ? (
                      <button
                        id='catNav-more'
                        onClick={() => {
                          navigate.push('/all-categories')
                        }}
                      >
                        {translate('allLbl')} {">>"}
                      </button>
                    ) : null} */}
                    {categoiresOnOff && categoiresOnOff.category_mode === '1' ? (
                      <li className='allCatBtn nav-item has-children' onMouseLeave={() => setIsMenuOpen(false)}>
                        {categories && categories.length > 10 ? (
                          <button
                            id='catNav-more'
                            className='menu-toggle' 
                            onMouseEnter={(e) => onClickHandler(e)}
                            onMouseLeave={() => setIsMenuOpen(false)}
                          >
                            {translate('More')}
                            <span className='downArr'>
                              {isMenuOpen ?
                                <FaAngleUp />
                                :
                                <FaAngleDown />
                              }
                            </span>
                          </button>
                        ) : null}
                        {
                          isMenuOpen &&
                          <ul className='sub-menu mobile_catogories' onMouseLeave={() => setIsMenuOpen(false)}>
                            {categories &&
                              categories?.slice(10, categories?.length)?.map((element, index) => (
                                <li className='nav-item' key={index}>
                                  {
                                    element?.sub_categories?.length > 0 ?
                                      <Dropdown className='subCatdrop'>
                                        <Dropdown.Toggle className=''>
                                          {element.category_name}<FaAngleDown />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu >
                                          {
                                            element.sub_categories.map((data, index) => {
                                              return (
                                                <Dropdown.Item
                                                  key={index} 
                                                  onClick={() => setIsMenuOpen(false)}
                                                >
                                                  <Link href={`/categories-news/sub-category/${data?.slug}`} title={data.subcategory_name}>
                                                    {data.subcategory_name}
                                                  </Link>
                                                </Dropdown.Item>
                                              )
                                            })}
                                        </Dropdown.Menu>
                                      </Dropdown> :
                                      <Link
                                        className='catNav-links'
                                        key={index}
                                        href={{
                                          pathname: `/categories-news/${element.slug}`
                                        }}
                                        onClick={() => setIsMenuOpen(false)}
                                        title={element.category_name}
                                      >
                                        {' '}
                                        {element.category_name}{' '}
                                      </Link>
                                  }

                                </li>
                              ))}
                          </ul>
                        }
                      </li>
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

