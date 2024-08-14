import Api from 'src/api/AxiosInterceptors'
import { GET_USER_NOTIFICATION } from 'src/utils/api'

export const getNotificationsApi = {
  getUserNotification: requestData => {
    const { offset, limit } = requestData
    return Api.get(GET_USER_NOTIFICATION, {
      params: {
        offset,
        limit,
        // user_id
      }
    })
  }
}
