import Api from 'src/api/AxiosInterceptors'
import { GET_RSS_FEED } from 'src/utils/api'

export const getRssFeedApi = {
    getRssFeed: requestData => {
        const { language_id, offset, limit, category_id, category_slug, subcategory_id, subcategory_slug, tag_id, tag_slug, search } = requestData
        return Api.post(GET_RSS_FEED, {
            language_id,
            offset,
            limit,
            category_id,
            category_slug,
            subcategory_id,
            subcategory_slug,
            tag_id,
            tag_slug,
            search
        })
    }
}
