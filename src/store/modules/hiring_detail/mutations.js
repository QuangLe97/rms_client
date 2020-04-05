import { set } from '@/utils/vuex'
export default {
  setCandidateHiring: set('candidateHiring'),
  editCandidateHiring: (state, payload) => {
    let index = -1
    for (let i = 0; i < state.candidateHiring.length; i++) {
      if (state.candidateHiring[i].id === payload.id) {
        index = i
        break
      }
    }

    if (index !== -1) {
      let needUpdatedCv = Object.assign({}, state.candidateHiring[index], payload.body)
      state.candidateHiring.splice(index, 1, needUpdatedCv)
    }
  },
  setHiringDetailId: set('hiringDetailId'),
  setNextPage: set('nextPage'),
  setPrevPage: set('prevPage'),
  setAddCv (state, result) {
    console.log('state in set add cv', state)
    let candidateHirings = []
    candidateHirings = state.candidateHiring.splice(0)
    candidateHirings.forEach((item) => {
      console.log(item)
      delete item['error']
    })
    const items = result.succcesful
    const itemFail = result.failure
    // let index = state.candidateHiring.results.findIndex(x => x.id === payload.cv_raws)
    console.log('length of item success', items)
    console.log(items)
    console.log(itemFail)

    items.forEach(item => {
      let index = candidateHirings.findIndex(candidate => candidate.id === item)
      if (index > -1) {
        console.log(index)
        candidateHirings.splice(index, 1)
      }
    })

    itemFail.forEach(item => {
      let index = candidateHirings.findIndex(candidate => {
        return candidate.id === item.id
      })
      if (index > -1) {
        console.log(index)
        candidateHirings[index].error = item.msg
        console.log(item.msg)
      }
    })
    state.candidateHiring = candidateHirings.splice(0)
    console.log(state.candidateHiring.results)
  }
}
