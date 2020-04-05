import { set } from '@/utils/vuex'

export default {
  setUploadProgress: set('uploadProgress'),
  setFiles: set('files'),
  setUploadedFiles: set('uploadedFiles'),
  setMessage: set('message'),
  setExperienceDialog: set('experienceDialog'),
  setSkillDialog: set('skillDialog'),
  setCertDialog: set('certDialog')
}
