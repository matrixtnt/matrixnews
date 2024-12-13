import Link from 'next/link'
import React from 'react'
import { LuCalendarDays } from "react-icons/lu";
import { formatDate, placeholderImage } from 'src/utils'

const FeedCard = ({ element, subDropCard, tagCard }) => {
    return (
        <Link
            id='Link-all'
            href={{ pathname: element.link }}
            // as={`/news/${element.slug}`}
            title='detail-page'
            target='_blank'
        >
            <div id='cv-card' className='card rssFeedCard'>
                {element.image && <img id='cv-card-image' src={element.image} className='card-img' alt={element.title} onError={placeholderImage} />}

                <div id='cv-card-body' className='card-body'>
                    <p id='cv-card-title' className='card-title'>
                        {element.title}
                    </p>
                    <p className='card-description'>
                        {element?.description?.substring(0, 120)}
                    </p>
                    {
                        !subDropCard &&
                        <p id='cv-card-date'>
                            <LuCalendarDays size={18} id='cv-logoCalendar' />
                            {formatDate(element.pubDate)}
                        </p>
                    }
                </div>
            </div>
        </Link>
    )
}

export default FeedCard
