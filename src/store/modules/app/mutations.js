import { set, toggle } from '@/utils/vuex'

export default {
  setDrawer: set('drawer'),
  setImage: set('image'),
  setColor: set('color'),
  toggleDrawer: toggle('drawer'),
  setUserSignIn: set('user'),
  setUserToken: set('token'),
  setButtonSignInLoading: set('buttonSignInLoading'),
  setAlertSignIn: set('alertSignIn')
}
