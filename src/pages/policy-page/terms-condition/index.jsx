import dynamic from 'next/dynamic'
import Meta from 'src/components/seo/Meta'

const PolicyPages = dynamic(() => import('src/components/policyPages/PolicyPages'), { ssr: false })

const Index = () => {

    return (
        <>
            <Meta
                title={'Terms And Condition'}
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
