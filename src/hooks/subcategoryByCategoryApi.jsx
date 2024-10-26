import Api from 'src/api/AxiosInterceptors'
import { GET_SUBCATEGORY_BY_CATEGORY } from 'src/utils/api'

export const getsubcategorybycategoryApi = {
  getsubcategorybycategory: requestData => {
    const { category_id, language_id } = requestData
    return Api.post(GET_SUBCATEGORY_BY_CATEGORY, {
        category_id,
        language_id
      })
  }
}
