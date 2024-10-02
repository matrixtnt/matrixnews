import Api from 'src/api/AxiosInterceptors'
import { GET_VIDEO } from 'src/utils/api'

export const getVideoNewsApi = {
    getVideoNews: requestData => {
        const { language_id, offset, limit } = requestData
        return Api.get(GET_VIDEO, {
            params: {
                language_id,
                offset,
                limit,
            }
        })
    }
}
