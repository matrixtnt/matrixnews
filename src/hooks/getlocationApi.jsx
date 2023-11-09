import Api from 'src/api/AxiosInterceptors'
import { GET_LOCATION } from 'src/utils/api'

export const getlocationapi = {
    getlocation: requestData => {
    const { access_key } = requestData
    return Api.post(GET_LOCATION, {
      access_key,
    })
  }
}
