import api from '@/api'

export default {
  async getCandidateHiring ({commit}, payload) {
    let nextPage = null
    let prevPage = null
    let data = null
    try {
      const response = await api.getCandidateHiring(payload)
      console.log('get candidate hiring response', response)
      data = response.data.results.splice(0)
      nextPage = response.data.next
      prevPage = response.data.previous
    } catch (e) {
      console.log(e)
    }
    commit('setCandidateHiring', data)
    commit('setNextPage', nextPage)
    commit('setPrevPage', prevPage)
  },
  async addCvPeriod ({commit}, payload) {
    let result
    try {
      const response = await api.addCvPeriod(payload)
      result = response.data
      console.log('result add cv period', result)
    } catch (e) {
      console.log(e)
    }
    commit('setAddCv', result)
  },
  async loadHiringPage ({commit}, payload) {
    let nextPage = null
    let prevPage = null
    let data = null

    try {
      let response = await api.loadPage(payload)
      console.log('load page res', response)
      nextPage = response.data.next
      prevPage = response.data.previous
      data = response.data.results.splice(0)
    } catch (e) {
      console.log('error when load cv list', e)
    }
    commit('setCandidateHiring', data)
    commit('setNextPage', nextPage)
    commit('setPrevPage', prevPage)
  }
}
