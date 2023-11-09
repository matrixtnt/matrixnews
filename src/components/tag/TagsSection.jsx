'use client'

import { useState } from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import { gettagsApi } from '../../store/actions/campaign'
import { selectCurrentLanguage } from '../../store/reducers/languageReducer'
import { useSelector } from 'react-redux'
import { translate } from '../../utils'
import Skeleton from 'react-loading-skeleton'

const TagsSection = () => {
  const [Data, setData] = useState([])
  const currentLanguage = useSelector(selectCurrentLanguage)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    gettagsApi(
      response => {
        setData(response.data)
        setLoading(false)
      },
      error => {
        if (error === 'No Data Found') {
          setData('')
          setLoading(false)
        }
      }
    )
  }, [currentLanguage])

  return (
    <div>
      {loading ? (
        <div>
          <Skeleton height={200} count={3} />
        </div>
      ) : Data && Data.length > 0 ? (
        <div id='rns-tags-main' className='my-3'>
          <div id='tags-nav' className='navbar'>
            <h4 id='rns-nav-logo' className='mb-0'>
              <b>{translate('tagLbl')}</b>
            </h4>
          </div>
          <div id='tags-tag'>
            {Data &&
              Data.map(element => (
                <Link id='btnTags' key={element.id} href={`/tag/${element.id}`} className='btn btn-outline-dark'>
                  {element.tag_name}
                </Link>
              ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default TagsSection
