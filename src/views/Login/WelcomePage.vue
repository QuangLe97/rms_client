<template>
  <div class="k-container">
    <div class="big">
      <div class="k-logo"/>
      <h2 class="k-title">F.smart recruitment</h2>
      <p class="k-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci ipsum congue felis odio morbi. Dui ipsum amet, nibh amet, imperdiet integer montes, gravida. Et eget orci quis viverra. Sodales nunc ultricies facilisi maecenas purus volutpat at justo.</p>
      <p class="k-subtitle">Including</p>
      <div class="k-numbering">
        <div class="k-number">
          1
        </div>
        <div class="k-content">
          <div class="k-body">
            Upload CV, Process CV
          </div>
          <div class="k-sub-body">
            Help user to quickly extract detail from uploaded cv
          </div>
        </div>
      </div>
      <div class="k-numbering">
        <div class="k-number">
          2
        </div>
        <div class="k-content">
          <div class="k-body">
            Hiring Session
          </div>
          <div class="k-sub-body">
            Support actions about manage hiring sesison: create, add cv to session...
          </div>
        </div>
      </div>
      <div class="k-numbering">
        <div class="k-number">
          3
        </div>
        <div class="k-content">
          <div class="k-body">
            Setup Schedule
          </div>
          <div class="k-sub-body">
            Provide features relevant to organize schedule: sending mail, set up an appointment, dialogue
          </div>
        </div>
      </div>
      <div class="k-numbering">
        <div class="k-number">
          4
        </div>
        <div class="k-content">
          <div class="k-body">
            Management
          </div>
          <div class="k-sub-body">
            Store all candidate, cv editable information
          </div>
        </div>
      </div>
    </div>

    <div class="small">
      <h3 class="k-title">You need to login first to access our services</h3>
      <v-alert
        v-if="getMessage.length > 0"
        :type="hasError ? 'error' : 'success'">
        {{ this.getMessage }}
      </v-alert>
      <v-form
        ref="form"
        class="form"
        lazy-validation>

        <div>
          <div class="label">
            Username
          </div>
          <div class="input input--long">
            <v-text-field
              v-model="username"
              :rules="rules.username"
              dense
              solo
              @keyup.enter="onLogin"/>
          </div>
        </div>
        <div>
          <div class="label">
            Password
          </div>
          <div class="input input--long">
            <v-text-field
              v-model="password"
              :rules="rules.password"
              :type="showPassword ? 'text' : 'password'"
              dense
              solo
              @keyup.enter="onLogin"
              @click:append="showPassword = !showPassword"/>
          </div>
        </div>
        <div>
          <div class="label"/>
          <div class="input">
            <v-btn
              class="btn btn--primary"
              @click="onLogin">Login</v-btn>
            <div class="sub-actions">
              <p><strong>Forget password</strong></p>
              <p>Doesn't have account, <strong>register here!</strong></p>
            </div>
          </div>
        </div>
      </v-form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
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
    ...mapGetters('auth', ['hasError', 'getMessage']),
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
  @import "@/scss/pages/_welcome.scss";
  @import "@/scss/components/_form.scss";
  @import '@/scss/components/_btn.scss';
</style>
