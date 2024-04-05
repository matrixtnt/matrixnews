'use client'
import React from 'react'
import Layout from '../../components/layout/Layout.jsx'
import BreadcrumbNav from 'src/components/breadcrumb/BreadcrumbNav.jsx'
import { translate } from '../../utils'
import { useRouter } from 'next/router.js'
import { getpagesApi } from 'src/hooks/getPagesApi'
import { useQuery } from '@tanstack/react-query'
import { access_key, getLanguage } from 'src/utils/api'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import { useSelector } from 'react-redux'
import NoDataFound from 'src/components/noDataFound/NoDataFound.jsx'
import Skeleton from 'react-loading-skeleton'

const SocialPages = () => {
  const router = useRouter()
//   console.log(router)

  let { id: language_id } = getLanguage()
  const currentLanguage = useSelector(selectCurrentLanguage)

  // api call
  const getpages = async () => {
    try {
      const { data } = await getpagesApi.getpages({
        access_key: access_key,
        language_id: language_id,
        slug: router?.query?.slug
      })
      return data.data

    } catch (error) {
      console.log(error)
    }
  }

  // react query
  const { isLoading, data: Data } = useQuery({
    queryKey: ['getPages', currentLanguage,router?.query?.slug],
    queryFn: getpages
  })
  return (
    <Layout>
      <BreadcrumbNav SecondElement={translate('More Pages')} ThirdElement={router?.query?.slug} />
      <section className='morePagesSlugPage container'>
        <div className="row">
          <div className="col-12">
            <div className="contentWrapper">
              {isLoading ? (
                <Skeleton height={400} />
              ) : (
                <div>
                  {Data && Data[0]?.page_content ? (
                    <div
                      id='pp-modal-body'
                      className='p-3 mb-0'
                      dangerouslySetInnerHTML={{ __html: Data && Data[0]?.page_content }}
                    ></div>
                  ) : (
                    <NoDataFound />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default SocialPages