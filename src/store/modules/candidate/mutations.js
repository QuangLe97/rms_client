import { set } from '@/utils/vuex'

export default {
  setCandidates: set('candidates'),
  setCurrentFilter: set('currentFilter'),
  setDetailDialog: set('detailDialog'),
  setEditingButton: set('editingButton'),
  editCandidate (state, payload) {
    if (payload.index > -1) {
      state.candidates.data.splice(payload.index, 1)
    }
  },
  addCandidate (state, payload) {
    state.candidates.data.splice(payload.index, 0, payload.data)
  },
  setPage: set('page'),
  setItemsPerPage: set('itemsPerPage'),
  setPageCount: set('pageCount'),
  deleteCandidateById (state, payload) {
    let index = state.candidates.data.findIndex(x => x.id === payload)
    state.candidates.data.splice(index, 1)
  },
  deleteListCvByUserId (state, payload) {
    let index = state.listCvByUserId.data.findIndex(x => x.id === payload)
    state.listCvByUserId.data.splice(index, 1)
  },
  setUploadHistoryData: set('uploadHistoryData'),
  setListCvByUserId: set('listCvByUserId'),
  setCvInformationById: set('cvInfo'),
  setProcessCv: set('processCv'),
  setSessionHistory: set('sessionHistory'),
  createHiringSession (state, payload) {
    state.sessionHistory.splice(0, 0, payload)
  },
  setDetailSession: set('detailSession'),
  updateSession (state, payload) {
    let index = state.sessionHistory.findIndex(x => x.id === payload.data.id)
    state.sessionHistory.splice(index, 1, payload.data)
  },
  deleteSession (state, payload) {
    let index = state.sessionHistory.findIndex(x => x.id === payload)
    state.sessionHistory.splice(index, 1)
  },
  setViewId: set('viewId'),
  setSessionName: set('sessionName'),
  setSession: set('session'),
  setCreateSession: set('createSession')
}
