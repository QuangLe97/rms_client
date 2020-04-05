export default {
  setGroupTopics: (state, data) => {
    state.groupTopics = data.splice(0)
  },
  setSummary: (state, data) => {
    state.summary = Object.assign({}, data)
  }
}
