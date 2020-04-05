import { set } from '@/utils/vuex'
export default {
  setItemsPerPage: set('itemsPerPage'),
  setPage: set('page'),
  setPageCount: set('pageCount'),
  setScheduleInterview: set('scheduleInterview'),
  setCurrentInterview: set('currentInterview'),
  setDataInfo: set('dataInfo'),
  setSchedule: set('schedule'),
  setDialog: set('dialog'),
  setAllInterviewer: set('allInterviewer'),
  setUpdateSchedule (state, newItem) {
    console.log(newItem)
    if (newItem.index > -1) {
      Object.assign(state.schedule[newItem.index], newItem.data)
    }
  },
  updateCandidateStatus (state, payload) {
    // payload structure
    // payload: { candidate_id, status_code, note }
    // find updated candidate
    let index = -1
    // test
    for (let i = 0; i < state.schedule.length; i++) {
      if (state.schedule[i].candidate__id === payload.candidate_id) {
        index = i
        break
      }
    }

    if (index !== -1) {
      if (payload.name_round === 'INTER-round 1' && (payload.status_code === 3 || payload.state_code === 4)) {
        console.log('remove candidate')
        state.schedule.splice(index, 1)
        return
      }
      let obj = Object.assign({}, state.schedule[index], payload)
      obj.status = obj.status_code
      console.log('updated candidate', obj)
      state.schedule.splice(index, 1, obj)
    }
  },
  setScheduleHiring: set('scheduleHiring')
}
