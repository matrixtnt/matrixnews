import Api from 'src/api/AxiosInterceptors'
import { GET_BREAKING_NEWS } from 'src/utils/api'

export const AllBreakingNewsApi = {
  getBreakingNews: requestData => {
    const { language_id, access_key } = requestData
    return Api.post(GET_BREAKING_NEWS, {
      language_id,
      access_key
    })
  }
}
