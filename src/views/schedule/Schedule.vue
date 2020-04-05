<template>
  <div style="max-width: 99vw; margin: auto;">
    <h1
      class="text-center heading"
      style="height: 20vh; line-height: 20vh" >{{ $t('schedule.session') }}</h1>
    <v-row
      justify="center"
      style="padding: 2em">
      <v-col cols="2">
        <v-row class="form">

          <!-- Session -->
          <div>
            <div class="label">
              {{ $t('schedule.session') }}
            </div>
            <div>
              <v-select
                id="hiring"
                :items="itemHiringSession"
                v-model="hiringSession"
                item-text="name_hiring_session"
                dense
                solo
                return-object
                @change="getDataSchedule"
              />
            </div>
          </div>
          <!-- Sub session -->
          <div>
            <div class="label">
              {{ $t('schedule.subSession') }}
            </div>
            <div>
              <v-select
                id="stage"
                :items="hiringSession.period_recruits"
                v-model="dataInfo"
                item-text="name_period_recruit"
                dense
                solo
                return-object
                @change="setInterviewValue"
              />
            </div>
          </div>
          <!-- Round -->
          <div>
            <div class="label">
              {{ $t('schedule.round') }}
            </div>
            <div>
              <v-select
                id="rounds"
                :items="dataInfo.rounds"
                v-model="roundId"
                item-text="name_period_recruit"
                item-value="id"
                dense
                solo
                @change="searchSchedule"
              />
            </div>
          </div>

        </v-row>
      </v-col>
      <v-col
        cols="10">
        <v-data-table
          :headers="headers"
          :items="schedule"
          v-model="selectedCandidate"
          item-key="candidate__id"
          show-select
          class="elevation-1"
        >
          <template
            v-slot:item.personInfor="{ item }">
            <span class="content-primary">
              {{ item.candidate__name_candidate }}
            </span>
            <br>
            <span class="content-secondary">

              {{ item.candidate__email }}<br>
              {{ item.candidate__school_name }}
            </span>
          </template>
          <template v-slot:item.time="{ item }">
            <span class="content-primary">{{ item.time_start }}<br>{{ item.time_end }}</span>
          </template>
          <template v-slot:item.interviewer="{ item }">
            <v-chip-group
              multiple
              active-class="primary--text"
            >
              <v-chip
                v-for="tag in item.interviewer"
                :key="tag">
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </template>

          <!-- Dialog edit schedule -->
          <template v-slot:top>
            <v-dialog
              v-model="dialog"
              persistent
              max-width="600px">
              <v-card>
                <h3
                  class="card-title">{{ $t('schedule.upScheDialog.editSche') }}</h3>
                <v-divider/>
                <v-card-text>
                  <v-container>
                    <div
                      class="m-form-detail mt-5 form"
                    >
                      <!-- Schedule date -->
                      <div>
                        <div class="label">
                          {{ $t('schedule.headerTable.date') }}
                        </div>
                        <div>
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
                                :value="dateChange"
                                v-model="editedItem.date"
                                clearable
                                label="YYYY/MM/DD"
                                solo
                                readonly
                                dense
                                style="width: auto"
                                @click:clear="date = null"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              ref="picker"
                              :min="dataInfo.time_start"
                              :max="dataInfo.time_end"
                              v-model="editedItem.date"
                              @change="menu1 = false"
                            />
                          </v-menu>
                        </div>
                      </div>

                      <!-- Time start -->
                      <div>
                        <div class="label">
                          {{ $t('schedule.headerTable.start') }}
                        </div>
                        <div>
                          <v-menu
                            ref="menu_start_time"
                            v-model="menu2"
                            :nudge-right="40"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"

                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="editedItem.time_start"
                                label="YYYY/MM/DD"
                                solo
                                readonly
                                dense
                                style="width: auto"
                                @click:clear="date = null"
                                v-on="on"
                              />
                            </template>
                            <v-time-picker
                              v-if="menu2"
                              v-model="editedItem.time_start"
                              :max="editedItem.time_end"
                              use-seconds
                              @click:second="$refs.menu_start_time.save(editedItem.time_start)"
                            />
                          </v-menu>
                        </div>
                      </div>

                      <!-- Time end -->
                      <div>
                        <div class="label">
                          {{ $t('schedule.headerTable.end') }}
                        </div>
                        <div>
                          <v-menu
                            ref="menu_start_time"
                            v-model="menu3"
                            :nudge-right="40"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"

                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="editedItem.time_end"
                                label="YYYY/MM/DD"
                                solo
                                readonly
                                dense
                                style="width: auto"
                                v-on="on"
                              />
                            </template>
                            <v-time-picker
                              v-if="menu3"
                              v-model="editedItem.time_end"
                              :min="editedItem.time_start"
                              use-seconds
                              @click:second="$refs.menu_end_time.save(editedItem.time_end)"
                            />
                          </v-menu>
                        </div>
                      </div>

                      <!-- Place -->
                      <div>
                        <div class="label">
                          {{ $t('schedule.headerTable.place') }}
                        </div>
                        <div>
                          <v-text-field
                            v-model="editedItem.place"
                            required
                            dense
                            solo
                          />
                        </div>
                      </div>

                      <!-- Interviewer number -->
                      <div>
                        <div class="label">
                          {{ $t('schedule.headerTable.inter') }}
                        </div>
                        <div class="input input--long">
                          <v-autocomplete
                            v-model="editedItem.interviewer"
                            :items="allInterviewers"
                            :counter="editedItem.ids.length"
                            :hint="`Interviewer number: ${0}`"
                            multiple
                          />
                        </div>
                      </div>

                      <!-- Options -->
                      <v-radio-group v-model="optionUpdate">
                        <v-radio
                          v-for="n in radioValue"
                          :key="n.value"
                          :label="n.label"
                          :value="n.value"
                        />
                      </v-radio-group>

                    </div>
                  </v-container>
                </v-card-text>
                <v-divider/>
                <v-card-actions>
                  <v-spacer/>
                  <v-btn
                    class="btn btn--primary"
                    small
                    @click="onSaveSchedule">{{ $t('schedule.btnSave') }}
                  </v-btn>
                  <v-btn
                    class="btn btn--secondary"
                    small
                    @click="dialog = false">{{ $t('schedule.btnClose') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>

          <template
            v-slot:item.status="{ item }"
          >
            <span
              v-if="item.status === 0"
              style="color: #b1b1b1; ">{{ $t('schedule.upSttDialog.sttUnCon') }}</span>
            <span
              v-if="item.status === 1"
              style="color: blue; ">{{ $t('schedule.upSttDialog.sttAgree') }}</span>
            <span
              v-if="item.status === 3"
              style="color: red; ">{{ $t('schedule.upSttDialog.sttRefuse') }}</span>
            <span
              v-if="item.status === 4"
              style="color: green; ">{{ $t('schedule.upSttDialog.sttResche') }}</span>
            <v-icon
              small
              class="mr-2"
              @click="onUpdateStatus(item)"
            >
              edit
            </v-icon>
            <span
              v-if="item.is_sent_mail === 0"
              style="color: black; "> <br>{{ $t('schedule.mailDialog.notSend') }}</span>
            <span
              v-if="item.is_sent_mail === 1"
              style="color: green; "><br>{{ $t('schedule.mailDialog.send') }}</span>
            <span
              v-if="item.is_sent_mail === 2"
              style="color: red; "><br>{{ $t('schedule.mailDialog.sendErr') }}</span>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              edit
            </v-icon>
          </template>
        </v-data-table>
      </v-col>

      <v-row>
        <v-col sm="2"/>
        <v-col sm="10">
          <div
            class="my-2"
            style="margin-left: 8px">
            <v-btn
              v-show="!btnMailToCandidate"
              class="btn btn--primary"
              small
              @click="onSendMailCandidate">{{ $t('schedule.btnSendTo') }}</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-row>

    <!-- dialog send mail -->
    <template>
      <v-form
        ref="form"
        v-model="dialogValid"
      >
        <v-dialog
          v-model="dialogMailCandidate"
          persistent
          scrollable
          max-width="600px">
          <v-card>
            <h2 class="card-title">{{ $t('schedule.mailDialog.header') }}</h2>
            <v-divider/>
            <v-card-text>
              <v-container fluid>

                <!-- Subject -->
                <div>
                  <div class="label">
                    {{ $t('schedule.mailDialog.subject') }}
                  </div>
                  <div class="input input--normal">
                    <v-text-field
                      v-model="subjectMail"
                      :rules="dialogRules.subject"
                      required
                      outlined
                    />
                  </div>
                </div>

                <!-- Content -->
                <div>
                  <div class="label">
                    {{ $t('schedule.mailDialog.content') }}
                  </div>
                  <div class="input input--long">
                    <vue-editor
                      v-model="mailContent"
                      :rules="dialogRules.content"/>
                  </div>
                </div>

              </v-container>
              <v-divider/>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                :disabled="!dialogValid || !mailContent"
                class="btn btn--primary"
                @click="sendMailToCandidate">{{ $t('schedule.btnSave') }}
              </v-btn>
              <v-btn
                class="btn btn--secondary"
                @click="closeSendMailDialog">{{ $t('schedule.btnClose') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-form>
      <v-snackbar
        v-model="snackbar"
        :color="snacColor"
        :timeout="5000"
        :top="true"
        :multi-line="true"
      >
        {{ this.snackbarText }}
        <v-icon
          dark
          right>mdi-checkbox-marked-circle</v-icon>
      </v-snackbar>
    </template>

    <!-- dialog update -->
    <template>
      <v-form
        ref="formStatus"
        v-model="dialogStatusValid"
        lazy-validation
      >
        <v-dialog
          v-model="editStatusDialog"
          persistent
          max-width="400px">
          <v-card>
            <h3
              class="card-title">{{ $t('schedule.upSttDialog.header') }}</h3>
            <v-divider/>
            <v-card-text>
              <v-container>
                <div
                  class="m-form-detail mt-5 form"
                >
                  <!-- interview status -->
                  <div>
                    <div class="label">
                      {{ $t('schedule.upSttDialog.inter') }}
                    </div>
                    <div class="input input--long">
                      <v-select
                        v-model="interviewStatus"
                        :item-text="item => item.text"
                        :item-value="item => item.value"
                        :items="updateStatus"
                        solo
                        dense
                      />
                    </div>
                  </div>

                  <div>
                    <div class="label">
                      {{ $t('schedule.upSttDialog.note') }}
                    </div>
                    <div class="input input--long">
                      <v-textarea
                        v-model="noteStatus"
                        :rules="interviewStatus > 1 ? dialogRules.note : []"
                        auto-grow
                        rows="1"
                        row-height="2em"
                        name="input-7-4"
                        dense
                        solo
                        required
                      />
                    </div>
                  </div>
                </div>
              </v-container>
            </v-card-text>
            <v-divider/>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                class="btn btn--primary"
                small
                @click="onSaveUpdateStatus()">{{ $t('schedule.btnSave') }}
              </v-btn>
              <v-btn
                class="btn btn--secondary"
                small
                @click="editStatusDialog = false">{{ $t('schedule.btnClose') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-form>
    </template>

    <template>
      <v-row justify="center">
        <v-dialog
          v-model="errDialog"
          scrollable
          max-width="1000px">
          <v-card>
            <v-alert type="error">
              Send mail error : {{ this.mailError.length }}
            </v-alert>
            <v-card-text>
              <br><br><br>
              <v-data-table
                :headers="errHeaders"
                :items="mailError"
                class="elevation-1"
              />
            <br><br><br></v-card-text>
            <v-divider/>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                class="btn btn--secondary"
                text
                @click="errDialog = false">{{ $t('schedule.btnClose') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

  </div>
</template>
<script>
import moment from 'moment'
import {mapState, mapMutations, mapActions} from 'vuex'
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    VueEditor
  },
  data: () => ({
    dataInfo: [],
    selectedCandidate: [],
    roundId: '',
    editedIndex: -1,
    editedItem: {
      ids: '',
      interviewer: '',
      time_start: '',
      date: '',
      time_end: '',
      place: ''
    },
    date: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false,
    modal2: false,
    menu3: false,
    start: null,
    end: null,
    dialog: false,
    optionUpdate: 0,
    dialogMailCandidate: false,
    mailTo: 0,
    btnMailToCandidate: false,
    editStatusDialog: false,
    interviewStatus: 0,
    hiringSession: {},
    dialogRules: {
      mailTo: [v => !!v || 'Receiver is required'],
      subject: [v => !!v || 'Subject is required'],
      content: [v => !!v || 'Mail content is required'],
      note: [v => !!v || 'Note is required'],
      interviewStatus: [v => !!v || 'Interview status is required']
    },
    dialogValid: true,
    dialogStatusValid: true,
    noteStatus: '',
    nameRound: null,
    candidateId: null,
    mailContent: '',
    subjectMail: '',
    mailCandidateId: [],
    snackbarText: '',
    snackbar: false,
    snacColor: null,
    errDialog: false,
    mailError: [],
    errHeaders: [
      {text: 'Name candidate', value: 'name'},
      {text: 'Email', value: 'email'},
      {text: 'Reason', value: 'msg'}
    ]
  }),
  computed: {
    ...mapState('schedule', ['page', 'pageCount', 'itemsPerPage', 'scheduleInterview', 'currentInterview', 'schedule', 'allInterviewer', 'scheduleHiring']),

    // Header to load translate
    headers () {
      return [
        {text: this.$t('schedule.headerTable.perInfo'), value: 'personInfor', width: 280},
        {text: this.$t('schedule.headerTable.round'), value: 'name_round'},
        {text: this.$t('schedule.headerTable.date'), value: 'date', width: 120},
        {text: this.$t('schedule.headerTable.time'), value: 'time'},
        // {text: this.$t('schedule.headerTable.end'), value: 'time_end'},
        {text: this.$t('schedule.headerTable.place'), value: 'place'},
        {text: this.$t('schedule.headerTable.inter'), value: 'interviewer', width: 100},
        {text: this.$t('schedule.headerTable.stt'), value: 'status'},
        {text: this.$t('schedule.headerTable.updateSche'), value: 'action'}
      ]
    },

    radioValue () {
      return [
        {
          value: 0,
          label: this.$t('schedule.upScheDialog.upPer')
        },
        {
          value: 1,
          label: this.$t('schedule.upScheDialog.upOther')
        },
        {
          value: 2,
          label: this.$t('schedule.upScheDialog.upAll')
        }
      ]
    },

    updateStatus () {
      return [
        {
          value: 1,
          text: this.$t('schedule.upSttDialog.sttAgree')
        },
        {
          value: 3,
          text: this.$t('schedule.upSttDialog.sttRefuse')
        },
        {
          value: 4,
          text: this.$t('schedule.upSttDialog.sttResche')
        }
      ]
    },

    itemHiringSession () {
      return this.$store.state.schedule.scheduleHiring
    },
    allInterviewers () {
      return this.$store.state.schedule.allInterviewer
    },
    dateChange () {
      return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
    },
    roundType () {
      let roundType = this.roundId.split('-')[0]
      return roundType.toLocaleLowerCase()
    }
  },
  async created () {
    await this.loadFromLocalStorage()
    await this.getAllInter()
  },

  methods: {
    ...mapMutations('schedule', ['setPage', 'setPageCount', 'setItemsPerPage', 'setScheduleInterview',
      'setCurrentInterview', 'setDataInfo', 'setAllInterviewer', 'setScheduleHiring']),
    ...mapActions('schedule', ['getScheduleInterview', 'getStage', 'getInter', 'updateInter', 'getAllInterviewer', 'getScheduleHiring', 'updateStatusAction', 'sendMail']),

    async getAllInter () {
      let payload = {}
      await this.getAllInterviewer(payload)
    },

    async getDataSchedule () {
      console.log('hiring session recruit', this.hiringSession.period_recruits)
      this.dataInfo = !this.hiringSession.period_recruits[0] ? [] : this.hiringSession.period_recruits[0]
      // console.log('dataInfo', this.dataInfo)
      // dataInfo = [] -> error
      if (this.dataInfo.length !== 0) {
        this.roundId = this.dataInfo.rounds[0] === 'undefined' ? null : this.dataInfo.rounds[0]
        this.dataInfo.rounds.push('INTER-all')
        this.dataInfo.rounds.push('TEST-all')
      }

      let response = await this.searchSchedule()
      console.log(response)
    },

    async setInterviewValue () {
      this.roundId = this.dataInfo.rounds[0] === 'undefined' ? null : this.dataInfo.rounds[0]
      let response = await this.searchSchedule()
      console.log(response)
    },

    async searchSchedule () {
      let payload = {period_recruit: this.dataInfo.id, name_round: this.roundId}
      localStorage.setItem('schedule_hiringSession', JSON.stringify(this.hiringSession))
      localStorage.setItem('schedule_dataInfo', JSON.stringify(this.dataInfo))
      localStorage.setItem('schedule_nameRound', this.roundId)

      await this.getInter(payload)
      if (this.roundId === 'TEST-All' || this.roundId === 'INTER-All') {
        this.btnMailToCandidate = true
      } else {
        this.btnMailToCandidate = false
      }
    },

    async initSchedule () {
      this.hiringSession = this.itemHiringSession[0]
      await this.getDataSchedule()
    },

    editItem (item) {
      this.editedIndex = this.schedule.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async onSaveSchedule () {
      let payload = {
        data: this.editedItem,
        index: this.editedIndex
      }
      payload.data['option_update'] = this.optionUpdate
      await this.updateInter(payload)
      this.dialog = false
      if (this.optionUpdate !== 0) {
        location.reload()
      }
      this.optionUpdate = 0
    },

    async loadFromLocalStorage () {
      // get data from local storage
      let dataFromStorage = localStorage.getItem('schedule_hiringSession')
      // ??
      await this.getHiringSessionItem()
      console.log('schedule hiring', this.scheduleHiring)
      if (!dataFromStorage) {
        await this.initSchedule()
      } else {
        //   try to get from localStorage
        this.hiringSession = JSON.parse(dataFromStorage)
        this.dataInfo = JSON.parse(localStorage.getItem('schedule_dataInfo'))
        this.roundId = localStorage.getItem('schedule_nameRound')
        if (this.roundId === 'TEST-All' || this.roundId === 'INTER-All') {
          this.btnMailToCandidate = true
        } else {
          this.btnMailToCandidate = false
        }
        await this.searchSchedule()
      }
    },

    onUpdateStatus (item) {
      this.editStatusDialog = true
      this.noteStatus = ''
      this.interviewStatus = item.status
      this.nameRound = item.name_round
      this.candidateId = item.candidate__id
    },

    async onSaveUpdateStatus () {
      if (this.$refs.formStatus.validate()) {
        let payload = {
          candidate_id: this.candidateId,
          period_recruit: this.dataInfo.id,
          name_round: this.nameRound,
          status_code: this.interviewStatus,
          note: this.noteStatus,
          type: this.roundType === 'test' ? 'test' : 'interview'
        }
        await this.updateStatusAction(payload)
        console.log('after update', this.schedule)
        this.editStatusDialog = false
        // location.reload()
      }
    },

    async getHiringSessionItem () {
      let payload = {}
      await this.getScheduleHiring(payload)
    },

    async sendMailToCandidate () {
      if (this.$refs.form.validate()) {
        // prepare ids
        let candidateId = []

        this.selectedCandidate.forEach(element => {
          candidateId.push(element.candidate__id)
        })

        let payload = {
          period_recruit: this.dataInfo.id,
          candidates: candidateId,
          name_round: this.roundId,
          options_save: 0,
          default_content: -1,
          subject: this.subjectMail,
          content: this.mailContent
        }
        const response = await this.sendMail(payload)
        console.log('res send mail', response)
        if (response.fail.length > 0) {
          this.mailError = response.fail
          this.errDialog = true
        } else {
          this.snacColor = 'success'
          this.snackbarText = 'Send mail successful'
          this.snackbar = true
        }
        this.dialogMailCandidate = false
      }
    },

    closeSendMailDialog () {
      this.dialogMailCandidate = false
    },

    onSendMailCandidate () {
      this.dialogMailCandidate = true
      this.mailTo = 0
      this.subjectMail = ''
      this.mailContent = ''
      this.mailCandidateId = []
    }
  }
}
</script>
<style lang="scss">
  @import "../../scss/pages/setup_schedule";
  @import '../../scss/components/form';
</style>
