import Vue from 'vue'
import VueRouter from 'vue-router'

import BasicLayout from '@/views/Base'

import WelcomePage from '@/views/Login/WelcomePage'

import Dashboard from '@/views/TestVuetyfy'
// process cv
import ProcessCV from '../views/process cv/Home.vue'
import CVdetail from '../views/process cv/Detail.vue'
// hiring session
import HiringSession from '../views/hiring session/Home'
import HiringDetail from '../views/hiring session/Detail'
// management
import CV from '../views/management/CV'
import Candidate from '../views/management/Candidate.vue'
// old vision
// import AddCandidate from '../views/AddCandidate'
// import DraftCandidates from '../views/DraftCandidates'
// import ScheduleInterview from '../views/ScheduleInterview'
// import Recruitment from '../views/Recruitment'
// import Interviewer from '../views/Interviewer'
import Schedule from '../views/schedule/Schedule'
import LeaderHome from '@/views/leader views/Home'

Vue.use(VueRouter)

async function requireAuth (to, from, next) {
  // console.log(store.state.auth.loggedIn)
  // check login , loading, token ...
  // if (store.state.auth.loggedIn !== true || sessionStorage.getItem('token') !== 'token_ly') {

  /**
   * Need to be uncomment
   */
  next()
  // if (!sessionStorage.getItem('isLoading') || sessionStorage.getItem('token') !== 'token_ly') {
  //   next({
  //     path: '/login',
  //     query: { redirect: to.fullPath }
  //   })
  // } else {
  //   next()
  // }
}

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { path: '/login',
      meta: {
        public: true
      },
      component: WelcomePage
    },
    { path: '/leader',
      beforeEnter: requireAuth,
      component: LeaderHome
    },
    { path: '/',
      beforeEnter: requireAuth,
      component: BasicLayout,
      children: [
        {
          path: '',
          name: 'Root',
          beforeEnter: requireAuth,
          redirect: {
            name: 'Dashboard'
          }
        },
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard,
          beforeEnter: requireAuth
        },
        // {
        //   path: '/candidates',
        //   component: AddCandidate,
        //   name: 'Create Candidate',
        //   beforeEnter: requireAuth
        // },
        // process cv
        {
          path: '/process-cv',
          component: ProcessCV,
          name: 'Process cv',
          beforeEnter: requireAuth
        },
        {
          path: '/process-cv/detail',
          component: CVdetail,
          name: 'cvDetail',
          beforeEnter: requireAuth
        },
        // hiring session
        {
          path: '/hiring-session',
          component: HiringSession,
          name: 'hiringSession',
          beforeEnter: requireAuth
        },
        {
          path: '/hiring-session/detail/:id',
          component: HiringDetail,
          name: 'hiringDetail',
          beforeEnter: requireAuth
        },
        // management
        {
          path: '/management/CV',
          component: CV,
          name: 'cvManagement',
          beforeEnter: requireAuth
        },
        {
          path: '/management/candidate',
          component: Candidate,
          name: 'candidateManagement',
          beforeEnter: requireAuth
        },
        // old vision
        // {
        //   path: '/candidate-approval',
        //   component: DraftCandidates,
        //   name: 'Candidates approval',
        //   beforeEnter: requireAuth
        // },
        // {
        //   path: '/interview-schedule',
        //   component: ScheduleInterview,
        //   name: 'Interview Schedule',
        //   beforeEnter: requireAuth
        // },
        {
          path: '/setup-schedule',
          component: Schedule,
          name: 'Setup Schedule',
          beforeEnter: requireAuth
        },
        // {
        //   path: '/recruitment',
        //   component: Recruitment,
        //   name: 'Recruitment',
        //   beforeEnter: requireAuth
        // },
        // {
        //   path: '/interviewer',
        //   component: Interviewer,
        //   name: 'Interviewer',
        //   beforeEnter: requireAuth
        // },
        {
          path: '/logout',
          name: 'Logout',
          redirect: '/login'
        },
        {
          path: '*',
          name: 'Not found',
          redirect: '/dashboard'
        }
      ]
    }

  ]
})

Vue.use(VueRouter)

export default router
