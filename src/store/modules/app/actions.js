// import api from '@/api'
// import router from '@/router'
//
// export default {
//   async signIn ({ commit }, payload) {
//     console.log('login')
//     let result
//     commit('setButtonSignInLoading', true)
//     try {
//       const response = await api.signIn(payload)
//       result = response.data
//     } catch (e) {
//       console.log(e)
//       commit('setButtonSignInLoading', false)
//       commit('setAlertSignIn', { type: 'error', title: 'Network Error!!!', value: true })
//       // localStorage.token = 'token_ly'
//       // router.replace(window.location.pathname.query.redirect || '/')
//       // router.push('/dashboard')
//       return
//     }
//     if (result.err === 0) {
//       console.log(result)
//       console.log('result code: ' + result.err)
//       // commit('setUserSignIn', true)
//       // localStorage.setItem('user_id', result.data.user_id)
//       // localStorage.setItem('token', result.data.token)
//       // console.log(localStorage.getItem('user_id'+ 'token'))
//       router.push('/dashboard')
//     } else {
//       console.log(result)
//       commit('setAlertSignIn', { type: 'error', title: result.message, value: true })
//     }
//     commit('setButtonSignInLoading', false)
//   },
//   async signOut ({ commit }) {
//     // let result
//     try {
//       await api.signOut()
//       // result = response.data
//       // console.log('logout result: ')
//       // console.log(result)
//     } catch (e) {
//       // console.log(e)
//     }
//     // if (result.err === 0) {
//     //   commit('setUserSignIn', false)
//     //   router.push('/sign-in')
//     // } else {
//     //   console.log(result)
//     //   commit('share/setAlert', { type: 'error', title: result.msg, value: true }, { root: true })
//     // }
//     localStorage.removeItem('token')
//     localStorage.removeItem('user_id')
//     router.push('/sign-in')
//   },
//   setAlertSignIn ({ commit }, payload) {
//     commit('setAlertSignIn', payload)
//   }
// }
