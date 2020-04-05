export default {
  getCandidates: state => state.candidates,
  getSessions: state => state.sessions,
  getNextPage: state => state.nextpage,
  getPrevPage: state => state.prevpage,
  getSchedule: state => state.schedule,
  getGroupResult: state => state.groupResult,
  getTopicResult: state => state.topicResult,
  getSummaryResult: state => state.summaryResult,
  getAllInterViewer: state => state.allInterviewer,
  getEvaluateResult: state => state.evaluateResult,
  getTestResult: state => state.testResult,
  getSupervisorsResult: state => state.supervisorsResult,
  getItemContents: state => state.evaluateResult.description ? state.evaluateResult.description : {},
  getItemComment: state => state.evaluateResult.comment ? state.evaluateResult.comment : {}
}
