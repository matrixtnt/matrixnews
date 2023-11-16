import Api from 'src/api/AxiosInterceptors'
import { GENERATE_TOKEN } from 'src/utils/api'

export const generateTokenApi = {
  generateToken: requestData => {
    const { access_key } = requestData
    return Api.post(GENERATE_TOKEN, {
      access_key
    })
  }
}
