import Api from 'src/api/AxiosInterceptors'
import { GET_USER_BY_ID } from 'src/utils/api'

export const getUserByIdApi = {
    getUserById: requestData => {
    const { access_key, user_id } = requestData
    return Api.post(GET_USER_BY_ID, {
      access_key,
      user_id,
    })
  }
}
