'use client'

import { FiCalendar } from 'react-icons/fi'
import Link from 'next/link'
import { translate } from '../../utils'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { access_key, getLanguage } from 'src/utils/api'
import Layout from '../layout/Layout'
import Card from '../skeletons/Card'
import { locationData } from 'src/store/reducers/settingsReducer'
import { useSelector } from 'react-redux'
import { getNewsApi } from 'src/hooks/newsApi'

const TagNewsview = () => {
  const router = useRouter()
  const query = router.query
  const Tid = query.slug
  const location = useSelector(locationData)
  const storedLatitude = location && location.lat
  const storedLongitude = location && location.long
  let { id: language_id } = getLanguage()
  // api call
  const getNewsByTag = async () => {
    try {
      const { data } = await getNewsApi.getNews({
        access_key: access_key,
        slug: Tid,
        language_id: language_id,
        latitude: storedLatitude,
        longitude: storedLongitude
      })
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  // react query
  const { isLoading, data: Data } = useQuery({
    queryKey: ['getNewsByTag', Tid, query,location],
    queryFn: getNewsByTag
  })

  // tags
  const tagSplit = tag => {
    let tags = tag.split(',')
    return tags
  }

  return (
    <Layout>
      <div className='py-5 tagview bg-white'>
        <div className='container'>
          <div className='row'>
            {isLoading ? (
              <div className='row'>
                {[...Array(3)].map((_, index) => (
                  <div className='col-md-4 col-12' key={index}>
                    <Card isLoading={true} />
                  </div>
                ))}
              </div>
            ) : Data && Data.length > 0 ? (
              <>
                {Data &&
                  Data.map(element => (
                    <div className='col-md-4 col-12' key={element.id}>
                      <Link id='Link-all' href={{pathname:`/news/${element.slug}`,query: { language_id: element.language_id}}}>
                        <div id='ts-card' className='card'>
                          <img id='ts-card-image' src={element.image} className='card-img' alt={element.title} />

                          <div id='ts-card-body' className='card-body'>
                            <div className='tag_button'>
                              {tagSplit(element.tag_name).map((tag, index) => (
                                <button className='btn btn-sm tag-button' type='button' key={index}>
                                  {tag}
                                </button>
                              ))}
                            </div>

                            <h5 id='ts-card-title' className='card-title'>
                              {element.title.slice(0, 150)}...
                            </h5>
                            <p id='ts-card-date'>
                              <FiCalendar size={18} id='ts-logoCalendar' />
                              {element.date.slice(0, 10)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </>
            ) : (
              <div className='text-center my-5'>{translate('nodatafound')}</div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TagNewsview
