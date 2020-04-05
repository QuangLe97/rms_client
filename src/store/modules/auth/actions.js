import api from '@/api'
import router from '@/router'

export default {

  // login action
  async login ({commit}, payload) {
    let result
    commit('auth_request')
    try {
      const response = await api.signIn(payload)
      result = response.data
      console.log(response)
    } catch (e) {
      commit('auth_error')
      return
    }
    if (result.results !== null) {
      commit('auth_success')
      sessionStorage.setItem('isLoading', true)
      sessionStorage.token = 'token_ly'
      setTimeout(() => {
        router.push(router.history.current.query.redirect || '/dashboard')
      }, 1000)
      // location.reload()
    } else {
      commit('auth_error')
    }
  },
  loadLoginSession ({commit}) {
    let loginToken = sessionStorage.getItem('token')
    if (loginToken === 'token_ly') { // already logined
      commit('auth_success')
    }
  },

  // Log Out
  async logout ({commit}, payload) {
    let result
    try {
      result = await api.signOut(payload)
      console.log('logout result', result)
    } catch (e) {
      console.log('error when logout', e)
      return
    }

    commit('logout')
  }
}
