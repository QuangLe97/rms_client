export default {
  auth_request (state) {
    state.status = 'loading'
  },
  auth_success (state) {
    state.message = 'Success!'
    state.loggedIn = true
    state.hasError = false
  },
  auth_error (state) {
    state.message = 'Username or Password incorrect'
    state.loggedIn = false
    state.hasError = true
  },
  logout (state) {
    state.message = ''
    state.loggedIn = false
    state.hasError = false
  }
}
