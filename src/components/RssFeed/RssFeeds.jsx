import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import { IoLogoRss } from 'react-icons/io5';
import { getRssFeedApi } from 'src/hooks/rssFeedApi';
import { selectCurrentLanguage } from 'src/store/reducers/languageReducer';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { NoDataFound, translate, truncateText } from 'src/utils';
import Skeleton from 'react-loading-skeleton';
import { categoriesCacheData } from 'src/store/reducers/CatNavReducers';
import { Select } from 'antd/lib';
import LoadMoreBtn from '../view/loadMoreBtn/LoadMoreBtn';
import { Dropdown } from 'react-bootstrap'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { settingsData } from 'src/store/reducers/settingsReducer';
import { useRouter } from 'next/router';
import { setSelectedFeed } from 'src/store/reducers/RssFeedReducer';
import { useDispatch } from 'react-redux';

const RecentNews = dynamic(() => import('./RecentNews'), { ssr: false })

const RssFeeds = () => {
    const router = useRouter();
    const dispatch = useDispatch()
    const currentLanguage = useSelector(selectCurrentLanguage)

    const categories = useSelector(categoriesCacheData)

    const settings = useSelector(settingsData)

    const dataPerPage = 20;

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false)

    const [isLoading, setIsLoading] = useState({
        loading: false,
        loadMoreLoading: false
    })
    const [loadMore, setLoadMore] = useState(false)
    const [offset, setOffset] = useState(0)
    const [totalData, setTotalData] = useState('')

    const [isFilter, setIsFilter] = useState(false)
    const [isSubCateFilter, setIsSubCateFilter] = useState(false)

    const [selectedCate, setSelectedCate] = useState('')
    const [selectedSubCate, setSelectedSubCate] = useState('')

    const handleLoadMore = () => {
        setLoadMore(true)
        setOffset(offset + 1)
    }

    // api call 
    const getRssFeeds = async (cateSlug, subCateSlug) => {
        !loadMore ? setIsLoading({ loading: true }) : setIsLoading({ loadMoreLoading: true })
        try {
            const { data } = await getRssFeedApi.getRssFeed({ language_id: currentLanguage.id, limit: dataPerPage, offset: offset * dataPerPage, category_slug: cateSlug, subcategory_slug: subCateSlug })
            // console.log('rss', data.data)
            if (loadMore) {
                setData((prevData) => [...prevData, ...data.data]);
            }
            else {
                setData(data?.data)
            }
            setTotalData(data.total)
            setIsFilter(false)
            setIsSubCateFilter(false)
            setIsLoading({ loading: false })
            setIsLoading({ loadMoreLoading: false })
            return data.data
        } catch (error) {
            console.log(error)
            setData([])
            setIsLoading({ loading: false })
        }
    }

    useEffect(() => {
        if (currentLanguage?.id) {
            getRssFeeds()
        }
    }, [currentLanguage, offset])

    const handleSubSelect = (cateSlug, subCateSlug, cateName, subCateName) => {
        getRssFeeds(cateSlug, subCateSlug)
        setSelectedCate(cateName)
        setSelectedSubCate(subCateName)
        // console.log("cateSlug", cateSlug)
        // console.log("subCateSlug", subCateSlug ? subCateSlug : '')
    };

    useEffect(() => {
    }, [selectedCate])

    const handleFeedSelection = (item) => {
        dispatch(setSelectedFeed({ data: item }))
        const trimmedName = item.feed_name.replace(/ +/g, "")
        router.push(`/rss-feed/${item.id}`)
    }

    const selectedCateSubCate = selectedCate && categories.find(cate => cate.category_name === selectedCate)

    return (
        <Layout>
            <section className='rssFeedSect'>
                <div className='row container mainRow'>
                    {
                        settings?.category_mode === '1' &&
                        <div className="col-12 filterDiv mb-2">
                            <div className='d-flex align-items-center gap-2 flex-wrap'>
                                <h1>{translate('filerBy')} : </h1>
                                <div className='feedFilterWrapper'>

                                    <div className='d-flex justify-content-between align-items-center px-1 filterSelect' onClick={() => setIsFilter(true)}>
                                        <h2>{selectedCate ? selectedCate : translate('selCatLbl')} </h2>
                                        <span>{isFilter ? <FaAngleUp /> : <FaAngleDown />} </span>
                                    </div>
                                    {
                                        isFilter &&
                                        <ul className='sub-menu mobile_catogories' onMouseLeave={() => setIsFilter(false)}>
                                            {
                                                selectedCate &&
                                                <li className='nav-item allFeed' onClick={() => handleSubSelect("", "", "", "")}>{translate('allLbl')}</li>
                                            }
                                            {categories &&
                                                categories?.map((element, index) => (
                                                    <li className='nav-item' key={index}>
                                                        <span
                                                            className='catNav-links'
                                                            onClick={() => handleSubSelect(element?.slug, '', element?.category_name, '')}
                                                        >
                                                            {' '}
                                                            {element.category_name}{' '}
                                                        </span>

                                                    </li>
                                                ))}
                                        </ul>
                                    }
                                </div>

                                {
                                    selectedCate && settings?.subcategory_mode === '1' && selectedCateSubCate?.sub_categories.length > 0 &&
                                    <div className='feedFilterWrapper'>
                                        <div className='d-flex justify-content-between align-items-center px-1 filterSelect' onClick={() => setIsSubCateFilter(true)}>
                                            <h2>{selectedSubCate ? selectedSubCate : translate('selSubCatLbl')} </h2>
                                            <span>{isSubCateFilter ? <FaAngleUp /> : <FaAngleDown />} </span>
                                        </div>
                                        {
                                            isSubCateFilter &&
                                            <ul className='sub-menu mobile_catogories' onMouseLeave={() => setIsSubCateFilter(false)}>

                                                {
                                                    selectedCateSubCate?.sub_categories?.map((element, index) => (
                                                        <li className='nav-item' key={index}>
                                                            <span
                                                                className='catNav-links'
                                                                onClick={() => handleSubSelect(selectedCateSubCate?.slug, element?.slug, selectedCateSubCate?.category_name, element?.subcategory_name)}
                                                            >
                                                                {' '}
                                                                {element?.subcategory_name}{' '}
                                                            </span>

                                                        </li>

                                                    ))}
                                            </ul>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    }

                    <div className="col-lg-8">
                        <div className="row rssFeedsRow">
                            {
                                isLoading.loading ? <div className="col-12 col-sm-6 col-md-4 col-xxl-3">
                                    <div className='loadingBox'>
                                        <Skeleton height={30} width={30} />
                                        <Skeleton height={20} width={115} />
                                    </div>
                                </div> :
                                    data && data ? data?.map((item) => {
                                        return <div className="col-12 col-sm-6 col-md-4 col-xxl-3" key={item?.feed_name}>
                                            <div onClick={() => handleFeedSelection(item)} target='_blank' className='rssFeedBox'>
                                                <span><IoLogoRss /></span>
                                                <h2>{truncateText(item?.feed_name, 14)}</h2>
                                            </div>
                                        </div>
                                    }) :
                                        <NoDataFound />
                            }

                            {totalData > dataPerPage && totalData !== data.length ? (
                                <div className="col-12">
                                    <LoadMoreBtn handleLoadMore={handleLoadMore} loadMoreLoading={isLoading.loadMoreLoading} />
                                </div>
                            ) : null}

                        </div>
                    </div>
                    <div className="col-lg-4">
                        <RecentNews />
                    </div>
                </div>
            </section>
        </Layout >
    )
}

export default RssFeeds
