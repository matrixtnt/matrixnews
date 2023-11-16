import Api from 'src/api/AxiosInterceptors'
import { GET_COMMENT_BY_NEWS } from 'src/utils/api'

export const getCommentByNewsApi = {
    getCommentByNews: requestData => {
    const { access_key, offset, limit, user_id,news_id } = requestData
    return Api.post(GET_COMMENT_BY_NEWS, {
      access_key,
      user_id,
      news_id,
      offset,
      limit
    })
  }
}
