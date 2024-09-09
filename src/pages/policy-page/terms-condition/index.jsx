import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'
import { translate } from 'src/utils'

const PolicyPages = dynamic(() => import('src/components/policyPages/PolicyPages'), { ssr: false })

const Index = () => {

    const webName = process.env.NEXT_PUBLIC_WEB_NAME;

    return (
        <>
            <Meta
                title={`${webName} | ${translate('termsandcondition')}`}
                description={''}
                keywords={''}
                ogImage={''}
                pathName={''}
                schema={''}
            />
            <PolicyPages privacyPolicyPage={false}/>
        </>
    )
}

export default Index
