<template>
  <div id="app">
    <div v-if="!authLoggedIn">
      <WelcomePage/>
    </div>
    <v-app
      v-else
      id="inspire">
      <!-- App bar -->
      <v-app-bar
        class="navbar"
        app
        clipped-left>

        <v-toolbar-items class="hidden-md-and-up">
          <v-icon
            class="hidden-menu"
            @click="drawer = !drawer">mdi-menu</v-icon>
        </v-toolbar-items>
        <v-toolbar-title class="navbar__logo">F.Recruitment</v-toolbar-title>
        <v-toolbar-items class="navbar__nav-box hidden-sm-and-down">
          <div
            class="d-flex justify-center"
            style="width: 100%">

            <!-- Start main nav link -->
            <v-btn
              v-for="item in menu"
              :key="item.title"
              :to="item.link"
              text
              class="navbar__nav-box__navlink">
              {{ $t(item.title) }}
            </v-btn>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="transparent"
                  class="navbar__nav-box__navlink"
                  style="box-shadow: none"
                  v-on="on"
                >
                  {{ $t('header.management') }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in dropdown"
                  :key="index"
                  :to="item.link"
                >
                  <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <!-- End main nav link -->
          </div>
        </v-toolbar-items>
        <v-spacer/>
        <v-avatar>
          <img
            src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
            alt="John" >
        </v-avatar>
        <div style="height: 100%">
          <!-- Start language -->
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                color="transparent"
                class="navbar__nav-box__navlink"
                style="box-shadow: none"
                v-on="on"
              >
                {{ selectedLanguage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in languages"
                :key="index"
                :to="item.link"
                type=""
                @click="changeLocale(item)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- End language -->
        </div>

        <div class="my-2">
          <v-btn
            class="btn btn--tertiary btn--tertiary--white"
            small
            @click="onLogout">{{ $t('header.logout') }}</v-btn>
        </div>
      </v-app-bar>

      <!-- Start drawer menu -->
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"/>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider/>

        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="navlink in drawerMenu"
              :key="navlink.title"
              :to="navlink.link"
            >
              <!-- Single item -->
              <v-list-item-content
                v-if="navlink.subItem === undefined"
                @click="closeDrawer">
                <v-list-item-title v-text="$t(navlink.title)"/>
              </v-list-item-content>

              <!-- Multiple items -->
              <div
                v-else
                style="width: 100%; margin-left: -15px;">
                <v-list-group
                >
                  <template
                    v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title v-text="$t(navlink.title)"/>
                    </v-list-item-content>
                  </template>

                  <v-list-item
                    v-for="subLink in navlink.subItem"
                    :key="subLink.title"
                    :to="subLink.link"
                  >
                    <v-list-item-content @click="closeDrawer">
                      <v-list-item-title v-text="$t(subLink.title)"/>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>
              </div>

            </v-list-item>
          </v-list-item-group>
        </v-list>

      </v-navigation-drawer>
      <!-- End drawer menu -->

      <v-content>
        <div class="main-container">
          <router-view/>
        </div>
      </v-content>

      <v-footer
        absolute
        app
        class="blue-grey darken-3">
        <v-card-text
          class="justify-center white--text"
        >© 2019 - FUJINET SYSTEMS JSC | made by R&D Center</v-card-text>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import router from '@/router'
import {mapActions, mapGetters} from 'vuex'
import i18n from '@/i18n'

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    menu: [
      {
        title: 'header.dashboard',
        value: 'dashboard',
        link: '/dashboard'
      },
      {
        title: 'header.process',
        value: 'process cv',
        link: '/process-cv'
      },
      {
        title: 'header.session',
        value: 'hiring session',
        link: '/hiring-session'
      },
      {
        title: 'header.schedule',
        value: 'schedule',
        link: '/setup-schedule'
      }
    ],
    dropdown: [
      {
        title: 'header.cv',
        value: 'cvManagement',
        link: '/management/cv'
      },
      {
        title: 'header.candidate',
        value: 'candidateManagement',
        link: '/management/candidate'
      }
    ],
    drawerMenu: [
      {
        title: 'header.dashboard',
        value: 'dashboard',
        link: '/dashboard'
      },
      {
        title: 'header.process',
        value: 'process cv',
        link: '/process-cv'
      },
      {
        title: 'header.session',
        value: 'hiring session',
        link: '/hiring-session'
      },
      {
        title: 'header.schedule',
        value: 'schedule',
        link: '/setup-schedule'
      },
      {
        title: 'header.management',
        value: 'management',
        link: '',
        subItem: [
          {
            title: 'header.cv',
            value: 'cvManagement',
            link: '/management/cv'
          },
          {
            title: 'header.candidate',
            value: 'candidateManagement',
            link: '/management/candidate'
          }
        ]
      }
    ],
    languages: [
      { flag: 'us', language: 'en', title: 'English' },
      { flag: 'vn', language: 'vn', title: 'Tiếng Việt' }
    ],
    selectedLanguage: 'English'
  }),
  computed: {
    ...mapGetters('auth', ['authLoggedIn'])
  },
  created () {
    this.loadLoginSession()
  },
  methods: {
    ...mapActions('auth', ['logout', 'loadLoginSession']),

    async onLogout () {
      await this.logout({})
      sessionStorage.removeItem('token')
      sessionStorage.setItem('isLoading', false)
      router.push('/login')
    },

    // change language
    changeLocale (lang) {
      i18n.locale = lang.language
      this.selectedLanguage = lang.title
    },
    closeDrawer () {
      this.drawer = !this.drawer
    }
  }
}
</script>
<style lang="scss">
@import '@/scss/main.scss';
</style>
