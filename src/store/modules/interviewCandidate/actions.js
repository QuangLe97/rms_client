import api from '@/api'

export default {
  async loadGroupTopics ({commit}, param) {
    try {
      let response = await api.loadGroupTopics(param)
      console.log('load group topics response', response)

      if (response.data !== undefined) {
        commit('setGroupTopics', response.data.results.slice(0))
      }
    } catch (e) {
      console.log('error when load group topics', e)
    }
  },
  async updateTopic ({commit}, data) {
    try {
      let response = await api.updateTopic(data)
      console.log('update topic response', response)
    } catch (e) {
      console.log('error when update topic', e)
    }
  },
  async loadSummary ({commit}, param) {
    try {
      let response = await api.loadSummary(param)
      console.log('load summary res', response)

      commit('setSummary', response.data)
    } catch (e) {
      console.log('error when load summary', e)
    }
  },
  async updateSummary ({commit}, data) {
    try {
      let response = await api.updateSummary(data)
      console.log('update summary response', response)

      commit('setSummary', data)
    } catch (e) {
      console.log('error when update summary', e)
    }
  }
}
