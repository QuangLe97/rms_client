import api from '@/api'

export default {
  async updateTestResult ({commit}, payload) {
    try {
      await api.updateTestResult(payload)
    } catch (e) {
      console.log('error when update result of test', e)
    }
  },
  async loadTestResult ({commit}, payload) {
    let result
    try {
      let response = await api.getTestResult(payload)
      result = response.data[0]
      console.log('test result', result)
    } catch (e) {
      console.log('error when get test result', e)
    }
    commit('setTestResult', result)
  },
  async loadCandidates ({commit}) {
    let result = []
    let next = null
    let prev = null
    try {
      let response = await api.getCandidates()
      result = response.data.results.splice(0)
      next = response.data.next
      prev = response.data.previous
    } catch (e) {
      console.log('error when get candidate list', e)
    }
    commit('setCandidates', result)
    commit('setNextPage', next)
    commit('setPrevPage', prev)
  },
  async loadCandiPage ({commit}, payload) {
    let result = []
    let next = null
    let prev = null
    try {
      let response = await api.candiPage(payload)
      result = response.data.results.splice(0)
      next = response.data.next
      prev = response.data.previous
    } catch (e) {
      console.log('error when get candidate page', e)
    }
    commit('setCandidates', result)
    commit('setNextPage', next)
    commit('setPrevPage', prev)
  },
  async loadSessionName ({commit}) {
    let result = []
    try {
      let response = await api.getSessionName()
      result = response.data.results.splice(0)
      console.log('session name', result)
    } catch (e) {
      console.log('error when get Session Name', e)
    }
    commit('setSessions', result)
  },
  async filter ({commit}, payload) {
    let result = []
    let next = null
    let prev = null
    try {
      let response = await api.filterCandi(payload)
      result = response.data.results.splice(0)
      next = response.data.next
      prev = response.data.previous
    } catch (e) {
      console.log('error when get filter candidate', e)
    }
    commit('setCandidates', result)
    commit('setNextPage', next)
    commit('setPrevPage', prev)
  },
  async delete ({commit}, payload) {
    try {
      await api.deleteCandi(payload)
      commit('updateDelete', payload)
    } catch (e) {
      console.log('error when get filter candidate', e)
    }
  },
  async loadSchedule ({commit}, id) {
    let result = []
    try {
      let response = await api.get_schedule(id)
      result = response.data.splice(0)
    } catch (e) {
      console.log('error when get Schedule', e)
    }
    commit('setSchedule', result)
  },
  async loadGroupResult ({commit}, payload) {
    let result = []
    try {
      let respone = await api.get_group_result(payload)
      result = respone.data.splice(0)
    } catch (e) {
      console.log('error when get result of group', e)
    }
    commit('setGroupResult', result)
  },
  async loadTopicResult ({commit}, payload) {
    let result = []
    try {
      let respone = await api.get_topic_result(payload)
      result = respone.data.splice(0)
    } catch (e) {
      console.log('error when get result of topic', e)
    }
    commit('setTopicResult', result)
  },
  async loadSummaryResult ({commit}, payload) {
    let result = []
    try {
      let respone = await api.get_summary_result(payload)
      result = respone.data.results.splice(0)
    } catch (e) {
      console.log('error when get result of summary', e)
    }
    commit('setSummaryResult', result)
  },
  async updateCandi ({commit}, payload) {
    try {
      await api.updateCandidates(payload)
    } catch (e) {
      console.log('error when get result of summary', e)
    }
  },
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
  async updateTest ({commit}, payload) {
    let result
    try {
      const response = await api.updateTest(payload.data)
      result = response.data
      let newItem = {
        index: payload.index,
        data: result.data
      }
      commit('setUpdateSchedule', newItem)
      console.log(result)
    } catch (e) {
      console.log(e)
    }
  },
  async loadAllInterviewer ({commit}, payload) {
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
  async getEvaluateResultTrain ({commit}, payload) {
    let result
    try {
      let response = await api.manCandidateTrain(payload)
      console.log(response)
      result = response.data
    } catch (e) {
      console.log('error when get result of training data', e)
    }
    commit('setEvaluateResult', result)
  },
  async updateSupervisor ({commit}, payload) {
    let result
    try {
      const response = await api.updateSupervisor(payload)
      result = response.data
      console.log('result update supervisor', result)
    } catch (e) {
      console.log(e)
    }
    // commit('setAddCv', result)
  },
  async updateDescription ({commit}, payload) {
    let result
    try {
      const response = await api.updateDescription(payload)
      result = response.data
      console.log('result update description', result)
    } catch (e) {
      console.log(e)
    }
    // commit('setAddCv', result)
  },
  async updateComment ({commit}, payload) {
    let result
    try {
      const response = await api.updateComment(payload)
      result = response.data
      console.log('result update comment', result)
    } catch (e) {
      console.log(e)
    }
    // commit('setAddCv', result
  },
  async getSupervisor ({commit}, payload) {
    let result
    try {
      let response = await api.getSupervisors(payload)
      console.log(response)
      result = response.data
    } catch (e) {
      console.log(e)
    }
    commit('setSupervisorsResult', result)
  },
  deleteKeyEvaluateResultDescription ({commit}, key) {
    commit('deleteKeyEvaluateResultDescription', key)
  },
  deleteKeyEvaluateResultComment ({commit}, key) {
    commit('deleteKeyEvaluateResultComment', key)
  }
}
