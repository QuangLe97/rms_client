import api from '@/api'

export default {
  async getStage ({commit}, payload) {
    let result
    try {
      const response = await api.getStage(payload)
      result = response.data
      console.log(result)
    } catch (e) {
      console.log(e)
      return
    }
    commit('setDataInfo', result)
  },

  async getInter ({commit}, payload) {
    let result
    try {
      const response = await api.getInter(payload)
      result = response.data
      console.log('interview result', result)
    } catch (e) {
      console.log(e)
      return
    }
    commit('setSchedule', result)
  },

  async updateInter ({commit}, payload) {
    let result
    try {
      console.log(payload)
      const response = await api.updateInter(payload.data)
      result = response.data
      let newItem = {
        index: payload.index,
        data: result.data
      }
      commit('setUpdateSchedule', newItem)
    } catch (e) {
      console.log(e)
    }
  },

  async getAllInterviewer ({commit}, payload) {
    let result
    try {
      const response = await api.getAllInterviewer(payload)
      result = response.data
      console.log(result)
    } catch (e) {
      console.log(e)
      return
    }
    commit('setAllInterviewer', result.data)
  },

  async getScheduleHiring ({commit}, payload) {
    let result
    try {
      const response = await api.getScheduleHiring(payload)
      result = response.data
      console.log(result)
    } catch (e) {
      console.log(e)
      return
    }
    if (result.count > 0) {
      commit('setScheduleHiring', result.results)
    }
  },

  async updateStatusAction ({commit}, payload) {
    try {
      let res = await api.updateStatus(payload)
      console.log('res update status action', res)
      commit('updateCandidateStatus', payload)
    } catch (e) {
      console.log('error when update candidate status', e)
    }
  },

  // need real test
  async sendMail ({commit}, payload) {
    let result
    console.log('Send Mail')
    try {
      const response = await api.sendMailCandidate(payload)
      result = response.data
      console.log('send mail response', response)
    } catch (e) {
      console.log('error sent mail to candidate', e)
    }
    return result
  }
}
