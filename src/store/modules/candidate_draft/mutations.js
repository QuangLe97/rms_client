import { set } from '@/utils/vuex'
export default {
  setItemsPerPage: set('itemsPerPage'),
  setPage: set('page'),
  setPageCount: set('pageCount'),
  setDraftCandidates: set('draftCandidates'),
  setDialog: set('dialog'),
  setOnDeleteLoading: set('onDeleteLoading'),
  addExperience (state, payload) {
    state.currentExperience.push(payload)
  },
  removeExperience (state, payload) {
    state.currentExperience.splice(state.currentExperience.indexOf(payload), 1)
  },
  setCurrentExperience: set('currentExperience'),
  setCurrentSkill: set('currentSkill'),
  addSkill (state, payload) {
    state.currentSkill.push(payload)
  },
  removeSkill (state, payload) {
    state.currentSkill.splice(state.currentSkill.indexOf(payload), 1)
  },
  setCurrentCert: set('currentCert'),
  addCert (state, payload) {
    state.currentCert.push(payload)
  },
  removeCert (state, payload) {
    state.currentCert.splice(state.currentCert.indexOf(payload), 1)
  },
  removeDraftCandidate (state, payload) {
    let index = state.draftCandidates.findIndex(x => x.id === payload)
    state.draftCandidates.splice(index, 1)
  }
}
