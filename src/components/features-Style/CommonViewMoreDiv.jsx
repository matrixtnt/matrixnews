import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from 'src/store/reducers/languageReducer'
import { translate } from 'src/utils'

const CommonViewMoreDiv = ({ title, desc, link, styleSix }) => {


    const currentLanguage = useSelector(selectCurrentLanguage)

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div id='hns-head-main'>
            <div className='left-sec'>
                <p id='hns-main-logo' className='mb-0'>
                    {title}
                </p>
                <div className='short_desc'>{desc}</div>
            </div>
            {
                !styleSix ?
                    <Link id='hns-Viewmore'
                        href={{ pathname: link, query: { language_id: currentLanguage?.id } }}
                        // as={link}
                        onClick={() => scrollToTop()} className='commonBtn'>
                        {translate('viewMore')}
                    </Link> : null
            }
        </div>
    )
}

export default CommonViewMoreDiv
