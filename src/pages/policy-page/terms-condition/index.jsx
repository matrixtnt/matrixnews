import dynamic from 'next/dynamic'

const PolicyPages = dynamic(() => import('src/components/policyPages/PolicyPages'), { ssr: false })

const Index = () => {

    return (
        <>
            <PolicyPages privacyPolicyPage={false}/>
        </>
    )
}

export default Index
