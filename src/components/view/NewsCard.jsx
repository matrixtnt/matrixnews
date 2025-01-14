import Link from 'next/link'
import React from 'react'
import { LuCalendarDays } from "react-icons/lu";
import { formatDate, placeholderImage } from 'src/utils'

const NewsCard = ({ element, subDropCard, tagCard }) => {
    return (
        <Link
            id='Link-all'
            href={{ pathname: `/news/${element.slug}`, query: { language_id: element.language_id } }}
            // as={`/news/${element.slug}`}
            title='detail-page'
        >
            <div id='cv-card' className='card commonNewsCard'>
                <img id='cv-card-image' src={element.image} className='card-img' alt={element.title} onError={placeholderImage} />
                <div id='cv-card-body' className='card-body'>
                    <button id='cv-btnCatagory'className='categoryTag' type='button'>
                        {tagCard ? element?.tag_name : element.category.category_name}
                    </button>
                    <p id='cv-card-title' className='card-title'>
                        {element.title}
                    </p>
                    {
                        !subDropCard &&
                        <p id='cv-card-date'>
                            <LuCalendarDays size={18} id='cv-logoCalendar' />
                            {formatDate(element.published_date)}
                        </p>
                    }
                </div>
            </div>
        </Link>
    )
}

export default NewsCard
