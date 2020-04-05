import { set } from '@/utils/vuex'

export default {
  setCvs: set('cvs'),
  setPrevPage: set('prevPage'),
  setNextPage: set('nextPage'),
  updateCv: (state, payload) => {
    let index = -1
    for (let i = 0; i < state.cvs.length; i++) {
      if (state.cvs[i].id === payload.id) {
        index = i
        break
      }
    }

    if (index !== -1) {
      let needUpdatedCv = Object.assign({}, state.cvs[index], payload.body)
      state.cvs.splice(index, 1, needUpdatedCv)
    }
  },
  updateCvs: (state, payload) => {
    console.log('payload', payload)
    try {
      let success = payload.succcesful
      let failure = payload.failure

      // remove cv success
      state.cvs.forEach((cv, index) => {
        if (success.includes(cv.id)) { // found
          state.cvs.splice(index, 1)
        }
      })

      // update cv failure
      state.cvs.forEach((cv, index) => {
        for (let i = 0; i < failure.length; i++) {
          if (failure[i].id === cv.id) {
            let updatedCv = Object.assign(cv, {error: failure[i].msg})
            state.cvs.splice(index, 1, updatedCv)
          }
        }
      })
      console.log('state', state.cvs)
      // newArr = Object.assign(newArr, failure)
      // state.cvs = newArr.splice(0)
    } catch (e) {
      console.log('error when retrieve success, failure from response add cv to current hiring sesison', e)
    }
  }
}
