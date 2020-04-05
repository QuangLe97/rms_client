import api from '@/api'

export default {
  async getDraftCandidates ({commit}, payload) {
    let result
    try {
      let response = await api.getDraftCandidates(payload)
      result = response.data
    } catch (e) {
      console.log(e)
      return
    }
    console.log(result.dt)
    commit('setDraftCandidates', result.dt.data)
    commit('setPageCount', result.dt.total_page)
  },
  async deleteDraftCandidate ({commit}, payload) {
    let result
    try {
      let response = await api.deleteDraftCandidate(payload)
      result = response.data
    } catch (e) {
      console.log(e)
      return
    }
    if (result.status === 200) {
      commit('removeDraftCandidate', payload.id)
    }
  }
}
