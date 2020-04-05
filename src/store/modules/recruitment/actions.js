import api from '@/api'

export default {
  async getScheduleInterview ({commit}, payload) {
    console.log('getSchedule')
    let result
    try {
      const response = await api.getScheduleInterview(payload)
      result = response.data
    } catch (e) {
      console.log(e)
      return
    }
    console.log(result.dt.data)
    commit('setScheduleInterview', result.dt.data)
    console.log(result.dt.data)
    commit('setPageCount', result.dt.total_page)
  }
}
