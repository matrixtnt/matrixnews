import Api from 'src/api/AxiosInterceptors'
import { GET_PAGES } from 'src/utils/api'

export const getpagesApi = {
    getpages: requestData => {
    const { access_key, language_id } = requestData
    return Api.post(GET_PAGES, {
        access_key,
        language_id
    })
  },

}
