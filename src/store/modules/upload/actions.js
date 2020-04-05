import api from '@/api'
export default {
  async uploadCV ({commit}, payload) {
    let totalFiles = payload.length
    // payload: [cv]
    commit('setUploadProgress', true)

    try {
      let response = await api.uploadCVs(payload)
      let arrSuccess = response.data.data.successfully.slice(0)
      let arrFailure = response.data.data.failure.slice(0)

      // receive data
      console.log('arrSuccess', arrSuccess, 'arrFailure', arrFailure)

      // check arr list
      let returnArr = []
      if (totalFiles !== arrSuccess.length) {
        returnArr = payload.filter(item => {
          let found = arrFailure.find(failure => failure.file === item.name)
          if (found !== undefined) { // found
            item['msg'] = found.message
            return true
          }
        }
        )
      }

      console.log('returnArr', returnArr)

      commit('setUploadProgress', false)
      commit('setUploadedFiles', arrSuccess.length)
      commit('setFiles', returnArr)
      commit('setMessage', `Uploaded ${arrSuccess.length}/${totalFiles} files successfully `)
    } catch (e) {
      console.log(e)
    }
  }
}
