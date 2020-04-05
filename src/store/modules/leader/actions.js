import api from '@/api'

export default {
  async loadInterviewSchedule ({commit}) {
    try {
      let response = await api.loadInterviewSchedule()
      console.log('load interview schedule response', response)

      if (response.data.results.length > 0) {
        commit('setInterviewSchedule', response.data.results.splice(0))
      }
    } catch (e) {
      console.log('error when load interview schedule', e)
    }
  }
}
