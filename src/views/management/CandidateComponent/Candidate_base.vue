<template>
  <v-dialog
    v-model="dialog_candidate"
    fullscreen>
    <v-row
      style="width: 100%;height: 100%;margin:0">
      <v-col
        cols="2"
        style="background-color: #4CAF50">
        <v-btn
          icon
          @click="closeDialog">
          <v-icon style="color:white">mdi-close</v-icon>
        </v-btn>
        <v-list
          nav
          dark
          color="success"
          class="pt-12 mt-10">
          <v-img
            v-if="resultTemple.photo === null"
            :src="require('@/assets/images/person.png')"
            class="ml-5"
            width="130px"
            height="130px"/>
          <v-img
            v-else
            :src="`${resultTemple.photo}`"
            class="ml-5"
            width="130px"
            height="130px"
            style="border-radius:50%"/>
          <div
            class="pt-10 pb-10"
            style="color:white">
            <span
              style="font-size:28px">
              {{ resultTemple.name_candidate }}
            </span><br>
            <v-select
              v-model="resultTemple.status"
              :items="statusList"
              item-text="name"
              item-value="value"
              dense/>
          </div>
          <v-list-item-group
            v-model="defaultSelected"
            color="green lighten-3">
            <v-list-item
              v-for="(tab, index) in profileTabs"
              :key="index"
              class="pl-5"
              link
              @click="viewTab (index)">
              <v-list-item-content>
                <v-list-item-title>{{ tab.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="transparent"
                  class="navbar__nav-box__navlink"
                  style="box-shadow: none"
                  v-on="on"
                >
                  Training
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in dropdown"
                  :key="index"
                  @click="dropdownView(index)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor
  },
  props: {
    candidate: {
      type: Object,
      default: null
    },
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialog_candidate: false,
      resultTemple: {
        address: null,
        birthday: null,
        certifications: [],
        cmnd: null,
        created_at: null,
        cv: null,
        cv_raw: null,
        cv_submitted_time: null,
        education_program: null,
        education_rank: null,
        email: null,
        existed: [],
        expected_salary: null,
        facebook: null,
        gender: null,
        gpa: null,
        id: null,
        interview: [],
        interview_accept: null,
        interview_comment: null,
        is_accepted: null,
        is_graduated: null,
        major: null,
        marital_status: null,
        name_candidate: null,
        nationality: null,
        note: null,
        num_course_owed: null,
        others_reason: null,
        period_recruit: null,
        phone: null,
        photo: '',
        recommendations_salary: null,
        reference_person_code: null,
        school_lever: null,
        school_name: null,
        school_type: null,
        seasion: null,
        status: null,
        tech: null
      },
      // candidate profile
      profileTabs: [
        {
          name: 'Profile Information',
          active: true
        },
        {
          name: 'Schedule',
          active: false
        },
        {
          name: 'Interview & Test',
          active: false
        },
        {
          name: 'File Information',
          active: false
        }

      ],
      dropdown: [
        {
          title: 'FOA',
          active: false
        },
        {
          title: 'DEPT',
          active: false
        }
      ],
      // ---------------------------detail candidate/personal
      // ----DoB
      dob_menu: false,
      // start working date
      swd_menu: false,
      // ----marital status
      marital: [
        {
          name: 'single',
          value: 0
        },
        {
          name: 'married',
          value: 1
        }
      ],
      // ---------------------------detail candidate/education
      // ----Level
      studyLevel: [
        {
          name: 'College',
          value: 1
        },
        {
          name: 'Bachelor',
          value: 2
        },
        {
          name: 'Master',
          value: 3
        },
        {
          name: 'Doctor',
          value: 4
        }
      ],
      // ----school type
      schoolType: [1, 2, 3],
      // ----Major
      popularMajor: [
        'COMPUTER VISION AND ROBOTICS',
        'KNOWLEDGE ENGINEERING',
        'COMPUTER SCIENCES',
        'SOFTWARE ENGINEERING',
        'COMPUTER NETWORKS AND TELECOMMUNICATION',
        'INFORMATION SYSTEM ENGINEERING'
      ],
      // ----study mode
      studyMode: [
        {
          name: 'full-time',
          value: 1
        },
        {
          name: 'part-time',
          value: 2
        }
      ],
      // ----capacity
      rank: [
        {
          name: 'good',
          value: 1
        },
        {
          name: 'excellent',
          value: 2
        },
        {
          name: 'average',
          value: 3
        },
        {
          name: 'others',
          value: 0
        }
      ],
      // ----certificate
      certifiItem: null,
      // ----expect to graduate
      etg_menu: false,
      // ---------------------------detail candidate/schedule
      schTemplate: {
        name_round: null,
        date: null,
        time_start: null,
        time_end: null,
        place: null,
        status: null,
        is_sent_mail: null,
        interviewer: []
      },
      schHeader: [
        {
          text: 'Round',
          value: 'name_round',
          sortable: false,
          align: 'center'
        },
        { text: 'Time',
          sortable: false,
          value: 'time',
          align: 'center'
        },
        { text: 'Place',
          value: 'place',
          align: 'center',
          sortable: false
        },
        { text: 'Interviewer',
          sortable: false,
          value: 'interviewer',
          align: 'center'
        },
        {
          text: 'Status',
          sortable: false,
          value: 'status',
          align: 'center'
        }
      ],
      statusList: [
        {
          name: 'PREQUALIFICATION',
          value: 5
        },
        {
          name: 'TRIAL STAFF',
          value: 6
        },
        {
          name: 'OFFICAL STAFF',
          value: 7
        },
        {
          name: 'FIRED',
          value: 8
        },
        {
          name: 'RESIGNED',
          value: 9
        }
      ],
      schedule_dialog: false,
      interview_menu: false,
      time_from_menu: false,
      time_to_menu: false,
      // ---------------------------detail candidate/file info
      fiInHeader: [
        {
          text: 'SESSION',
          value: 'session',
          sortable: false
        },
        {
          text: 'CV UPLOADED TIME',
          value: 'cvUpTime',
          sortable: false
        },
        {
          text: 'CANDIDATE DETAIL',
          value: 'cade',
          sortable: false
        }
      ],
      fiInExample: [
        {
          session: 'spring sesson',
          cvUpTime: '2020-01-10'
        },
        {
          session: 'spring sesson',
          cvUpTime: '2020-02-10'
        },
        {
          session: 'spring sesson',
          cvUpTime: '2020-03-01'
        }
      ],
      // ---------------------------detail candidate/Interview

      summary: [
        {
          interviewer_name: 'Leader A',
          is_pass: 1,
          cmt: 'our company need him'
        },
        {
          interviewer_name: 'Leader B',
          is_pass: 1,
          cmt: 'our company need him'
        },
        {
          interviewer_name: 'Leader C',
          is_pass: 1,
          cmt: 'our company need him'
        },
        {
          interviewer_name: 'Leader D',
          is_pass: 1,
          cmt: 'our company need him'
        },
        {
          interviewer_name: 'Manager Of Leader',
          is_pass: 0,
          cmt: `ugly face i don't like`
        }
      ],
      topicShowAll: [],
      groupShowAll: [],
      summary_dialog: false,
      agreement: [
        {
          name: 'yes',
          value: 1
        },
        {
          name: 'no',
          value: 0
        }
      ],
      roundName: '',
      dateStartRecruit: null,
      dateEndRecruit: null,
      sendMailDialog: false,
      mail: {
        subject: '',
        content: ''
      },
      sendMailSelect: [],
      tabs: null,
      headerTest: [
        {
          text: 'Yêu cầu',
          value: 'require'
        },
        { text: 'Trọng số',
          value: 'weight',
          align: 'center'
        },
        { text: 'Đánh giá',
          value: 'score',
          align: 'center'
        },
        { text: 'Kết quả',
          value: 'result',
          align: 'center'
        },
        {
          text: 'Nhận xét/Giải thích lý do',
          value: 'comment',
          align: 'center'
        },
        {
          text: 'Action',
          value: 'action',
          align: 'center'
        }
      ],
      defaultSelected: 0,
      sendMailSuccess: false,
      sendMailFail: false,
      roundType: null,
      time: null,
      menu2: false,
      menu1: false,
      period_from: '',
      period_to: '',
      dialog2: false,
      dialog1: false,
      dialogTotal: false,
      bordered: true,
      supervisor: '',
      noteTrain: '',
      headers: [
        {text: 'Yêu cầu ', value: 'require'},
        {text: 'Trọng số', value: 'weight', align: 'center'},
        {text: 'Đánh giá', value: 'score', align: 'center'},
        {text: 'Kết quả', value: 'result', align: 'center'}
      ],
      editContent: {
        title: '',
        content: ''
      },
      editComment: {
        title: '',
        comment: ''
      },
      defaultContent: {
        title: '',
        content: ''
      },
      defaultComment: {
        title: '',
        comment: ''
      },
      isLoadingSaveBtn: false,
      dialogTable: false,
      dialogTitle: '',
      requireTable: '',
      heightTable: '',
      estimateTable: '',
      commentTable: ''
    }
  },
  computed: {

    ...mapGetters('can_management', ['getSummaryResult', 'getTopicResult', 'getCandidates', 'getSessions',
      'getNextPage', 'getPrevPage', 'getSchedule', 'getGroupResult', 'getAllInterViewer', 'getEvaluateResult', 'getSupervisorsResult', 'getItemContents', 'getItemComment', 'getTestResult']),

    roundInterview () {
      let round = []
      for (let i = 0; i < this.getSessions.length; i++) {
        for (let j = 0; j < this.getSessions[i].period_recruits.length; j++) {
          if (this.getSessions[i].period_recruits[j].id === this.resultTemple.period_recruit) {
            round = this.getSessions[i].period_recruits[j].rounds
          }
        }
      }
      return round
    },
    // state (){
    //   if this.getEvaluateResult
    //
    // },
    allSuper () {
      return this.getEvaluateResult
    },
    itemsContent () {
      console.log('item', this.getEvaluateResult.description)
      return this.getEvaluateResult.description
    },
    itemsComment () {
      return this.getEvaluateResult.comment
    },
    itemsTable () {
      return this.getEvaluateResult.summary ? this.getEvaluateResult.summary.data_table : []
    },
    itemsTableAverage () {
      return this.getEvaluateResult.summary ? this.getEvaluateResult.summary.average : []
    },
    itemsTableK () {
      return this.getEvaluateResult.K ? this.getEvaluateResult.K.data_table : []
    },
    itemsTableS () {
      return this.getEvaluateResult.S ? this.getEvaluateResult.S.data_table : []
    },
    itemsTableA () {
      return this.getEvaluateResult.A ? this.getEvaluateResult.A.data_table : []
    },
    itemsTableT () {
      return this.getEvaluateResult.T ? this.getEvaluateResult.T.data_table : []
    },
    itemsTableAverageK () {
      return this.getEvaluateResult.K ? this.getEvaluateResult.K.average : []
    },
    itemsTableAverageS () {
      return this.getEvaluateResult.S ? this.getEvaluateResult.S.average : []
    },
    itemsTableAverageA () {
      return this.getEvaluateResult.A ? this.getEvaluateResult.A.average : []
    },
    itemsTableAverageT () {
      return this.getEvaluateResult.T ? this.getEvaluateResult.T.average : []
    },
    itemdg () {
      return this.getEvaluateResult.supervisor ? this.getEvaluateResult.supervisor.supervisor_name : 'Nobody'
    }

  },
  watch: {
    candidate () {
      this.resultTemple = this.candidate
      console.log('candidate detail - result templte', this.resultTemple)
    },
    dialog () {
      this.dialog_candidate = this.dialog
      this.checkStatus()
    }
  },
  async created () {
    await this.getAllInter()
  },
  methods: {
    ...mapActions('can_management', ['updateCandi', 'loadSummaryResult', 'loadTopicResult', 'loadSchedule', 'getEvaluateResultTrain',
      'loadGroupResult', 'sendMail', 'loadAllInterviewer', 'updateInter', 'updateTest', 'loadTestResult', 'updateComment', 'updateDescription',
      'updateSupervisor', 'getSupervisor', 'getTestResult', 'deleteKeyEvaluateResultDescription', 'deleteKeyEvaluateResultComment',
      'updateTestResult']),
    updateCertificate () {
      let payload = {
        id: this.resultTemple.id,
        body: {
          certificate: this.resultTemple.certifications
        }
      }
      this.updateCandi(payload)
    },
    onUpdateTestResult () {
      let payload = {
        id: this.getTestResult.candidate__id,
        body: {
          ids: this.getTestResult.ids,
          num_questions: this.getTestResult.score.num_questions * 1,
          true_answers: this.getTestResult.score.true_answers * 1
        }
      }
      console.log('update test result', payload)
      this.updateTestResult(payload)
    },
    async updateSchedule () {
      let payload = {
        data: {
          ids: this.schTemplate.ids,
          interviewer: this.schTemplate.interviewer,
          date: this.schTemplate.date,
          time_start: this.schTemplate.time_start,
          time_end: this.schTemplate.time_end,
          place: this.schTemplate.place
        },
        index: this.schTemplate.index
      }
      if (this.roundType === 'inter') {
        await this.updateInter(payload)
      }
      if (this.roundType === 'test') {
        await this.updateTest(payload)
      }
    },
    getRoundType (item) {
      let name = Object.assign(item)
      name.toLowerCase()
      if (name.toLowerCase().includes('test')) {
        this.roundType = 'test'
      }
      if (name.toLowerCase().includes('inter')) {
        this.roundType = 'inter'
      }
    },
    async getAllInter () {
      let payload = {}
      await this.loadAllInterviewer(payload)
    },
    async sendMailCandi () {
      let mail = Object.assign({}, this.mail)
      let payload = {
        period_recruit: this.resultTemple.period_recruit,
        candidates: this.resultTemple.id,
        name_round: this.sendMailSelect[0].name_round,
        options_save: 0,
        default_content: -1,
        subject: mail.subject,
        content: mail.content
      }
      if (payload.subject === '' || payload.content === '') {
        this.sendMailFail = true
        this.sendMailSuccess = false
      } else {
        const response = await this.sendMail(payload)
        if (response.fail.length > 0) {
          this.sendMailFail = true
          this.sendMailSuccess = false
        } else {
          this.sendMailSuccess = true
          this.sendMailFail = false
          console.log('payload send mail', payload)
        }
      }
    },
    closeSendMail () {
      this.sendMailDialog = false
      this.mail.subject = ''
      this.mail.content = ''
      this.sendMailSuccess = false
      this.sendMailFail = false
    },
    closeDialog () {
      for (let i = 0; i < this.profileTabs.length; i++) {
        this.profileTabs[i].active = false
      }
      this.profileTabs[0].active = true
      this.dialog_candidate = false
      this.defaultSelected = 0
      this.$emit('close')
    },
    viewTab (index) {
      for (let i = 0; i < this.profileTabs.length; i++) {
        this.profileTabs[i].active = false
      }
      for (let i = 0; i < this.dropdown.length; i++) {
        this.dropdown[i].active = false
      }
      this.profileTabs[index].active = true
      if (index === 1) {
        this.loadSchedule(this.resultTemple.id)
        for (let i = 0; i < this.getSessions.length; i++) {
          for (let j = 0; j < this.getSessions[i].period_recruits.length; j++) {
            if (this.getSessions[i].period_recruits[j].id === this.resultTemple.period_recruit) {
              this.dateStartRecruit = this.getSessions[i].period_recruits[j].time_start
              this.dateEndRecruit = this.getSessions[i].period_recruits[j].time_end
              break
            }
          }
        }
      } else {
        this.roundType = null
      }
    },
    checkStatus () {
      if ((this.resultTemple.status !== 5) && (this.resultTemple.status !== 6) &&
                    (this.resultTemple.status !== 7) && (this.resultTemple.status !== 8) &&
                    (this.resultTemple.status !== 9)) {
        let item = {
          name: 'NEW CANDIDATE',
          value: this.resultTemple.status
        }
        this.statusList.push(item)
      }
    },
    async dropdownView (index) {
      for (let i = 0; i < this.profileTabs.length; i++) {
        this.profileTabs[i].active = false
      }
      this.dropdown[index].active = true
      let result
      if (index === 0) {
        result = await this.getEvaluateResultTrain({candidate: this.resultTemple.id, evaluate_from: 'foa'})
        this.initTraining()
        this.getSuper()
      }
      console.log(result)
    },
    addNew (e) {
      if (e.keyCode === 13) {
        this.resultTemple.certifications.push(this.certifiItem)
        this.certifiItem = ''
      }
    },
    viewCandidate () {
      this.profileTabs[this.profileTabs.length - 1].active = false
      this.profileTabs[0].active = true
    },
    showSchedule (item) {
      let temp = {...item}
      this.schTemplate = Object.assign(temp)
      this.schTemplate.index = this.getSchedule.indexOf(item)
      this.getRoundType(item.name_round)
      this.schedule_dialog = true
    },
    showAllTopic () {
      if (this.topicShowAll.length < 1) {
        this.topicShowAll = this.getTopicResult.map((k, index) => index)
      } else {
        this.topicShowAll = []
      }
    },
    showAllGroup () {
      if (this.groupShowAll.length < 1) {
        this.groupShowAll = this.getGroupResult.map((k, index) => index)
      } else {
        this.groupShowAll = []
      }
      console.log('getGroupResult', this.getGroupResult)
    },
    async editInterview () {
      let payload = {
        candidate: this.resultTemple.id,
        period_recruit: 212,
        name_round: 'INTER-round 1',
        is_pass: this.summary[this.summary.length - 1].is_pass,
        comment: this.summary[this.summary.length - 1].cmt
      }
      console.log('payload in update interview', payload)
    },
    viewInterviewResult (tab, id, recruit) {
      this.roundName = tab
      let payload = {
        candidate: id,
        period_recruit: recruit,
        name_round: tab
      }
      if (this.roundType === 'inter') {
        this.loadGroupResult(payload)
        this.loadTopicResult(payload)
        this.loadSummaryResult(payload)
      }
      if (this.roundType === 'test') {
        this.loadTestResult(payload)
      }
    },
    updateCandidate () {
      let payload = {
        id: this.resultTemple.id,
        body: {
          address: this.resultTemple.address,
          birthday: this.resultTemple.birthday,
          cmnd: this.resultTemple.cmnd,
          created_at: this.resultTemple.created_at,
          cv: this.resultTemple.cv,
          cv_raw: this.resultTemple.cv_raw,
          cv_submitted_time: this.resultTemple.cv_submitted_time,
          education_program: this.resultTemple.education_program,
          education_rank: this.resultTemple.education_rank,
          email: this.resultTemple.email,
          expected_salary: this.resultTemple.expected_salary,
          facebook: this.resultTemple.facebook,
          gender: this.resultTemple.gender,
          gpa: this.resultTemple.gpa,
          interview_accept: this.resultTemple.interview_accept,
          interview_comment: this.resultTemple.interview_comment,
          is_accepted: this.resultTemple.is_accepted,
          is_graduated: this.resultTemple.is_graduated,
          major: this.resultTemple.major,
          marital_status: this.resultTemple.marital_status,
          name_candidate: this.resultTemple.name_candidate,
          nationality: this.resultTemple.nationality,
          note: this.resultTemple.note,
          num_course_owed: this.resultTemple.num_course_owed,
          others_reason: this.resultTemple.others_reason,
          period_recruit: this.resultTemple.period_recruit,
          phone: this.resultTemple.phone,
          photo: this.resultTemple.photo,
          recommendations_salary: this.resultTemple.recommendations_salary,
          reference_person_code: this.resultTemple.reference_person_code,
          school_lever: this.resultTemple.school_lever,
          school_name: this.resultTemple.school_name,
          school_type: this.resultTemple.school_type,
          seasion: this.resultTemple.seasion,
          // status: this.resultTemple.status,
          tech: this.resultTemple.tech
        }
      }
      this.updateCandi(payload)
    },
    deleteItemComment (key) {
      console.log('delete', this.itemsComment)
      this.deleteKeyEvaluateResultComment(key)
    },
    deleteItemContent (key) {
      console.log('delete', this.itemsContent)
      this.deleteKeyEvaluateResultDescription(key)
    },
    async saveContent () {
      if (this.editContent.title) {
        let key = this.editContent.title
        let content = this.editContent.content
        this.itemsContent[key] = content
        this.editContent = {}
        this.dialog1 = false
      }
    },
    addContent () {
      if (this.editContent.title) {
        let key = this.editContent.title
        let content = this.editContent.content
        this.itemsContent[key] = content
        this.editContent = {}
      }
    },

    saveComment () {
      if (this.editComment.title) {
        let key = this.editComment.title
        let comment = this.editComment.comment
        this.itemsComment[key] = comment
        this.editComment = {}
      }
      this.dialog2 = false
    },
    addComment () {
      if (this.editComment.title) {
        let key = this.editComment.title
        let comment = this.editComment.comment
        this.itemsComment[key] = comment
        this.editComment = {}
      }
    },
    async onSaveTotal () {
      this.isLoadingSaveBtn = true
      let payload1 = {
        id_training: this.allSuper.id,
        supervisor_id: this.supervisor.supervisor_id,
        time_start: this.period_from,
        time_end: this.period_to
      }
      this.dialogTotal = false
      await this.updateSupervisor(payload1)
      this.isLoadingSaveBtn = false
    },
    async saveAll () {
      this.isLoadingSaveBtn = true
      try {
        let payload1 = {
          id_training: this.allSuper.id,
          supervisor_id: this.supervisor.supervisor_id,
          time_start: this.period_from,
          time_end: this.period_to
        }
        let payload2 = {
          id_training: this.allSuper.id,
          content: this.itemsContent
        }
        let payload3 = {
          id_training: this.allSuper.id,
          content: this.itemsComment
        }
        await this.updateSupervisor(payload1)
        await this.updateDescription(payload2)
        await this.updateComment(payload3)
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoadingSaveBtn = false
      }
    },
    initTraining () {
      this.period_from = this.allSuper.time_start
      this.period_to = this.allSuper.time_end
      this.supervisor = {
        id: this.allSuper.supervisor.supervisor_id,
        username: this.allSuper.supervisor.supervisor_name
      }
    },
    async getSuper () {
      let payload = {}
      await this.getSupervisor(payload)
    },
    editItemTable (item) {
      console.log('tetssssssssssssss')
    },
    addTableT () {
      console.log('add')
      this.dialogTable = true
      this.dialogTitle = 'Thêm nội dung bảng kiến thức'
    },
    addTableK () {
      console.log('add table K')
    }
  }
}
</script>
