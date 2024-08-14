'use client'
import { NoDataFound } from '../../utils'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { getLanguage } from 'src/utils/api'
import Layout from '../layout/Layout'
import Card from '../skeletons/Card'
import { getNewsApi } from 'src/hooks/newsApi'
import NewsCard from '../view/NewsCard'


const TagNewsview = () => {
  const router = useRouter()
  const query = router.query
  const tagSlug = query.slug
  let { id: language_id } = getLanguage()
  // api call
  const getNewsByTag = async () => {
    try {
      const { data } = await getNewsApi.getNews({
        tag_slug: tagSlug,
        language_id: language_id,
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }

  // react query
  const { isLoading, data: Data } = useQuery({
    queryKey: ['getNewsByTag', tagSlug, query],
    queryFn: getNewsByTag
  })

  // tags
  const tagSplit = tag => {
    if (tag && typeof tag === 'string') {
      return tag.split(',');
    } else {
      // Handle the case where tag is not a string or is undefined
      return [];
    }
  }

  return (
    <Layout>
      <div className='py-5 tagview bg-white'>
        <div className='container'>
          <div className='row'>
            {isLoading ? (
              <div className='row'>
                {[...Array(4)].map((_, index) => (
                  <div className='col-lg-3 col-sm-6 col-md-4 col-12' key={index}>
                    <Card isLoading={true} />
                  </div>
                ))}
              </div>
            ) : Data && Data.error !== true ? (
              <>
                {Data &&
                  Data?.data?.map(element => (
                    <div className='col-md-4 col-lg-3 col-sm-6 col-12' key={element.id}>
                      <NewsCard element={element} tagCard={true} />
                    </div>
                  ))}
              </>
            ) : (
              <>
                {NoDataFound()}

              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TagNewsview
