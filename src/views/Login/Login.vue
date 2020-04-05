<template>
  <v-container
    class="fill-height"
    fluid>
    <v-row
      class="fill-height">
      <v-col
        cols="7"
        style="background-color: green"/>
      <v-col cols="5">
        <p style="color: red;text-align: center">{{ this.loginFail }}</p>
        <v-card width="600">
          <h1 class="card-title">Login</h1>
          <v-divider/>
          <v-card-text>
            <v-form
              ref="form"
              lazy-validation>
              <v-text-field
                v-model="username"
                :rules="rules.username"
                label="Username"
                prepend-icon="mdi-account-circle"
                @keyup.enter="onLogin"
              />
              <v-text-field
                v-model="password"
                :rules="rules.password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                label="Password"
                prepend-icon="mdi-lock"
                @keyup.enter="onLogin"
                @click:append="showPassword = !showPassword"
              />
              <v-row>
                <v-spacer/>
                <div class="my-2">
                  <v-btn
                    text
                    small
                    color="primary">Forgot password?</v-btn>
                </div>

              </v-row>

            </v-form>
          </v-card-text>
          <v-divider/>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              class="btn btn--secondary">Register</v-btn>
            <v-btn
              class="btn btn--primary"
              @click="onLogin">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {mapState, mapActions} from 'vuex'
// import router from '@/router'

export default {
  name: 'Login',
  data: () => ({
    showPassword: false,
    username: '',
    password: '',
    rules: {
      username: [v => !!v || 'Username is required'],
      password: [v => !!v || 'Password is required']
    }

  }),
  computed: {
    ...mapState('auth', ['loggedIn', 'status']),
    isLoggedIn () {
      return this.loggedIn
    },
    loginFail () {
      if (this.loggedIn === false && this.status !== '') {
        return this.status
      } else {
        return ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    async onLogin () {
      if (this.$refs.form.validate()) {
        let payload = {username: this.username, password: this.password}
        await this.login(payload)
      }
    }
  }
}

</script>
<style lang="scss">
  @import "../../scss/pages/setup_schedule";
  @import '../../scss/components/form';
</style>
