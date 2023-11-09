import Api from 'src/api/AxiosInterceptors'
import { GET_LIVE_STREAMING } from 'src/utils/api'

export const getLiveStreamingApi = {
    getLiveStreaming: requestData => {
    const { access_key, language_id } = requestData
    return Api.post(GET_LIVE_STREAMING, {
        access_key,
        language_id
    })
  },

}
