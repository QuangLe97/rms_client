import api from '@/api'

export default {
  // management cv
  async loadCvList ({commit}) {
    let result = []
    try {
      let response = await api.getCvs()
      result = response.data.results.splice(0)
    } catch (e) {
      console.log('error when get cv list', e)
    }
    commit('setCvList', result)
  },
  async loadCvsFrom ({commit}, payload) {
    let result = null
    let nextPage = null
    let prevPage = null
    let data = null

    try {
      let response = await api.getCvsFrom(payload)
      result = response.data
      nextPage = response.data.next
      prevPage = response.data.previous
      data = result.results.splice(0)
    } catch (e) {
      console.log('error when load cv list', e)
    }
    commit('setCvs', data)
    commit('setPrevPage', prevPage)
    commit('setNextPage', nextPage)
  },
  async loadCvPage ({commit}, payload) {
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
    commit('setCvs', data)
    commit('setNextPage', nextPage)
    commit('setPrevPage', prevPage)
  },
  async loadCandidatePage ({commit}, payload) {
    let nextPage = null
    let prevPage = null
    let data = null

    try {
      let response = await api.loadPage(payload)
      nextPage = response.next
      prevPage = response.prev
      data = response.results.splice(0)
    } catch (e) {
      console.log('error when load cv list', e)
    }
    commit('setCandidates', data)
    commit('setNextPage', nextPage)
    commit('setPrevPage', prevPage)
  },
  async updateCv ({commit}, payload) {
    try {
      await api.update(payload)

      // successfully
      commit('updateCv', payload)
    } catch (e) {
      console.log(e)
    }
  },
  async searchCv ({commit}, payload) {
    let nextPage = null
    let prevPage = null
    let data = null
    let response = null
    try {
      response = await api.searchCv(payload)
      nextPage = response.data.next
      prevPage = response.data.previous
      data = response.data.results.splice(0)
      console.log('search', response)
      console.log('nextpage', nextPage, 'prevpage', prevPage, 'data', data)
    } catch (e) {
      console.log('search error', e)
    }
    commit('setCvs', data)
    commit('setNextPage', nextPage)
    commit('setPrevPage', prevPage)
  },
  async addCvToHiring ({commit}, ids) {
    let result = {}
    let payload = {
      cv_raws: ids
    }
    try {
      let response = await api.addCvToHiring(payload)
      console.log('response when adding cv to current hiring sesison', response)
      result = Object.assign({}, response.data)
    } catch (e) {
      console.log('error when adding cv to current hiring sesison', e)
    }
    commit('updateCvs', result)
  }
  // management candidate
}
