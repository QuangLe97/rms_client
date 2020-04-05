import api from '@/api'

export default {

  async searchSearch ({commit}, payload) {
    let result
    try {
      const response = await api.searchCandidates(payload)
      console.log(response)
      result = response.data.dt
    } catch (e) {
      console.log(e)
      return
    }
    // if (result.err === 0 ) {
    //   commit('setCandidates', result.dt)
    // }
    commit('setCandidates', result)
    commit('setPageCount', result.total_page)
  },

  async create ({commit, dispatch}, payload) {
    let result
    console.log(payload)
    try {
      const response = await api.createCandidate(payload)
      result = response.data
    } catch (e) {
      console.log(e)
      return
    }
    if (result.status === 200) {
      commit('candidate_draft/setDialog', false, {root: true})
      commit('candidate_draft/setCurrentExperience', [], {root: true})
      commit('candidate_draft/setCurrentSkill', [], {root: true})
      commit('candidate_draft/setCurrentCert', [], {root: true})
    }
  },

  async delete ({commit}, payload) {
    let result
    try {
      const response = await api.deleteCandidate(payload)
      result = response.data
    } catch (e) {
      console.log(e)
      return
    }
    if (result.status === 200) {
      commit('deleteCandidateById', payload.id)
    }
  },

  async cvApproval ({commit}, payload) {
    let result
    try {
      const response = await api.cvApproval(payload)
      result = response.data
    } catch (e) {
      console.log(e)
    }
    if (result.status === 200) {
      commit('deleteCandidateById', payload.id)
    }
  },

  async getUploadHistory ({commit}, payload) {
    let result
    try {
      const response = await api.getUploadHistory(payload)
      result = response.data
      console.log(result)
    } catch (e) {
      console.log(e)
    }

    commit('setUploadHistoryData', result)
  },

  async getListCvByUserId ({commit}, payload) {
    let result
    console.log('getListCvByUserId', payload)
    try {
      const response = await api.getListCvByUserId(payload)
      result = response.data
      console.log(result)
    } catch (e) {
      console.log(e)
    }

    commit('setListCvByUserId', result)
  },

  async getCvInformationById ({commit}, payload) {
    let result
    try {
      console.log('payload: ', payload)
      const response = await api.getCvInformationById(payload)
      result = response.data
      console.log('get cv result: ', result)

      // check not found === count = 0
      if (result.count === 0) {
        return {
          isSuccessful: false
        }
      }
      let findedCv = result.results[0]
      commit('setCvInformationById', result)
      return {
        isSuccessful: true,
        id: findedCv.id,
        cv: findedCv.cv,
        confirm: findedCv.confirm,
        status: findedCv.status
      }
    } catch (e) {
      console.log(e)
    }
  },

  setProcessCv ({commit}, payload) {
    console.log(payload)
    commit('setProcessCv', payload)
  },

  async exportCsv ({commit}, payload) {
    try {
      let response = await api.exportCsv(payload)
      const filename = response.request.getResponseHeader('Content-Disposition')
      const file = new Blob([response.data])
      console.log(filename)
      let fileURL = window.URL.createObjectURL(file)
      let fileLink = document.createElement('a')
      fileLink.href = fileURL
      fileLink.setAttribute('download', 'file.csv')
      document.body.appendChild(fileLink)

      fileLink.click()
      console.log('export xong')
    } catch (e) {
      console.trace(e)
    }
  },

  async deleteCandidateFromCv ({commit}, payload) {
    try {
      let result = await api.deleteCandidateFromCv(payload)
      // if success return 0
      if (result.status === 204) {
        return 0
      }
      return 1
    } catch (e) {
      console.log(e)
    }
    // commit('deleteListCvByUserId', payload.id)
  },

  async update ({commit}, payload) {
    try {
      let result = await api.update(payload)
      // if success return 0
      if (result.status === 200) {
        return 0
      }
      return 1
    } catch (e) {
      console.log(e)
    }
  },

  async reject ({commit}, payload) {
    try {
      console.log('reject api: ', payload)
      let result = await api.reject(payload)
      // if succeed return 0
      if (result.status === 200) {
        return 0
      }
      return 1
    } catch (e) {
      console.log(e)
    }
  },

  async getHiringSession ({commit}, payload) {
    let result
    try {
      let response = await api.getHiringSession(payload)
      result = response.data
    } catch (e) {
      console.log(e)
    }
    console.log('session History')
    console.log(result)
    commit('setSessionHistory', result)
  },

  async createHiringSession ({commit}, payload) {
    let result
    try {
      let response = await api.createHiringSession(payload)
      result = response.data
    } catch (e) {
      console.log(e)
    }
    console.log('hiring History')
    console.log(result)
    commit('createHiringSession', result)
  },

  async getDetailSession ({commit}, payload) {
    let result
    try {
      let response = await api.getDetailSession(payload)
      result = response.data
    } catch (e) {
      console.log(e)
    }
    console.log(result)
    commit('setDetailSession', result)
  },

  async updateSession ({commit}, payload) {
    let result
    try {
      let response = await api.updateSession(payload)
      result = response.data
    } catch (e) {
      console.log(e)
    }
    console.log(result)
    commit('updateSession', result)
  },

  async deleteSession ({commit}, payload) {
    try {
      let response = await api.deleteSession(payload)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
    commit('deleteSession', payload.id)
  },

  async getSessionName ({commit}, payload) {
    let result
    try {
      let response = await api.getSessionName(payload)
      result = response.data
      console.log(result)
    } catch (e) {
      console.log(e)
    }
    commit('setSessionName', result)
  },

  async getSessionN ({commit}, payload) {
    let result
    try {
      let response = await api.getSession(payload)
      result = response.data
      console.log(result)
    } catch (e) {
      console.log(e)
    }
    commit('setSession', result)
  },
  async createSessions ({commit}, payload) {
    let result
    try {
      let response = await api.createSession(payload)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
    commit('setCreateSession', result)
  },

  async changeSessionHistory ({commit}, payload) {
    commit('setSessionHistory', payload.data)
  },


}
