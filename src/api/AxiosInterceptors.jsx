import axios from 'axios'
import { store } from 'src/store/store'

const Api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/Api/`
})

Api.interceptors.request.use(function (config) {
  let token = undefined


  if (typeof window !== 'undefined') {
    token = store.getState()?.token?.token
  }

  if (token) config.headers.authorization = `Bearer ${token}`

  return config
})
export default Api
