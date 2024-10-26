import Api from 'src/api/AxiosInterceptors'
import { GET_COMMENT_BY_NEWS } from 'src/utils/api'

export const getCommentByNewsApi = {
  getCommentByNews: requestData => {
    const { offset, limit, news_id } = requestData
    return Api.post(GET_COMMENT_BY_NEWS, {
      news_id,
      offset,
      limit
    })
  }
}
