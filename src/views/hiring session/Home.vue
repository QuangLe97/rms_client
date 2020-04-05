<template>

  <!--  <div class="container text-center">-->
  <!--    <h3 class="heading">-->
  <!--      Hiring session-->
  <!--    </h3>-->
  <!--  </div>-->
  <div class="hiring-session">
    <v-row>
      <v-col class="container">
        <div class="title-box">
          <div class="heading">
            {{ $t('hiring.home.header') }}
          </div>
          <!-- <div class="sub-heading">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque, omnis. Incidunt id magnam aperiam voluptate neque illum dolores vero molestias.
          </div> -->
        </div>
      </v-col>
      <v-col>
        <div class="illustration">
          <v-img
            :src="require('@/assets/images/hiring_illustration.png')"
            max-width="40vw"
            max-height="40vh"/>
        </div>
      </v-col>
    </v-row>
    <div>
      <v-container>

        <v-row>
          <v-col
            cols="3"
          >
            <v-list class="left-list box">
              <!-- List header -->
              <div class="box-heading">
                <h3 class="box-heading__title">{{ $t('hiring.home.ses') }}</h3>

                <!-- Add hiring session -->
                <v-dialog
                  v-model="dialog2"
                  persistent
                  max-width="270px">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="btn btn--primary"
                      small
                      @click="newSes">
                      {{ $t('hiring.home.btnAdd') }}
                    </v-btn>
                  </template>
                  <v-card>
                    <h3
                      class="card-title">{{ this.dialogTitle }}</h3>
                    <!-- <span class="headline">{{ this.dialogTitle }}</span> -->
                    <v-divider/>
                    <v-card-text>
                      <v-container>
                        <v-form
                          ref="formAddSession"
                          v-model="formAddSessionValid"
                          lazy-validation
                          class="m-form-detail mt-5 form"
                        >
                          <!-- Session name -->
                          <div>
                            <div class="label">
                              {{ $t('hiring.home.nSesDialog.sesName') }}
                            </div>
                            <div class="input input--normal">
                              <v-text-field
                                v-model="newSession2.name_hiring_session"
                                :rules="dialogRules.name"
                                required
                                dense
                                solo
                                value="YYYYMM"
                              />
                            </div>
                          </div>

                          <!-- Start -->
                          <div>
                            <div class="label">
                              {{ $t('hiring.home.nSesDialog.start') }}
                            </div>
                            <div class="input input--normal">
                              <v-menu
                                ref="menu"
                                v-model="menu3"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"

                              >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="newSession2.time_start"
                                    :rules="dialogRules.timeStart"
                                    label="YYYY/MM/DD"
                                    solo
                                    readonly
                                    dense
                                    required
                                    style="width: auto"
                                    v-on="on"
                                  />
                                </template>
                                <v-date-picker
                                  ref="picker"
                                  v-model="newSession2.time_start"
                                  :min="new Date().toISOString().substr(0, 10)"
                                  :max="newSession2.time_end"
                                  @change="saveDate"
                                  @input="menu3 = false"
                                />
                              </v-menu>
                            </div>
                          </div>

                          <div>
                            <div class="label">
                              {{ $t('hiring.home.nSesDialog.end') }}
                            </div>
                            <div class="input input--normal">
                              <v-menu
                                ref="menu"
                                v-model="menu4"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"

                              >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="newSession2.time_end"
                                    :rules="!newSession2.time_start ? [] : dialogRules.timeEnd"
                                    :disabled="newSession2.time_start == null"
                                    label="YYYY/MM/DD"
                                    readonly
                                    solo
                                    required
                                    dense
                                    v-on="on"
                                    @input="menu4 = false"
                                  />
                                </template>
                                <v-date-picker
                                  ref="picker"
                                  v-model="newSession2.time_end"
                                  :min="newSession2.time_start"
                                  @change="saveDate"
                                />
                              </v-menu>
                            </div>
                          </div>

                        </v-form>
                      </v-container>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions>
                      <v-btn
                        text
                        class="btn btn--primary ml-8"
                        @click="saveSessions"
                      >{{ $t('hiring.home.btnSave') }}</v-btn>
                      <v-btn
                        class="btn btn--secondary ml-4"
                        text
                        @click="dialog2 = false">{{ $t('hiring.home.btnCancel') }}</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

              </div>
              <!-- Session history -->
              <v-list-item-group v-model="defaultSelectedSession">
                <v-list-item
                  v-for="session in sessionNames"
                  :key="session.id"
                  class="l-item"
                >
                  <v-list-item-content
                    class="l-item__content"
                    @click="showHiringHistory(session)">
                    <v-list-item-title v-text="session.name_hiring_session"/>
                  </v-list-item-content>

                </v-list-item>

              </v-list-item-group>
            </v-list>
          </v-col>

          <!-- Direction helper -->
          <div
            v-show="isLoadingSessionHistory"
            style="height: 100%">
            <v-card
              class="mx-auto"
              max-width="344"
              outlined
              style="padding: 0; border: none; background: transparent; margin-top: 80px"
            >
              <v-list-item three-line>
                <v-icon size="40">mdi-arrow-left</v-icon>
                <v-list-item-content>
                  <v-list-item-title class="headline">{{ $t('hiring.home.notify') }}</v-list-item-title>
                </v-list-item-content>

              </v-list-item>
            </v-card>
          </div>

          <v-col
            v-if="!isLoadingSessionHistory"
            cols="9">
            <div class="middle-detail box">
              <div class="box-heading">
                <h3 class="box-heading__title ml-3">{{ $t('hiring.home.subSes') }}</h3>
                <!-- Dialog add new session -->
                <v-dialog
                  v-model="dialog"
                  persistent
                  max-width="500px">
                  <template v-slot:activator="{on}">
                    <v-btn
                      v-model="session.id"
                      class="btn btn--primary"
                      small
                      @click="addSubSession">
                      {{ $t('hiring.home.btnAdd') }}
                    </v-btn>
                  </template>
                  <v-card>
                    <h3 class="card-title">{{ this.dialogTitle }}</h3>
                    <v-divider/>

                    <v-card-text>
                      <v-container>
                        <v-form
                          ref="formAddSubSession"
                          v-model="formAddSubSessionValid"
                          lazy-validation
                          class="m-form-detail mt-5 form"
                        >
                          <!-- Session name -->
                          <div>
                            <div class="label">
                              {{ $t('hiring.home.nSubSesDialog.sesName') }}
                            </div>
                            <div class="input input--normal">
                              <v-text-field
                                v-model="newSession.name_period_recruit"
                                :rules="dialogRules.name"
                                placeholder="YYYYMM"
                                required
                                dense
                                solo
                                value="YYYYMM"
                              />
                            </div>
                          </div>

                          <!-- Start -->
                          <div>
                            <div class="label">
                              {{ $t('hiring.home.nSubSesDialog.start') }}
                            </div>
                            <div class="input input--normal">
                              <v-menu
                                ref="menu"
                                v-model="menu1"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"

                              >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="newSession.time_start"
                                    :rules="dialogRules.timeStart"
                                    label="YYYY/MM/DD"
                                    solo
                                    readonly
                                    dense
                                    required
                                    style="width: auto"
                                    v-on="on"
                                  />
                                </template>
                                <v-date-picker
                                  ref="picker"
                                  v-model="newSession.time_start"
                                  :min="curSession.time_start"
                                  :max="curSession.time_end"
                                  @change="saveDate"
                                  @input="menu1 = false"
                                />
                              </v-menu>
                            </div>
                          </div>

                          <!-- End -->
                          <div>
                            <div class="label">
                              {{ $t('hiring.home.nSubSesDialog.end') }}
                            </div>
                            <div class="input input--normal">
                              <v-menu
                                ref="menu"
                                v-model="menu2"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"

                              >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="newSession.time_end"
                                    :rules="!newSession.time_start ? [] : dialogRules.timeEnd "
                                    :disabled="newSession.time_start == null"
                                    label="YYYY/MM/DD"
                                    solo
                                    readonly
                                    dense
                                    required
                                    style="width: auto"
                                    v-on="on"
                                    @input="menu2 = false"
                                  />
                                </template>
                                <v-date-picker
                                  ref="picker"
                                  v-model="newSession.time_end"
                                  :min="newSession.time_start"
                                  :max="curSession.time_end"
                                  @change="saveDate"
                                  @input="menu2 = false"
                                />
                              </v-menu>
                            </div>
                          </div>

                          <!-- process -->
                          <div>
                            <v-container class="py-0">
                              <v-row
                                align="center"
                                justify="start">
                                <v-col
                                  v-for="(selection, i) in selected"
                                  :key="selection.text"
                                  class="shrink"
                                >
                                  <v-chip
                                    :disabled="loading"
                                    close
                                    @click:close="selected.splice(i, 1)"
                                  >
                                    {{ i + 1 }}. {{ selection.text }} -
                                    {{ selection.amount }}
                                  </v-chip>
                                </v-col>
                              </v-row>
                            </v-container>
                            <v-list>
                              <template v-for="(item, i) in categories">
                                <v-list-item
                                  :key="i"
                                  :disabled="loading"
                                >
                                  <!--                            <v-list-item-title v-text="item.text" />-->
                                  <v-row>
                                    <v-text-field
                                      v-model="item.amount"
                                      :label= "item.text"
                                      :suffix="$t('hiring.home.nSubSesDialog.number')"
                                      max="200"
                                      min="1"
                                      step="1"
                                      style="width: 60%"
                                      type="number"
                                      @keydown="false"
                                    />
                                    <v-btn
                                      text
                                      icon
                                      color="green"
                                      style="margin-top: 15px"
                                      @click="pushItem(selected, item)">
                                      <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                  </v-row>

                                </v-list-item>
                              </template>
                            </v-list>
                          </div>
                        </v-form>
                      </v-container>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        text
                        class="btn btn--primary"
                        @click="saveSession"
                      >{{ $t('hiring.home.btnSave') }}</v-btn>
                      <v-btn
                        class="btn btn--secondary"
                        text
                        @click="dialog = false">{{ $t('hiring.home.btnCancel') }}</v-btn>
                      <v-btn
                        :disabled="isNotDeleted"
                        class="btn btn--tertiary"
                        text
                        @click="deleteSessionHistory"
                      >{{ $t('hiring.home.btnDelete') }}</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
              <div>
                <v-data-table
                  v-model="table2"
                  :headers="headers"
                  :items="getSessionHistory"
                  item-value="id"
                  item-text="name_hiring_session"
                  class="session-history box box--white box--shadow"
                  hide-default-footer
                >
                  <template v-slot:item.status_period="{ item }">
                    <v-chip
                      v-if="item.status_period == 1"
                      class="ma-2"
                      small>
                      {{ $t('hiring.home.pending') }}
                    </v-chip>
                    <v-chip
                      v-if="item.status_period == 0"
                      class="ma-2"
                      small>
                      {{ $t('hiring.home.finish') }}
                    </v-chip>
                  </template>
                  <template v-slot:item.actions="{ item }">

                    <v-btn
                      class="btn btn--secondary"
                      small
                      @click="setProcessCvList(item.id)">
                      {{ $t('hiring.home.btnView') }}
                    </v-btn>
                    <!--          </router-link>-->
                    <v-btn
                      class="btn btn--tertiary"
                      small
                      @click="editSession(item.id)"
                    >{{ $t('hiring.home.btnEdit') }}</v-btn
                    >
                  </template>
                </v-data-table>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>

import {mapState, mapMutations, mapActions} from 'vuex'
import router from '@/router'

export default {
  data () {
    return {
      viewId: [],
      defaultSelectedSession: 0,
      newSession: {
        id: '',
        name_period_recruit: '',
        time_start: '',
        time_end: '',
        procedure: [],
        status_period: 'null',
        hiring_session: []
      },
      newSession2: {
        id: '',
        name_hiring_session: '',
        time_start: '',
        time_end: ''
      },
      isNotDeleted: true,
      items: [
        {
          text: 'Interview',
          amount: 3
        },
        {
          text: 'Test',
          amount: 1
        }
      ],
      newItem: {
        name: '',
        amount: 0
      },
      tbl: [],
      idName: [],
      loading: true,
      selected: [],
      dialog: false,
      dialog2: false,
      menu2: false,
      menu1: false,
      menu3: false,
      menu4: false,
      dialogRules: {
        name: [v => !!v || 'Session name is required'],
        timeStart: [v => !!v || 'Time start is required'],
        timeEnd: [v => !!v || 'Time end is required']
      },
      addNewSession: false,
      dialogTitle: '',
      table2: [],
      chooseInt: [],
      isLoadingSessionHistory: true,
      formAddSessionValid: true,
      formAddSubSessionValid: true,
      curSession: {}
    }
  },
  computed: {
    ...mapState('candidate', ['sessionHistory', 'detailSession', 'sessionName', 'session', 'createSession']),

    headers () {
      return [
        {text: this.$t('hiring.home.headerTable.name'), value: 'name_period_recruit'},
        {text: this.$t('hiring.home.headerTable.start'), value: 'time_start'},
        {text: this.$t('hiring.home.headerTable.end'), value: 'time_end'},
        {text: this.$t('hiring.home.headerTable.stt'), value: 'status_period'},
        {text: this.$t('hiring.home.headerTable.action'), value: 'actions'}
      ]
    },
    categories () {
      return this.items
    },
    getSessionHistory () {
      return this.sessionHistory
    },
    sessionNames () {
      return this.sessionName !== undefined ? this.sessionName.results : []
    }
  },
  async created () {
    await this.getSessionNew()

    if (this.sessionNames.length > 0) {
      this.showHiringHistory(this.sessionNames[0])
    }
  },
  methods: {
    ...mapMutations('candidate', ['setSessionHistory', 'createHiringSession', 'setDetailSession', 'updateSession',
      'deleteSession', 'setSessionName', 'setSession', 'setCreateSession']),
    ...mapActions('candidate', ['getHiringSession', 'createHiringSession', 'getDetailSession', 'updateSession',
      'deleteSession', 'getSessionName', 'getSessionN', 'createSessions', 'changeSessionHistory']),
    // save new hiring session
    saveSession () {
      if (this.$refs.formAddSubSession.validate()) {
        let payload = {}
        payload = this.newSession
        payload['procedure'] = this.selected
        payload['hiring_session'] = this.idName
        if (this.addNewSession) {
          this.createHiringSession(payload)
        } else {
          this.updateSession(payload)
        }
      }
      this.dialog = false
    },

    async saveSessions () {
      if (this.$refs.formAddSession.validate()) {
        let timeStart = this.newSession2.time_start
        if (this.sessionNames.length !== 0 && Date.parse(timeStart) < Date.parse(this.sessionNames[0].time_end)) {
          alert('Time start of ' + this.newSession2.name_hiring_session + ' fail!')
        } else {
          let payload = {
            time_start: timeStart,
            time_end: this.newSession2.time_end,
            name_hiring_session: this.newSession2.name_hiring_session
          }
          await this.createSessions(payload)
          this.getSessionName()
        }
        this.dialog2 = false
      }
    },

    addSubSession () {
      if (this.tbl.length === 0 || this.tbl[this.tbl.length - 1].status_period === 0) {
        this.newSession = {
          id: null,
          name_period_recruit: null,
          time_start: null,
          time_end: null,
          procedure: [],
          status_period: null
        }
        this.selected = [ { 'text': 'Interview', 'amount': 3 }, { 'text': 'Test', 'amount': 1 } ]
        this.loading = false
        this.isNotDeleted = true
        this.addNewSession = true
        this.dialogTitle = this.$t('hiring.home.nSubSesDialog.header')
        this.dialog = true
      } else {
        alert('Sub session not finish')
      }
    },
    newSes () {
      if (this.sessionNames.length > 0 && this.sessionNames[0].status_hiring !== 0) {
        alert('Session ' + this.sessionNames[0].name_hiring_session + ' not finish')
      } else {
        this.newSession2 = {
          id: null,
          name_period_recruit: null,
          time_start: null,
          time_end: null
        }
        this.selected = []
        this.loading = false
        this.isNotDeleted = true
        this.addNewSession = true
        this.dialogTitle = this.$t('hiring.home.nSesDialog.header')
        this.dialog2 = true
      }
    },

    async editSession (id) {
      this.dialog = true
      console.log('edit')
      this.addNewSession = false
      this.dialogTitle = this.$t('hiring.home.editTitle')
      let payload = {id: id}
      console.log(payload)
      await this.getDetailSession(payload)
      this.newSession = this.detailSession
      this.selected = this.detailSession.procedure
      if (this.detailSession.allow_delete === -1) {
        this.loading = true
        this.isNotDeleted = true
      } else {
        this.loading = false
        this.isNotDeleted = false
      }
    },

    async deleteSessionHistory () {
      console.log('delete session')
      let payload = {id: this.detailSession.id}
      console.log(payload)
      this.dialog = false
      await this.deleteSession(payload)
    },

    // no need to care
    saveDate (date) {
      this.$refs.menu.save(date)
    },

    // close dialog
    close () {
      this.dialog = false
    },

    pushItem (selected, item) {
      let newItem = {text: '', amount: 0}
      Object.assign(newItem, item)
      selected.push(newItem)
    },

    setProcessCvList (id) {
      router.push({path: `/hiring-session/detail/${id}`})
    },

    async getSessionNew () {
      let payload = {}
      await this.getSessionName(payload)
    },

    showHiringHistory (record, index) {
      console.log('current session:', record)
      this.curSession = record
      this.tbl = record.period_recruits
      this.idName = record.id
      this.setSessionHistoryData(this.tbl)
      this.isLoadingSessionHistory = false
    },

    async setSessionHistoryData (data) {
      let payload = {data: data}
      await this.changeSessionHistory(payload)
    }
  }
}
</script>
<style lang="scss">
  @import "@/scss/pages/_hiring-session.scss";

  @import "@/scss/components/_btn.scss";
  @import '@/scss/components/_form.scss';
  @import '@/scss/components/_3-columns.scss';
</style>
