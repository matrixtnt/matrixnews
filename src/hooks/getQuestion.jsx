import Api from 'src/api/AxiosInterceptors'
import { GET_QUESTION } from 'src/utils/api'
import { GET_QUESTION_RESULT } from 'src/utils/api'

export const getQuestionApi = {
    getQuestion: requestData => {
        const { language_id } = requestData
        return Api.post(GET_QUESTION, {
                language_id,
                // user_id,
            })
    },
    getQuestionResult: requestData => {
        const { language_id, question_id } = requestData
        return Api.post(GET_QUESTION_RESULT, {
                language_id,
                question_id,
            })
    }
}