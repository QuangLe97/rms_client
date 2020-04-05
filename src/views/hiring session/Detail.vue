<template>
  <v-row>
    <!-- requirement list -->
    <!--    <v-col-->
    <!--      cols="2">-->
    <!--      <v-list-->
    <!--        class="left-list box"-->
    <!--        style="max-height: 679px; overflow-y: auto;">-->
    <!--        <div class="box-heading">-->
    <!--          <h3 class="box-heading__title">Requirements</h3>-->
    <!--          <v-btn-->
    <!--            text-->
    <!--            style="margin:0 0 0 54px"-->
    <!--            color="success"-->
    <!--            @click="addNewReq">-->
    <!--            <v-icon>mdi-plus</v-icon>-->
    <!--          </v-btn>-->
    <!--        </div>-->
    <!--        <v-list-item-->
    <!--          v-for="(item,i) in hiringSession.requirements"-->
    <!--          :key="i"-->
    <!--          class="l-item"-->
    <!--        >-->
    <!--          <v-checkbox-->
    <!--            v-model="item.status"-->
    <!--            color="primary"-->
    <!--          />-->
    <!--          <v-list-item-content-->
    <!--            class="l-item__content"-->
    <!--            style="cursor: pointer;"-->
    <!--            @click="editRequirement(item)">-->
    <!--            <v-list-item-title v-text="item.name"/>-->
    <!--          </v-list-item-content>-->
    <!--        </v-list-item>-->
    <!--        &lt;!&ndash; requirement dialog &ndash;&gt;-->
    <!--        <v-dialog-->
    <!--          v-model="reqDialog"-->
    <!--          max-width="500px">-->
    <!--          <v-card>-->
    <!--            <v-card-title>-->
    <!--              <span class="headline">{{ formTitle }}</span>-->
    <!--            </v-card-title>-->

    <!--            <v-card-text>-->
    <!--              <div class="middle-detail box">-->
    <!--                <v-form-->
    <!--                  ref="form"-->
    <!--                  v-model="valid"-->
    <!--                  lazy-validation-->
    <!--                  class="m-form-detail mt-5"-->
    <!--                >-->
    <!--                  <v-row>-->
    <!--                    <v-col cols="4">-->
    <!--                      &lt;!&ndash; role &ndash;&gt;-->
    <!--                      <v-select-->
    <!--                        v-model="editReqItem.role"-->
    <!--                        :items="roleItems"-->
    <!--                        :rules="[v => !!v || 'Role is required']"-->
    <!--                        label="Role"-->
    <!--                        required-->
    <!--                      />-->
    <!--                    </v-col>-->
    <!--                    <v-col cols="4">-->
    <!--                      &lt;!&ndash; amount &ndash;&gt;-->
    <!--                      <v-text-field-->
    <!--                        v-model="editReqItem.amount"-->
    <!--                        label= "Amount"-->
    <!--                        max="200"-->
    <!--                        min="1"-->
    <!--                        step="1"-->
    <!--                        type="number"-->
    <!--                        required-->
    <!--                        @keydown="false"-->
    <!--                      />-->
    <!--                    </v-col>-->
    <!--                    <v-col cols="4">-->
    <!--                      &lt;!&ndash; role &ndash;&gt;-->
    <!--                      <v-text-field-->
    <!--                        v-model="editReqItem.expYears"-->
    <!--                        label= "Experience Years"-->
    <!--                        max="30"-->
    <!--                        min="0"-->
    <!--                        step="1"-->
    <!--                        type="number"-->
    <!--                        required-->
    <!--                        @keydown="false"-->
    <!--                      />-->
    <!--                    </v-col>-->
    <!--                    <v-col cols="12">-->
    <!--                      <v-text-field-->
    <!--                        v-model="editReqItem.requirement"-->
    <!--                        label="Requirement"-->
    <!--                        required-->
    <!--                        dense-->
    <!--                      />-->
    <!--                    </v-col>-->
    <!--                    <v-col cols="12">-->
    <!--                      <v-combobox-->
    <!--                        v-model="editReqItem.forLan"-->
    <!--                        :items="lanPopular"-->
    <!--                        chips-->
    <!--                        clearable-->
    <!--                        label="Foreign Language"-->
    <!--                        multiple-->
    <!--                      >-->
    <!--                        <template v-slot:selection="{ attrs, item, select, selected }">-->
    <!--                          <v-chip-->
    <!--                            v-bind="attrs"-->
    <!--                            :input-value="selected"-->
    <!--                            close-->
    <!--                            @click="select"-->
    <!--                            @click:close="removeLan(item)"-->
    <!--                          >-->
    <!--                            <strong>{{ item }}</strong>&nbsp;-->
    <!--                          </v-chip>-->
    <!--                        </template>-->
    <!--                      </v-combobox>-->
    <!--                    </v-col>-->
    <!--                    <v-col cols="4">-->
    <!--                      &lt;!&ndash; education level &ndash;&gt;-->
    <!--                      <v-select-->
    <!--                        v-model="editReqItem.eduLevel"-->
    <!--                        :items="levelItems"-->
    <!--                        :rules="[v => !!v || 'level is required']"-->
    <!--                        label="Education Level"-->
    <!--                        required-->
    <!--                      />-->
    <!--                    </v-col>-->
    <!--                    <v-col cols="4">-->
    <!--                      &lt;!&ndash; graduated &ndash;&gt;-->
    <!--                      <v-text-field-->
    <!--                        v-model="editReqItem.graYear"-->
    <!--                        label= "Graduated Year"-->
    <!--                        max="2020"-->
    <!--                        min="1996"-->
    <!--                        step="1"-->
    <!--                        type="number"-->
    <!--                        required-->
    <!--                        @keydown="false"-->
    <!--                      />-->
    <!--                    </v-col>-->
    <!--                    <v-col cols="4">-->
    <!--                      &lt;!&ndash; gpa &ndash;&gt;-->
    <!--                      <v-text-field-->
    <!--                        v-model="editReqItem.gpa"-->
    <!--                        label= "GPA"-->
    <!--                        max="10"-->
    <!--                        min="6.5"-->
    <!--                        step="0.1"-->
    <!--                        type="number"-->
    <!--                        required-->
    <!--                        @keydown="false"-->
    <!--                      />-->
    <!--                    </v-col>-->
    <!--                  </v-row>-->
    <!--                </v-form>-->
    <!--              </div>-->
    <!--            </v-card-text>-->
    <!--            <v-card-actions>-->
    <!--              <v-spacer/>-->
    <!--              <v-btn-->
    <!--                color="blue darken-1"-->
    <!--                text-->
    <!--                @click="closeDialog">Cancel</v-btn>-->
    <!--              <v-btn-->
    <!--                color="blue darken-1"-->
    <!--                text-->
    <!--                @click="saveRequirement">Save</v-btn>-->
    <!--              <v-btn-->
    <!--                color="blue darken-1"-->
    <!--                text-->
    <!--                @click="deleteRequirement(item)">Delete</v-btn>-->
    <!--            </v-card-actions>-->
    <!--          </v-card>-->
    <!--        </v-dialog>-->
    <!--        &lt;!&ndash; end of requirement dialog &ndash;&gt;-->
    <!--      </v-list>-->
    <!--      &lt;!&ndash; fin candidate &ndash;&gt;-->

    <!--      <div>-->
    <!--        <v-btn-->
    <!--          class=" mt-5 btn btn&#45;&#45;primary"-->
    <!--          @click="findCandidate($route.params.id)">-->
    <!--          Find Candidate-->
    <!--        </v-btn>-->
    <!--        <p class="mt-3">Select requirement to find more dencent candidates</p>-->
    <!--      </div>-->
    <!--    </v-col>-->
    <v-col cols="2">
      <div class="box-heading">
        <h3 class="box-heading__title mt-5">{{ $t('hiring.detail.filter.name') }}</h3>
      </div>
      <v-form
        ref="form"
        lazy-validation
        class="formfilter box pl-2"
        style="max-height: 785px; overflow-y: auto;"
      >
        <!-- period -->
        <div>
          <div>
            {{ $t('hiring.detail.filter.from') }}
            <div class="input input--short">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"

              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="filterList.period_from"
                    label="YYYY/MM/DD"
                    solo
                    readonly
                    dense
                    style="width: auto"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="filterList.period_from"
                  :max="filterList.period_to"
                  @input="menu1 = false"
                />
              </v-menu>
            </div>
            {{ $t('hiring.detail.filter.to') }}
            <div class="input input--short">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"

              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="filterList.period_to"
                    label="YYYY/MM/DD"
                    solo
                    readonly
                    dense
                    style="width: auto"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="filterList.period_to"
                  :min="filterList.period_from"
                  @change="$refs.menu2.save(filterList.period_to)"
                  @input="menu2 = false"
                />
              </v-menu>
            </div>
          </div>
        </div>

        <!-- status -->
        <div>
          <div class="label">
            {{ $t('hiring.detail.filter.stt') }}
          </div>
          <div class="input input--normal">
            <v-checkbox
              v-model="filterList.status"
              :value="2"
              :label="$t('hiring.detail.filter.rej')"
              class="mx-2"/>
            <v-checkbox
              v-model="filterList.confirm"
              :value="1"
              :label="$t('hiring.detail.filter.conf')"
              class="mx-2"/>
          </div>
        </div>
        <!-- advanced -->
      </v-form>
      <div class="btnfilter">
        <v-btn
          v-model="filterList.btnFilter"
          class="btn btn--primary"
          @click="filterHiring"
        >
          {{ $t('hiring.detail.btnClear') }}
        </v-btn>
        <!--        <v-btn-->
        <!--          class=" mt-5 btn btn&#45;&#45;primary"-->
        <!--          @click="findCandidate($route.params.id)">-->
        <!--          Find Candidate-->
        <!--        </v-btn>-->
      </div>
    </v-col>

    <!-- result -->
    <v-col
      cols="9"
      class="right-raw"
      style="padding: 3px;">
      <div class="box">
        <div class="box-heading">
          <h3 class="box-heading__title mt-3">{{ $t('hiring.detail.tabName') }}</h3>
        </div>
        <v-data-table
          v-model="accepted"
          :headers="headers"
          :items="itemCandidate"
          class="elevation-1"
          style="max-height: 770px; overflow-y: auto;"
          show-select
          hide-default-footer
          disable-pagination
          @click:row="showCvDetail"
        >
          <template v-slot:item.avatar="{ item }">
            <div class="avatar">
              <v-icon
                v-if="item.photo === null">
                mdi-48px mdi-account-circle center
              </v-icon>
              <v-img
                v-else
                :src="`${item.photo}`"
                width="80px"
                height="80px"
              />
            </div>
          </template>
          <template v-slot:item.perInfo="{ item }">
            <p
              v-if="item.error"
              class="my-1 red--text font-weight-bold">
              {{ item.error }}
            </p>
            <p class="ma-0"> {{ item.name_candidate }}</p>
            <p class="ma-0">{{ item.email }}</p>
            <p class="ma-0">{{ item.school_name }}</p>
          </template>
          <template v-slot:item.fileInfo="{ item }">
            {{ item.created_at.split('T')[0] }}<br>
            {{ item.updated_at.split('T')[0] }}<br>
            {{ item.existed > 0 ? 'duplicated':'' }}
          </template>
          <template v-slot:item.action="{ item }">
            {{ item.confirm === 0 ? $t('hiring.detail.filter.nconf') : $t('hiring.detail.filter.conf') }}<br>
            {{ item.status === 2 ? $t('hiring.detail.filter.rej') :null }}
            {{ item.period_recruit }}
          </template>
        </v-data-table>
        <div class="text-right mt-5">
          <v-btn
            :disabled="prevPage === null"
            small
            @click="loadPrevPage"><v-icon>$prev</v-icon></v-btn>
          <v-btn
            :disabled="nextPage === null"
            small
            @click="loadNextPage"><v-icon>$next</v-icon></v-btn>
        </div>
        <v-btn
          :loading="buttonSubmitLoading"
          v-model="accepted"
          dark
          large
          class="btn btn--primary"
          @click="saveAccepted($route.params.id)">{{ $t('hiring.detail.btnAdd') }}</v-btn>
      </div>
      <!-- v-show="initDetail" -->
    </v-col>
    <!-- raw -->
    <cvDetailDialog
      :show-dialog="dialog"
      :cv="resultTemplate.cvInfo"
      @close="dialog = false"
      @update="updateState"/>
  </v-row>
</template>
<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
import cvDetailDialog from '../components/cvDetailDialog'

export default {
  components: {
    cvDetailDialog
  },
  data () {
    return {
      buttonSubmitLoading: false,
      hiringSession: {
        name: 'SpringSession',
        start: null,
        end: null,
        status: null
      },
      // requirement dialog
      reqDialog: false,
      editIndex: -1,
      editReqItem: {
        name: '',
        role: '',
        amount: 0,
        expYears: 0,
        requirement: '',
        forLan: [],
        eduLevel: '',
        graYear: 0,
        gpa: 0,
        status: true
      },
      defaultReqItem: {
        name: '',
        role: '',
        amount: 0,
        expYears: 0,
        requirement: '',
        forLan: [],
        eduLevel: '',
        graYear: 0,
        gpa: 0,
        status: true
      },
      roleItems: [
        'Manager',
        'Developer',
        'Design',
        'HR'
      ],
      levelItems: [
        'Master',
        'Doctor',
        'College',
        'Bachelor'
      ],
      lanPopular: ['English', 'Japanese', 'Chinese', 'Korean', 'Italian'],
      // result founded
      perInfo: [],
      fileInfo: [],
      action: [],
      avatar: [],
      accepted: [],
      // raw cv
      tab: null,
      tabViews: [
        {
          name: 'Text'
        },
        {
          name: 'Pdf'
        }
      ],
      itemsPerPageOptions: [
        5,
        10,
        15,
        20
      ],
      resultTemplate: {
        avatar: '',
        cvInfo: {
          id: '',
          name_candidate: '',
          email: '',
          phone: '',
          photo: '',
          cv: '',
          facebook: '',
          birthday: '',
          gender: '',
          address: '',
          nationality: '',
          school_name: '',
          gpa: '',
          seasion: '',
          major: '',
          school_lever: '',
          is_graduated: '',
          tech: [],
          hobbies: '',
          provider: '',
          expected_salary: '',
          others: '',
          tex_raw: '',
          created_at: '',
          updated_at: '',
          status: '',
          confirm: '',
          existed: '',
          user_create: {},
          certifications: [],
          experiences: [],
          note: ''
        },
        reqSatisfied: [],
        isAccepted: false
      },
      dialog: false,
      filterList: {
        period_from: null,
        period_to: new Date().toISOString().substr(0, 10),
        status: null,
        reject: null,
        confirm: null,
        period_recruit: null,
        btnFilter: null
      },
      menu1: false,
      menu2: false,
      aaa: null
    }
  },
  computed: {
    ...mapState('hiring_detail', ['candidateHiring', 'nextPage', 'prevPage']),
    ...mapState('candidate', ['viewId']),
    ...mapGetters('hiring_detail', ['getHiringList']),

    headers () {
      return [
        {text: this.$t('hiring.detail.headerTable.ava'), value: 'avatar'},
        {text: this.$t('hiring.detail.headerTable.perInfo'), value: 'perInfo'},
        // {text: 'Tag Requirement', value: 'reqSatisfied'},
        {text: this.$t('hiring.detail.headerTable.fileInfo'), value: 'fileInfo'},
        {text: this.$t('hiring.detail.headerTable.note'), value: 'note'},
        {text: this.$t('hiring.detail.headerTable.stt'), value: 'action'}
      ]
    },
    itemCandidate () {
      var filter = this.filterList
      if ((filter.confirm === null) && (filter.status === 1 || filter.status === null) &&
          (filter.period_from === null || filter.period_to === null)) {
        return this.$store.state.hiring_detail.candidateHiring
      }

      let res = this.candidateHiring.filter(item => {
        let resultCheckStatus = item.status === filter.status || filter.status === null
        let resultCheckConfirm = item.confirm === filter.confirm || filter.confirm === null
        let resultCheckPeriod = new Date(item.created_at.split('T')[0])
        let start = new Date(this.filterList.period_from)
        let end = new Date(this.filterList.period_to)
        start.setDate(start.getDate() - 1)
        end.setDate(end.getDate() + 1)

        console.log(this.filterList.period_to)
        console.log(start < resultCheckPeriod)
        console.log(resultCheckPeriod < end)
        console.log(resultCheckConfirm)
        console.log(resultCheckStatus)
        // eslint-disable-next-line no-mixed-operators
        return (start < resultCheckPeriod && resultCheckPeriod < end && resultCheckStatus && resultCheckConfirm)
      })
      return res
    },

    formTitle () {
      return this.editIndex === -1 ? 'New Requirement' : 'Edit Requirement'
    },
    paginationPage: {
      get () {
        return this.page
      },
      set (val) {
        this.setPage(val)
        this.getData()
      }
    },
    paginationItemsPerPage: {
      get () {
        return this.itemsPerPage
      },
      set (val) {
        this.setPage(1)
        this.setItemsPerPage(val)
        this.getData()
      }
    }
  },
  watch: {
    // dialog (val) {
    //   val || this.close()
    // },
    itemCandidate (value) {
      console.log('itemCandidate')
    }
  },
  created () {
    console.log('created detail')
    this.findCandidate()
    console.log('candidate hiring list', this.candidateHiring)
  },
  // updated () {
  //   console.log('update detail')
  // },
  mounted () {
    console.log('mounted detail')
  },

  methods: {
    ...mapMutations('hiring_detail', ['setCandidateHiring', 'setAddCv', 'editCandidateHiring']),
    ...mapMutations('candidate', ['setViewId']),
    ...mapActions('hiring_detail', ['getCandidateHiring', 'addCvPeriod', 'loadHiringPage']),
    ...mapActions('candidate', ['getHiringSession']),

    updateState (payload) {
      console.log('data from child component', payload)
      // this.updateCv(payload)
      this.editCandidateHiring(payload)
      this.dialog = false
    },
    removeLan (item) {
      this.languages.splice(this.languages.indexOf(item), 1)
      this.languages = [...this.languages]
    },
    save (date) {
      this.$refs.menu.save(date)
    },

    editRequirement (item) {
      this.editIndex = this.hiringSession.requirements.indexOf(item)
      this.editReqItem = Object.assign({}, item)
      this.reqDialog = true
    },

    addNewReq () {
      this.editReqItem = Object.assign({}, this.defaultReqItem)
      this.reqDialog = true
      console.log('dialog status: ', this.reqDialog)
    },

    deleteRequirement (item) {
      const index = this.editIndex
      confirm('Are you sure you want to delete this requirement?') && this.hiringSession.requirements.splice(index, 1)
      this.closeDialog()
    },

    closeDialog () {
      this.reqDialog = false
      setTimeout(() => {
        this.editReqItem = Object.assign({}, this.defaultReqItem)
        this.editIndex = -1
      }, 300)
    },

    saveRequirement () {
      if (this.editIndex > -1) {
        Object.assign(this.hiringSession.requirements[this.editIndex], this.editReqItem)
      } else {
        this.editReqItem.name = this.hiringSession.name + '-req-' + (this.hiringSession.requirements.length + 1)
        this.hiringSession.requirements.push(this.editReqItem)
      }
      this.closeDialog()
    },
    // result founded
    showCvDetail (record) {
      this.resultTemplate.cvInfo = Object.assign({}, record)
      this.resultTemplate.cvInfo.tech = this.strToArr(this.resultTemplate.cvInfo.tech)

      this.dialog = true
    },
    acceptCandidate () {
      let currentCandidate = this.desserts.find(candidate => {
        if (candidate.cvInfo.id === this.resultTemplate.cvInfo.id) {
          return candidate
        }
      })
      currentCandidate.isAccepted = !currentCandidate.isAccepted
      this.resultTemplate = Object.assign({}, currentCandidate)
    },
    async saveAccepted (id) {
      this.buttonSubmitLoading = true
      try {
        let accepted = [...this.accepted]
        let selectedIds = accepted.map((item) => {
          return item.id
        })
        const payload = {...{cv_raws: selectedIds}, period_recruit: id}
        await this.addCvPeriod(payload)
      } catch (e) {
        console.log(e)
      } finally {
        this.buttonSubmitLoading = false
      }
    },
    findCandidate () {
      let payload = {period_recruit: this.$route.params.id}
      this.getCandidateHiring(payload)
    },
    getData () {
      let payload = {
        'page': this.page,
        'items_per_page': this.itemsPerPage
      }
      console.log(payload)
      this.getCandidateHiring(payload)
    },
    async filterHiring () {
      this.filterList.period_from = null
      this.filterList.period_to = new Date().toISOString().substr(0, 10)
      this.filterList.confirm = null
      this.filterList.status = null
      this.filterList.reject = null
    },
    saveFrom (date) {
      this.$refs.menu1.save(this.filterList.period_from)
      this.filterList.period_to = this.filterList.period_from
    },
    async loadNextPage () {
      await this.loadHiringPage(this.nextPage) // work
      this.nextPage = this.getNextPage() // work
      this.prevPage = this.getPrevPage() // doesn't work
      // update table
      this.cvs = this.getCvs()
    },
    async loadPrevPage () {
      await this.loadHiringPage(this.prevPage)
      this.nextPage = this.getNextPage()
      this.prevPage = this.getPrevPage()
      this.cvs = this.getCvs()
    },
    /*
     *  helper
    */
    strToArr (str) {
      if (typeof (str) !== 'string') {
        return str
      }
      let arr = str.split(',')
      return arr
    }
  }
}
</script>

<style lang="scss">
  @import '../../scss/components/_3-columns.scss';
  @import '../../scss/components/_avatar.scss';
  @import '../../scss/components/_form.scss';
  @import '../../scss/components/_btn.scss';
  @import '@/scss/components/_avatar.scss';
  .custom-radio {
    .v-input__slot {
      margin-bottom: 0 !important;
    }
  }
</style>
