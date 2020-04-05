export default {
  authStatus: state => state.status,
  authLoggedIn: state => state.loggedIn,
  getMessage: state => state.message,
  hasError: state => state.hasError
}
