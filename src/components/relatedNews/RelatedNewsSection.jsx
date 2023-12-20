'use client'
import Link from 'next/link'
import { translate, truncateText } from '../../utils'
import Skeleton from 'react-loading-skeleton'
import { CategoriesApi } from 'src/hooks/categoriesApi'
import { access_key, getLanguage, getUser } from 'src/utils/api'
import { useQuery } from '@tanstack/react-query'
import { locationData } from 'src/store/reducers/settingsReducer'

const RelatedNewsSection = props => {
  const catid = props.Cid
  let user = getUser()
  let { id: language_id } = getLanguage()
  const location = useSelector(locationData)
  const storedLatitude = location && location.lat
  const storedLongitude = location && location.long

  // api call
  const getNewsByCategoryApi = async () => {
    try {
      const { data } = await CategoriesApi.getNewsByCategory({
        access_key: access_key,
        category_id: catid,
        subcategory_id: '',
        offset: '0',
        limit: '10',
        user_id: user,
        language_id: language_id,
        latitude: storedLatitude,
        longitude: storedLongitude
      })
      // Filter out elements with the same id as props.Cid
      const filteredData = data.data.filter(element => element.id !== props.Nid)
      return filteredData
    } catch (error) {
      console.log(error)
    }
  }

  // react query
  const { isLoading, data: Data } = useQuery({
    queryKey: ['realated-news-section', catid, props.Nid,location],
    queryFn: getNewsByCategoryApi
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <div>
      {isLoading ? (
        <div>
          <Skeleton height={200} count={3} />
        </div>
      ) : Data && Data.length > 0 ? (
        <div id='RNews-main'>
          <div id='RNews-cat-nav' className='navbar'>
            <h4 id='nav-logo' className='mb-0'>
              <b>{translate('related-news')}</b>
            </h4>
          </div>
          {Data &&
            Data.map(element => (
              <Link id='Link-all' href={`/news/${element.slug}`} key={element.id}>
                <div id='RNews-card' className='card' onClick={() => scrollToTop()}>
                  <img id='RNews-image' src={element.image} className='card-img-top' alt='...' />
                  <div id='RNews-card-body' className='RNews-card-body'>
                    <button id='btnRNewsCatagory' className='btn btn-sm' type='button'>
                      {element.category_name}
                    </button>
                    <h6 id='RNews-card-text' className='card-text'>
                      {truncateText(element.title, 100)}
                    </h6>
                  </div>
                  {}
                </div>
              </Link>
            ))}
        </div>
      ) : null}
    </div>
  )
}

export default RelatedNewsSection
