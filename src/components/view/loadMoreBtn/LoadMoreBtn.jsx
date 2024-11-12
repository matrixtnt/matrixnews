import React, { useState } from 'react'
import LoadMoreSpinner from './LoadMoreSpinner'
import { translate } from 'src/utils'

const LoadMoreBtn = ({ handleLoadMore, loadMoreLoading }) => {

    return (
        <div className='mt-2'>
            {
                loadMoreLoading ? <LoadMoreSpinner /> :
                    <button onClick={handleLoadMore} className='loadMoreBtn commonBtn'>{translate('loadMore')}</button>
            }
        </div>
    )
}

export default LoadMoreBtn
