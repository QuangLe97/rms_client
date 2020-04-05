export default {
  status: '',
  token: localStorage.getItem('token') || '',
  user: {},
  buttonSignInLoading: false,
  alertSignIn: { value: false, type: 'success', title: ' test' },
  drawer: null,
  color: 'success',
  image: 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg'
}
