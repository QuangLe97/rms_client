import api from '@/api'

export default {
  // update cv
  async updateCv ({commit}, payload) {
    // check receive data
    let result = false
    console.log('cv - before', payload)
    try {
      await api.update(payload)
      // notify the parent to update
      result = true
    } catch (e) {
      console.log('error when update cv', e)
    }

    commit('setUpdateSuccessfully', result)
  }
}
