'use client'
import React, { use, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout.jsx'
import BreadcrumbNav from 'src/components/breadcrumb/BreadcrumbNav.jsx'
import { NoDataFound, translate } from 'src/utils/index.jsx'
import { getPolicyPagesApi } from 'src/store/actions/campaign.js'
import { selectCurrentLanguage } from 'src/store/reducers/languageReducer.js'
import { useSelector } from 'react-redux'

const PolicyPages = ({ privacyPolicyPage }) => {

    const [isLoading, setIsLoading] = useState(false)

    const [data, setData] = useState([])

    const currentLanguage = useSelector(selectCurrentLanguage)


    const getPrivacyPolicyPages = () => {
        getPolicyPagesApi({
            language_id: currentLanguage.id,
            onSuccess: (res) => {
                const resData = res
                console.log('policy-pages-data =>', resData)
                setData(resData)
                setIsLoading(false)
            },
            onError: (err) => {
                setData([])
                setIsLoading(false)
                router.push('/')
                console.log(err)
            }
        })
    }

    useEffect(() => {
        getPrivacyPolicyPages()
    }, [currentLanguage])


    return (
        <Layout>
            <BreadcrumbNav SecondElement={translate('policyPages')}
                ThirdElement={privacyPolicyPage ? translate('priPolicy') : translate('termsandcondition')}
            />
            <section className='morePagesSlugPage container'>
                <div className="row">
                    <div className="col-12">
                        <div className="contentWrapper">
                            {isLoading ?
                                <Skeleton height={400} className='my-4' />
                                :
                                <div>
                                    {data ?
                                        <div
                                            id='pp-modal-body'
                                            className='p-3 mb-0'
                                            dangerouslySetInnerHTML={{ __html: privacyPolicyPage ? data?.privacy_policy?.page_content : data?.terms_policy?.page_content }}
                                        ></div>
                                        :
                                        <>
                                            {NoDataFound()}
                                        </>
                                    }
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </section>
        </Layout >
    )
}

export default PolicyPages