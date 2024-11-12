import Api from 'src/api/AxiosInterceptors'
import { GET_RSS_FEED } from 'src/utils/api'

export const getRssFeedApi = {
    getRssFeed: requestData => {
        const { language_id } = requestData
        return Api.post(GET_RSS_FEED, {
            language_id,
        })
    }
}
