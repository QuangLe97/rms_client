import axios from 'axios'

function getCookie (name) {
  console.log('get csrf token')
  var cookieValue = null
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';')
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim()
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

var csrftoken = getCookie('csrftoken')
const BASE_URL = 'http://172.16.1.76:5107/api/v1/'
const LOAD_PAGE_URL = 'http://172.16.1.30:5107'

export const HTTP_API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true

})
export const HTTP_API_SECURE = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})
HTTP_API_SECURE.defaults.headers['X-CSRFToken'] = csrftoken

HTTP_API.defaults.headers['X-CSRFToken'] = csrftoken

const LOG_IN = 'login'
const LOG_OUT = 'logout'
const CHECK_AUTH = 'auth/check'
const CV_APPROVAL = 'candidates/cv-approval'

// eslint-disable-next-line no-unused-vars
const GET_DRAFT_CANDIDATE = 'candidatefromcv'
const DELETE_DRAFT_CANDIDATE = 'candidatefromcv/delete'
const CV_GROUP = 'serializer/candidate-from-cv/group_by_user_and_date'
const GET_LIST_BY_ID = 'serializer/candidate-from-cv/get_list_cv_by_date'
const CV_INFO = 'serializer/candidate-from-cv'
const INTERVIEW_SCHEDULE = 'interview'
const UPLOAD_CV = 'upload'
const EXPORT_CSV = 'export_csv'
const GET_SESSION_HISTORY = 'serializer/period-recruit?fields=id,name_period_recruit,time_start,time_end,status_period,procedure'
const CREATE_SESSION = 'serializer/period-recruit/'
const GET_STAGE = 'serializer/period-recruit/get_info'
const GET_INTER = 'serializer/interview/get_schedule'
const UPDATE_INTER = 'serializer/interview/update_schedule/'
const GET_ALL_INTERVIEWER = 'serializer/users/get_interviewers'
const SESSION_DETAILS = 'serializer/period-recruit/'
const GET_CANDIDATE_HIRING = 'serializer/candidate-from-cv/get_cv_potential'
const GET_SCHEDULE_HIRING = 'serializer/hiring-session/'
const GET_NAME_SESSION = 'serializer/hiring-session/'
const GET_SESSION = 'serializer/hiring-session/'
const SEND_MAIL = 'send_email'
const CREATE_CV_PERIOD = 'serializer/candidate-info/add_multy_cv_to_period_recruit/'
// candidate
const GET_CANDI_LIST = 'serializer/candidate-info/'
const UPDEATE_INTERVIEW = 'serializer/result-round-interview/update_round/'
const GROUP_RESULT = 'serializer/result-group-interview/get_result_group/'
const TOPIC_RESULT = 'serializer/result-topic-interview/get_result_topic/'
const SUMMARY_RESULT = 'serializer/result-interview/result_summary_interview'
const GET_TEST_RESULT = 'serializer/interview/get_test_result'
const UPDATE_TEST_RESULT = 'serializer/interview/update_test_result/'
/*
* CV
*/
const GET_CV_LIST = 'serializer/candidate-from-cv/'
const ADD_CV_TO_CURRENT_HIRING = '/serializer/candidate-info/add_multy_cv_to_current_period_recruit/'
/*
 * Leader
 */
const LOAD_INTERVIEW_SCHEDULE = 'serializer/interview/get_schedule_for_current_user/'
const LOAD_GROUP_TOPICS = 'serializer/result-topic-interview/get_result_topic_v2/'
const UPDATE_TOPIC = 'serializer/result-topic-interview/update_result_topic/'
const LOAD_SUMMARY = 'serializer/result-group-interview/get_result_group_v2/'
const UPDATE_SUMMARY = 'serializer/result-group-interview/update_result_group/'
const CANDIDATE_MAN_TRAINING = 'serializer/result-training/get_result_detail_training'
const UPDATE_SUPERVISOR_OR_TIME = 'serializer/training/update_supervisor_or_time/'
const UPDATE_DESCRIPTION = 'serializer/training/update_description/'
const UPDATE_COMMENT = 'serializer/training/update_comment/'
const GET_SUPERVISORS = 'serializer/users/get_supervisors/'
export default {
  /*
  *  Auth
  */
  async signIn (payload) {
    return HTTP_API_SECURE({
      method: 'post',
      url: LOG_IN,
      data: payload
    })
  },

  async signOut (payload) {
    return HTTP_API({
      method: 'get',
      url: LOG_OUT
    })
  },

  async checkAuth () {
    console.log('API CHECK AUTH')
    return HTTP_API({
      method: 'get',
      url: CHECK_AUTH,
      headers: {
        'Authorization': localStorage.getItem('user_id') + ' ' + localStorage.getItem('token')
      }
    })
  },

  /**
   * Candidate
   */
  async getTestResult (payload) {
    return HTTP_API({
      method: 'get',
      url: GET_TEST_RESULT,
      params: payload
    })
  },
  async updateTestResult (payload) {
    return HTTP_API({
      method: 'patch',
      url: UPDATE_TEST_RESULT,
      data: payload.body
    })
  },
  async getCandidates () {
    return HTTP_API({
      method: 'get',
      url: GET_CANDI_LIST
    })
  },
  async updateCandidates (payload) {
    return HTTP_API({
      method: 'patch',
      url: GET_CANDI_LIST + `${payload.id}/`,
      data: payload.body
    })
  },
  async filterCandi (payload) {
    return HTTP_API({
      method: 'get',
      url: GET_CANDI_LIST,
      params: payload
    })
  },
  async deleteCandi (payload) {
    return HTTP_API({
      method: 'delete',
      url: GET_CANDI_LIST + payload
    })
  },
  async candiPage (payload) {
    return HTTP_API({
      method: 'get',
      url: payload
    })
  },
  async interviewUpdate (payload) {
    return HTTP_API({
      method: 'patch',
      url: UPDEATE_INTERVIEW,
      params: payload
    })
  },
  async get_schedule (id) {
    return HTTP_API({
      method: 'get',
      url: GET_CANDI_LIST + id + '/get_schedule/'
    })
  },
  async get_group_result (payload) {
    return HTTP_API({
      method: 'get',
      url: GROUP_RESULT,
      params: payload
    })
  },
  async get_topic_result (payload) {
    return HTTP_API({
      method: 'get',
      url: TOPIC_RESULT,
      params: payload
    })
  },
  async get_summary_result (payload) {
    return HTTP_API({
      method: 'get',
      url: SUMMARY_RESULT,
      params: payload
    })
  },
  /*
  *  Cv
  */
  async uploadCVs (payload) {
    let data = new FormData()
    payload.forEach((file) => {
      data.append('document', file)
    })
    return HTTP_API_SECURE({
      method: 'post',
      url: UPLOAD_CV,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  // barely used
  async getCvs () {
    return HTTP_API({
      method: 'get',
      url: GET_CV_LIST
    })
  },
  // payload: { search: keyword }
  async searchCv (payload) {
    return HTTP_API({
      method: 'get',
      url: GET_CV_LIST,
      params: payload
    })
  },
  // payload: { created_min: date, created_max: date }
  async getCvsFrom (payload) {
    return HTTP_API({
      method: 'get',
      url: GET_CV_LIST,
      params: payload
    })
  },
  // payload: url
  async loadPage (payload) {
    return HTTP_API({
      baseURL: LOAD_PAGE_URL,
      method: 'get',
      url: payload
    })
  },
  // add cv to current hiring sesison
  // payload: [ids]
  async addCvToHiring (payload) {
    return HTTP_API_SECURE({
      method: 'post',
      url: ADD_CV_TO_CURRENT_HIRING,
      data: payload
    })
  },

  /**
   * Leader api
   */
  async loadInterviewSchedule () {
    return HTTP_API_SECURE({
      method: 'get',
      url: LOAD_INTERVIEW_SCHEDULE
    })
  },

  async loadGroupTopics (param) {
    return HTTP_API({
      method: 'get',
      url: LOAD_GROUP_TOPICS,
      params: param
    })
  },
  async updateTopic (data) {
    return HTTP_API_SECURE({
      method: 'patch',
      url: UPDATE_TOPIC,
      data: data
    })
  },
  async loadSummary (param) {
    return HTTP_API_SECURE({
      method: 'get',
      url: LOAD_SUMMARY,
      params: param
    })
  },
  async updateSummary (data) {
    return HTTP_API_SECURE({
      method: 'patch',
      url: UPDATE_SUMMARY,
      data: data
    })
  },

  //

  // async getDraftCandidates (payload) {
  //   return HTTP_API({
  //     method: 'get',
  //     url: GET_DRAFT_CANDIDATE,
  //     params: payload
  //   })
  // },
  // async deleteDraftCandidate (payload) {
  //   return HTTP_API({
  //     method: 'delete',
  //     url: DELETE_DRAFT_CANDIDATE,
  //     params: payload
  //   })
  // },
  async getScheduleInterview (payload) {
    return HTTP_API({
      method: 'get',
      url: INTERVIEW_SCHEDULE,
      params: payload
    })
  },

  async cvApproval (payload) {
    return HTTP_API_SECURE({
      method: 'put',
      url: CV_APPROVAL,
      data: payload
    })
  },

  async getUploadHistory (payload) {
    return HTTP_API({
      method: 'get',
      url: CV_GROUP,
      data: payload
    })
  },

  async getListCvByUserId (payload) {
    return HTTP_API({
      method: 'get',
      url: GET_LIST_BY_ID,
      params: payload
    })
  },

  async getCvInformationById (payload) {
    return HTTP_API({
      method: 'get',
      url: CV_INFO,
      params: payload
    })
  },

  async exportCsv (payload) {
    return HTTP_API_SECURE({
      method: 'post',
      url: EXPORT_CSV,
      data: payload,
      responseType: 'blob'
    })
  },

  async deleteCandidateFromCv (payload) {
    return HTTP_API_SECURE({
      method: 'delete',
      url: `${CV_INFO}/${payload.id}/`
    })
  },

  async update (payload) {
    return HTTP_API_SECURE({
      method: 'patch',
      url: `${CV_INFO}/${payload.id}/`,
      data: payload.body
    })
  },

  async reject (payload) {
    return HTTP_API_SECURE({
      method: 'patch',
      url: `${CV_INFO}/${payload.id}/reject_cv/`,
      data: payload
    })
  },

  async getHiringSession (payload) {
    return HTTP_API({
      method: 'get',
      url: GET_SESSION_HISTORY
    })
  },

  async createHiringSession (payload) {
    return HTTP_API_SECURE({
      method: 'post',
      url: CREATE_SESSION,
      data: payload
    })
  },

  async getStage (payload) {
    return HTTP_API({
      method: 'get',
      url: GET_STAGE,
      params: payload
    })
  },

  async getInter (payload) {
    return HTTP_API({
      method: 'get',
      url: GET_INTER,
      params: payload
    })
  },

  async updateInter (payload) {
    return HTTP_API_SECURE({
      method: 'patch',
      url: UPDATE_INTER,
      data: payload
    })
  },

  async getAllInterviewer (payload) {
    return HTTP_API({
      method: 'get',
      url: GET_ALL_INTERVIEWER,
      params: payload
    })
  },

  async getDetailSession (payload) {
    return HTTP_API({
      method: 'get',
      url: `${SESSION_DETAILS}${payload.id}?fields=id,name_period_recruit,time_start,procedure,time_end,status_period,allow_delete`
    })
  },

  async updateSession (payload) {
    return HTTP_API_SECURE({
      method: 'patch',
      url: `${CREATE_SESSION}${payload.id}/`,
      data: payload
    })
  },

  async deleteSession (payload) {
    return HTTP_API_SECURE({
      method: 'delete',
      url: `${CREATE_SESSION}${payload.id}/`
    })
  },

  async getScheduleHiring (payload) {
    return HTTP_API({
      method: 'get',
      url: GET_SCHEDULE_HIRING
    })
  },
  async getSessionName (payload) {
    return HTTP_API({
      method: 'get',
      url: GET_NAME_SESSION,
      params: payload
    })
  },
  async getSession (payload) {
    return HTTP_API({
      method: 'get',
      url: `${GET_SESSION}${payload.id}`,
      params: payload
    })
  },

  async createSession (payload) {
    return HTTP_API_SECURE({
      method: 'post',
      url: GET_NAME_SESSION,
      data: payload
    })
  },

  async updateStatus (payload) {
    return HTTP_API_SECURE({
      method: 'patch',
      url: `serializer/interview/update_status/`,
      data: payload
    })
  },
  async getCandidateHiring (payload) {
    return HTTP_API({
      method: 'get',
      url: GET_CANDIDATE_HIRING,
      params: payload
    })
  },
  async addCvPeriod (payload) {
    return HTTP_API_SECURE({
      method: 'post',
      url: CREATE_CV_PERIOD,
      data: payload
    })
  },

  async sendMailCandidate (payload) {
    return HTTP_API_SECURE({
      method: 'post',
      url: SEND_MAIL,
      data: payload
    })
  },

  async manCandidateTrain (payload) {
    return HTTP_API_SECURE({
      method: 'get',
      url: CANDIDATE_MAN_TRAINING,
      params: payload
    })
  },
  async updateSupervisor (payload) {
    return HTTP_API_SECURE({
      method: 'patch',
      url: UPDATE_SUPERVISOR_OR_TIME,
      data: payload
    })
  },
  async updateDescription (payload) {
    return HTTP_API_SECURE({
      method: 'patch',
      url: UPDATE_DESCRIPTION,
      data: payload
    })
  },
  async updateComment (payload) {
    return HTTP_API_SECURE({
      method: 'patch',
      url: UPDATE_COMMENT,
      data: payload
    })
  },
  async getSupervisors (payload) {
    return HTTP_API_SECURE({
      method: 'get',
      url: GET_SUPERVISORS,
      params: payload
    })
  }
}
