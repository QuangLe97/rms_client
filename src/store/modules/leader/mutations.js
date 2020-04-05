export default {
  setInterviewSchedule: (state, data) => {
    state.interviewSchedule = data.splice(0)
  }
}
