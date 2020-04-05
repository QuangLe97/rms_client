import { set } from '@/utils/vuex'

export default {
//   setCandidates: (state, payload) => {
//     state.candidates = null
//     state.candidates = payload
//   }
  setCandidates: set('candidates'),
  setSessions: set('sessions'),
  setNextPage: set('nextpage'),
  setPrevPage: set('prevpage'),
  setSchedule: set('schedule'),
  setGroupResult: set('groupResult'),
  setTopicResult: set('topicResult'),
  setSummaryResult: set('summaryResult'),
  setAllInterviewer: set('allInterviewer'),
  setTestResult: set('testResult'),
  setUpdateSchedule (state, newItem) {
    console.log(newItem)
    if (newItem.index > -1) {
      Object.assign(state.schedule[newItem.index], newItem.data)
    }
  },
  updateDelete: (state, payload) => {
    for (let i = 0; i < state.candidates.length; i++) {
      if (state.candidates[i].id === parseInt(payload)) {
        state.candidates.splice(i, 1)
        break
      }
    }
  },
  setEvaluateResult: set('evaluateResult'),
  setSupervisorsResult: set('supervisorsResult'),
  deleteKeyEvaluateResultDescription (state, key) {
    if (state.evaluateResult.description && state.evaluateResult.description[key]) {
      let newDescription = state.evaluateResult.description
      delete newDescription[key]
      let curState = state
      let newState = Object.assign(curState, {
        evaluateResult: {
          description: newDescription
        }
      })
      state = newState
      console.log(state.evaluateResult.description)
    }
  },
  deleteKeyEvaluateResultComment (state, key) {
    if (state.evaluateResult.comment && state.evaluateResult.comment[key]) {
      let newComment = state.evaluateResult.comment
      delete newComment[key]
      let curState = state
      let newState = Object.assign(curState, {
        evaluateResult: {
          comment: newComment
        }
      })
      state = newState
      console.log(state.evaluateResult.comment)
    }
  }
}
