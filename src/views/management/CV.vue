<template>
  <div class="cv-management">

    <!-- Title & search -->
    <v-row class="mb-2">
      <v-col cols="3">
        <h3
          class="heading heading--small"
        >{{ $t('manageCv.header') }}</h3>
      </v-col>
      <v-col cols="9">
        <v-text-field
          v-model="searchText"
          solo
          label="Search..."
          prepend-inner-icon="mdi-magnify"
          hide-details
          @keyup="search"
        />
      </v-col>
    </v-row>

    <!-- Filter & table -->
    <v-row>
      <v-col
        cols="3"
        style="">
        <v-form
          ref="form"
          lazy-validation
          class="formfilter box pl-2"
          style="max-height: 700px; overflow-y: auto; overflow-x: hidden; padding: 0;">
          <!-- period -->
          <div>
            <div class="label">
              {{ $t('manageCv.period') }}
            </div>
            <div>
              <!-- From ... to -->
              <div class="input input--short">
                <v-menu
                  ref="from_menu"
                  v-model="period_from_menu"
                  :close-on-content-click="false"
                  :return-value.sync="filterList.period_from"
                  transition="scale-transition"
                  offset-y
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="filterList.period_from"
                      solo
                      readonly
                      dense
                      placeholder="from"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="filterList.period_from"
                    :max="new Date().toISOString().substr(0, 10)"
                    no-title
                    scrollable
                    @change="saveFrom"
                  />
                </v-menu>
              </div>
              -
              <div class="input input--short">
                <v-menu
                  ref="to_menu"
                  v-model="period_to_menu"
                  :close-on-content-click="false"
                  :return-value.sync="filterList.period_to"
                  transition="scale-transition"
                  offset-y
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="filterList.period_to"
                      solo
                      readonly
                      dense
                      placeholder="to"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="filterList.period_to"
                    :min="filterList.period_from"
                    :max="new Date().toISOString().substr(0, 10)"
                    no-title
                    scrollable
                    @change="$refs.to_menu.save(filterList.period_to)"
                  />
                </v-menu>
              </div>

              <!-- Find -->
              <div>
                <v-btn
                  class="btn btn--primary mb-5"
                  style="width: 50%"
                  @click="findCv"
                >
                  {{ $t('manageCv.btnFind') }}
                </v-btn>
              </div>
            </div>
          </div>
          <v-divider/>

          <h5 class="sub-heading mt-3">
            Filter
          </h5>
          <!-- status -->
          <div>
            <v-row
              justify="space-between"
              style="margin: 0;">
              <v-checkbox
                v-model="filterList.is_used"
                value="1"
                class="mx-2">
                <template v-slot:label>
                  <span
                    class="mr-2"
                    v-text="$t('manageCv.filter.used')"/>
                  <img
                    src="@/icons/old.svg"
                    class="icon"
                    alt="icon">
                </template>
              </v-checkbox>
              <v-checkbox
                v-model="filterList.is_used"
                :label= "$t('manageCv.filter.new')"
                value="0"
                class="mx-2">
                <template v-slot:label>
                  <span
                    class="mr-2"
                    v-text="$t('manageCv.filter.new')"/>
                  <img
                    src="@/icons/new.svg"
                    class="icon"
                    alt="icon">
                </template>
              </v-checkbox>
            </v-row>
          </div>

          <v-divider/>
          <v-row
            justify="space-between"
            style="margin: 0;">

            <v-checkbox
              v-model="filterList.status"
              :value="2"
              class="mx-2">
              <template v-slot:label>
                <span
                  class="mr-2"
                  v-text="$t('manageCv.filter.reject')"/>
                <img
                  src="@/icons/file-deny.svg"
                  class="icon"
                  alt="icon">
              </template>
            </v-checkbox>
            <v-checkbox
              v-model="filterList.status"
              :value="4"
              :label= "$t('manageCv.filter.delayInter')"
              class="mx-2">
              <template v-slot:label>
                <span
                  class="mr-2"
                  v-text="$t('manageCv.filter.delayInter')"/>
                <img
                  src="@/icons/delay.svg"
                  class="icon"
                  alt="icon">
              </template>
            </v-checkbox>
            <v-checkbox
              v-model="filterList.status"
              :value="3"
              :label= "$t('manageCv.filter.deniedInter')"
              class="mx-2">
              <template v-slot:label>
                <span
                  class="mr-2"
                  v-text="$t('manageCv.filter.deniedInter')"/>
                <img
                  src="@/icons/deny-times.svg"
                  class="icon"
                  alt="icon">
              </template>
            </v-checkbox>
          </v-row>

          <v-divider/>
          <v-row
            justify="space-between"
            style="margin: 0;">
            <v-checkbox
              v-model="filterList.confirm"
              value="1"
              class="mx-2">
              <template v-slot:label>
                <span
                  class="mr-2"
                  v-text="$t('manageCv.filter.confirm')"/>
                <img
                  src="@/icons/success-cloud.svg"
                  class="icon"
                  alt="icon">
              </template>
            </v-checkbox>
            <v-checkbox
              v-model="filterList.confirm"
              value="0"
              class="mx-2">
              <template v-slot:label>
                <span
                  class="mr-2"
                  v-text="$t('manageCv.filter.unconfirmed')"/>
                <img
                  src="@/icons/success-cloud-disabled.svg"
                  class="icon"
                  alt="icon">
              </template>
            </v-checkbox>
          </v-row>

          <v-divider />
          <!-- advanced -->
          <div>
            <v-expansion-panels>
              <v-expansion-panel style="background-color: transparent;">
                <v-expansion-panel-header
                  class="pl-0"
                  expand-icon="mdi-menu-down"
                >
                  {{ $t('manageCv.filter.advanced') }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <!-- school -->
                  <div>
                    <div class="label">
                      {{ $t('manageCv.filter.scho') }}
                    </div>
                    <div class="input input--normal">
                      <v-combobox
                        v-model="filterList.school"
                        :items="popularSchools"
                        :label="$t('manageCv.filter.schoNote')"
                        dense
                        solo
                      />
                    </div>
                  </div>
                  <!-- GPA -->
                  <div>
                    <div class="label">
                      {{ $t('manageCv.filter.gpa') }}
                    </div>
                    <div class="input input--Sshort">
                      <v-text-field
                        v-model="filterList.gpa_from"
                        :label="$t('manageCv.filter.from')"
                        max="10"
                        min="5"
                        step="0.1"
                        type="number"
                        dense
                        solo
                        @change="filterList.gpa_to = filterList.gpa_from"
                      />
                    </div>
                    -
                    <div class="input input--Sshort">
                      <v-text-field
                        v-model="filterList.gpa_to"
                        :disabled="!filterList.gpa_from ? true:false"
                        :label="$t('manageCv.filter.to')"
                        :min="filterList.gpa_from"
                        max="10"
                        step="0.1"
                        type="number"
                        dense
                        solo
                      />
                    </div>
                  </div>
                  <!-- gender -->
                  <div>
                    <div class="label">
                      {{ $t('manageCv.filter.gender') }}
                    </div>
                    <div class="input input--no-border">
                      <v-radio-group
                        v-model="filterList.gender"
                        dense
                        row
                        class="input-box__input__radio"
                      >
                        <v-radio
                          :input-value="filterList.gender"
                          :label="$t('manageCv.filter.fmale')"
                          style="height: 38px; line-height: 38px;"
                        />
                        <v-radio
                          :input-value="filterList.gender"
                          :label="$t('manageCv.filter.male')"
                          style="height: 38px; line-height: 38px;"
                        />
                      </v-radio-group>
                    </div>
                  </div>
                  <!-- age -->
                  <div>
                    <div class="label">
                      {{ $t('manageCv.filter.age') }}
                    </div>
                    <div class="input input--Sshort">
                      <v-text-field
                        v-model="filterList.age_from"
                        :label="$t('manageCv.filter.from')"
                        max="50"
                        min="18"
                        step="1"
                        type="number"
                        dense
                        solo
                        @change="filterList.age_to = filterList.age_from"
                      />
                    </div>
                    -
                    <div class="input input--Sshort">
                      <v-text-field
                        v-model="filterList.age_to"
                        :disabled="!filterList.age_from ? true:false"
                        :label="$t('manageCv.filter.to')"
                        :min="filterList.age_from"
                        max="50"
                        step="1"
                        type="number"
                        dense
                        solo
                      />
                    </div>
                  </div>
                  <!-- Skills -->
                  <div>
                    <div class="label">
                      {{ $t('manageCv.filter.skill') }}
                    </div>
                    <div class="input input--normal">
                      <v-combobox
                        v-model="filterList.skills"
                        :items="popularSkills"
                        :label="$t('manageCv.filter.skill')"
                        chips
                        clearable
                        multiple
                        dense
                        solo
                      >
                        <template v-slot:selection="{ attrs, item, select, selected }">
                          <v-chip
                            v-bind="attrs"
                            :input-value="selected"
                            close
                            @click:close="removeSkill(item)"
                          >
                            <strong>{{ item }}</strong>&nbsp;
                          </v-chip>
                        </template>
                      </v-combobox>
                    </div>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-form>

      </v-col>
      <v-col cols="9">
        <!-- table result -->
        <div class="mb-5">
          <v-btn
            class="btn btn--primary"
            @click="addToHiring">
            {{ $t('manageCv.btnAdd') }}
          </v-btn>
          <v-btn
            class="ml-4 btn btn--secondary"
            @click="deleteCV">
            {{ $t('manageCv.btnDelete') }}
          </v-btn>
        </div>

        <v-data-table
          id="table"
          ref="dataTable"
          v-model="selected"
          :headers="headers"
          :items="filteredCvs"
          hide-default-footer
          disable-pagination
          class="elevation-1"
          style=""
          show-select
          @click:row="showCvDetail">
          <!-- avatar column -->
          <template v-slot:item.avatar="{ item }">
            <div class="avatar">
              <v-icon
                v-if="item.photo === null"
                style="font-size: 70px;">
                mdi-account-circle
              </v-icon>
              <v-img
                v-else
                :src="`${item.photo}`"
              />
            </div>
          </template>
          <!-- personal column -->
          <template v-slot:item.person="{ item }">
            <p
              v-if="item.error"
              class="my-1 red--text font-weight-bold">
              {{ item.error }}
            </p>
            <span class="content-primary">

              {{ item.name_candidate }}
            </span><br>
            <span class="content-secondary">

              {{ item.birthday }}<br>
              {{ item.gender == 1 ? 'male':'female' }}
            </span>
          </template>
          <!-- contact column -->
          <template v-slot:item.contact="{ item }">
            <div style="width: 230px">
              <span class="content-primary">
                {{ item.email }}<br>
              </span>
              <span class="content-secondary">
                {{ item.phone }}<br>
                {{ item.address }}
              </span>
            </div>
          </template>
          <!-- education column -->
          <template v-slot:item.edu="{ item }">
            <span class="content-primary">
              {{ item.school_name }}<br>
            </span>
            <span class="content-secondary">
              {{ item.major }}<br>
              {{ item.school_level }}<br>
              {{ item.seasion }}<br>
              <!-- 0 -> undergraduate, 1 -> graduated -->
              {{ item.is_graduated === 0 ? 'undergraduate' : 'graduated' }}
            </span>
          </template>
          <!-- ability column -->
          <template v-slot:item.tech="{ item }">
            <div style="word-break: break-word; width: 200px;">{{ prepareSkill(item.tech) }}</div>
          </template>
          <!-- file column -->
          <template v-slot:item.filInfo="{ item }">
            <div style="width: 120px">
              <span class="content-secondary">upload:</span>{{ getDateFromDateTime(item.created_at) }}<br>
              <span class="content-secondary">update:</span>{{ getDateFromDateTime(item.updated_at) }}<br>
              <span class="content-secondary">{{ item.existed.length == 0 ? 'single':'duplicated' }}<br>
                {{ item.provider }}
              </span>
            </div>
          </template>
          <!-- note column -->
          <template v-slot:item.note="{ item }">
            <div class="three-line-ellipse">
              {{ item.note }}
            </div>
          </template>
          <!-- status -->
          <template v-slot:item.status="{ item }">
            {{ item.is_used !== 0 ? 'used':'new' }}<br>
            {{ item.confirm === 0 ? 'none':'confirm' }}<br>
            {{ item.status === 1 ? 'normal':null }}
            {{ item.status === 2 ? 'reject':null }}
            {{ item.status === 3 ? 'denise':null }}
            {{ item.status === 4 ? 'delay':null }}
          </template>
        </v-data-table>

        <!-- Pagination -->
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
      </v-col>

    </v-row>

    <!-- raw -->
    <cvDetailDialog
      :show-dialog="showCvDetailDialog"
      :cv="resultTemplate"
      @close="showCvDetailDialog = false"
      @update="updateState"/>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import cvDetailDialog from '../components/cvDetailDialog'
export default {
  components: {
    cvDetailDialog
  },
  data () {
    return {
      ...mapState('management', ['cvList']),
      cvs: [],
      draftData: [
        {
          photo: null,
          name_candidate: 'Nguyen Van A',
          birthday: '1-1-2020', // mm-dd-yyyy
          gender: 0, // 0 -> male, 1: female
          email: 'abc@gmail.com',
          phone: '0929123456',
          address: '227 Nguyễn Văn Cừ, phường 4, quận 3, thành phố Hồ Chí Minh',
          school_name: 'Đại học Khoa học Tự nhiên',
          major: 'Kĩ thuật phần mềm',
          school_level: 'Đại học',
          seasion: '2016-2020', // should change to season
          is_graduated: 0, // 0 -> undergraduate, 1 -> graduated
          tech: 'c++,c#,c,java,html,css,javascript',
          created_at: '1-1-2020',
          updated_at: null,
          existed: [],
          provider: 'ITViec',
          note: 'Đây là một đoạn note cực kì dài, để kiểm tra xem khả năng co giãn của giao diện có tốt không',
          is_used: 0, // 0 -> new, used
          confirm: 0, // 0 -> none, confirm
          status: 1 // 1 -> normal, 2 -> rejected, 3 -> denied, 4 -> delay
        },
        {
          photo: null,
          name_candidate: 'Nguyen Van B',
          birthday: '1-1-2020', // mm-dd-yyyy
          gender: 1, // 0 -> male, 1: female
          email: 'abc@gmail.com',
          phone: '0929123456',
          address: '227 Nguyễn Văn Cừ, phường 4, quận 3, thành phố Hồ Chí Minh',
          school_name: 'Đại học Khoa học Tự nhiên',
          major: 'Kĩ thuật phần mềm',
          school_level: 'Đại học',
          seasion: '2016-2020', // should change to season
          is_graduated: 1, // 0 -> undergraduate, 1 -> graduated
          tech: 'c++,c#,c,java,html,css,javascript',
          created_at: '1-1-2020',
          updated_at: '1-1-2020',
          existed: ['a'],
          provider: 'ITViec',
          note: 'Đây là một đoạn note cực kì dài, để kiểm tra xem khả năng co giãn của giao diện có tốt không',
          is_used: 1, // 0 -> new, used
          confirm: 2, // 0 -> none, confirm
          status: 2 // 1 -> normal, 2 -> rejected, 3 -> denied, 4 -> delay
        },
        {
          photo: null,
          name_candidate: 'Nguyen Thi C',
          birthday: '1-1-2020', // mm-dd-yyyy
          gender: 0, // 0 -> male, 1: female
          email: 'abc@gmail.com',
          phone: '0929123456',
          address: '227 Nguyễn Văn Cừ, phường 4, quận 3, thành phố Hồ Chí Minh',
          school_name: 'Đại học Khoa học Tự nhiên',
          major: 'Kĩ thuật phần mềm',
          school_level: 'Đại học',
          seasion: '2016-2020', // should change to season
          is_graduated: 0, // 0 -> undergraduate, 1 -> graduated
          tech: 'c++,c#,c,java,html,css,javascript',
          created_at: '1-1-2020',
          updated_at: null,
          existed: [],
          provider: 'ITViec',
          note: 'Đây là một đoạn note cực kì dài, để kiểm tra xem khả năng co giãn của giao diện có tốt không',
          is_used: 0, // 0 -> new, used
          confirm: 0, // 0 -> none, confirm
          status: 3 // 1 -> normal, 2 -> rejected, 3 -> denied, 4 -> delay
        },
        {
          photo: null,
          name_candidate: 'Nguyen Thi D',
          birthday: '1-1-2020', // mm-dd-yyyy
          gender: 0, // 0 -> male, 1: female
          email: 'abc@gmail.com',
          phone: '0929123456',
          address: '227 Nguyễn Văn Cừ, phường 4, quận 3, thành phố Hồ Chí Minh',
          school_name: 'Đại học Khoa học Tự nhiên',
          major: 'Kĩ thuật phần mềm',
          school_level: 'Đại học',
          seasion: '2016-2020', // should change to season
          is_graduated: 0, // 0 -> undergraduate, 1 -> graduated
          tech: 'c++,c#,c,java,html,css,javascript',
          created_at: '1-1-2020',
          updated_at: null,
          existed: [],
          provider: 'ITViec',
          note: 'Đây là một đoạn note cực kì dài, để kiểm tra xem khả năng co giãn của giao diện có tốt không',
          is_used: 0, // 0 -> new, used
          confirm: 0, // 0 -> none, confirm
          status: 4 // 1 -> normal, 2 -> rejected, 3 -> denied, 4 -> delay
        }
      ],
      showCvDetailDialog: false,
      // general
      // search
      searchText: '',
      // filter
      filterList: {
        period_from: null,
        period_to: null,
        school: null,
        gpa_from: null,
        gpa_to: null,
        gender: null,
        age_from: null,
        age_to: null,
        skills: [],
        status: null,
        confirm: null,
        is_used: null
      },
      // ------period
      period_from_menu: false,
      period_to_menu: false,
      // ------school
      popularSchools: [
        'Đại học Khoa Học Tự Nhiên',
        'Đại học Công Nghệ Thông Tin',
        'Đại học Bách Khoa',
        'Đại học Sư Phạm Kỹ Thuật',
        'Đại học Sài Gòn'
      ],
      // ------skills
      popularSkills: [
        'python',
        'node js',
        'react js',
        'vue js',
        'angular',
        'sql server',
        '.NET',
        'HTML, CSS'
      ],
      // ------status
      sub: [],
      round: [],
      selected: [
      ],
      // raw cv
      dialog_CV: false,
      // base on candidate_from_cv table in database
      resultTemplate: {
        id: null,
        name_candidate: null,
        email: null,
        phone: null,
        photo: null,
        cv: null,
        facebook: null,
        birthday: null,
        gender: null,
        address: null,
        nationality: null,
        school_name: null,
        gpa: null,
        seasion: null,
        major: null,
        school_lever: null,
        is_graduated: null,
        tech: null,
        hobbies: null,
        provider: null,
        expected_salary: null,
        others: null,
        tex_raw: null,
        created_at: null,
        updated_at: null,
        status: null,
        existed: [],
        user_create: {},
        confirm: null,
        note: null,
        period_recuit: null,
        is_used: null
      },
      skillList: [],
      // rawCV----DoB
      // rawCV----Major
      pagination: null,
      nextPage: null,
      prevPage: null
    }
  },
  computed: {
    headers () {
      return [
        {
          text: '',
          value: 'avatar',
          align: 'center'
        },
        { text: this.$t('manageCv.headerTable.perInfo'),
          align: 'left',
          sortable: false,
          value: 'person',
          width: '150px'
        },
        { text: this.$t('manageCv.headerTable.contact'),
          value: 'contact',
          align: 'left',
          sortable: false,
          width: '270px'
        },
        { text: this.$t('manageCv.headerTable.edu'),
          value: 'edu',
          align: 'left',
          sortable: false,
          width: '200px'
        },
        { text: this.$t('manageCv.headerTable.file'),
          value: 'filInfo',
          align: 'left',
          sortable: false
        },
        { text: this.$t('manageCv.headerTable.note'),
          value: 'note',
          align: 'left',
          sortable: false,
          width: '200px'
        },
        { text: this.$t('manageCv.headerTable.stt'),
          value: 'status',
          align: 'center',
          sortable: false
        }
      ]
    },

    filteredCvs () {
      /**
       * need to be removed, the code below need to be uncomment
       */
      return this.cvs
    //   var filter = this.filterList

    //   if ((filter.status === 1 || filter.status === null) &&
    //   (filter.confirm === null) &&
    //   (filter.is_used === null)) { return this.cvs }

    //   return this.cvs.filter(cv => {
    //     let resultCheckStatus = cv.status === filter.status || filter.status === null
    //     let resultCheckConfirm = cv.confirm === filter.confirm || filter.confirm === null
    //     let resultCheckUsed = cv.is_used === parseInt(filter.is_used) || filter.is_used === null
    //     return (resultCheckUsed && resultCheckStatus && resultCheckConfirm)
    //   })
    }
  },
  watch: {
    pagination: function (val) {
      console.log(val)
    }

  },
  async created () {
    // console.log('cv list', this.getCvs())
    // this.cvs = this.getCvs()

    /**
     * Need to be remove, the code above need to be uncomment
     */
    this.cvs = this.draftData
  },
  // mounted: function () {
  //   // var dialogCv = this.dialog_CV
  //   var table = $('#table')[0].children[0].children[0].tbody
  //   console.log('table', table)
  //   $('#table tbody').on('dblclick', 'tr', function (dialogCv) {
  //     // var data = table.row(this).data()
  //     dialogCv = true
  //     console.log('dialog cv', dialogCv)
  //   })
  // },
  methods: {
    ...mapActions('management', ['loadCvs', 'loadCvsFrom', 'loadCvPage', 'searchCv', 'addCvToHiring']),
    ...mapGetters('management', ['getCvs', 'getNextPage', 'getPrevPage']),
    ...mapMutations('management', ['updateCv']),
    // filter form
    updateState (payload) {
      console.log('data from child component', payload)
      this.updateCv(payload)
      this.showCvDetailDialog = false
    },
    log (e) {
      console.log('checkbox', e)
    },
    // ------ period
    saveFrom (date) {
      this.$refs.from_menu.save(this.filterList.period_from)
      this.filterList.period_to = this.filterList.period_from
    },
    // ------ period_recruit
    // ------ status
    // ------ confirm
    // result founded
    showCvDetail (item) {
      this.resultTemplate = Object.assign({}, item)
      this.resultTemplate.tech = this.strToArr(this.resultTemplate.tech)
      this.skillList = this.resultTemplate.tech
      this.showCvDetailDialog = true
      console.log('show cv', this.resultTemplate)
    },

    getDateFromDateTime (dateTime) {
      if (dateTime === null || dateTime === undefined || dateTime.length < 1) {
        return
      }
      // eslint-disable-next-line no-useless-escape
      let pattern = /(\d{4})\-(\d{2})\-(\d{2})/
      let date = dateTime.match(pattern)
      if (date !== null) {
        return date[0]
      }
      return date
    },
    prepareSkill (strSkill) {
      if (typeof (strSkill) !== 'string') {
        return strSkill
      }
      let arrSkill = strSkill.split(',')

      let result = arrSkill.join(', ')
      return result
    },
    strToArr (str) {
      if (typeof (str) !== 'string') {
        return str
      }
      let arr = str.split(',')
      return arr
    },
    async findCv () {
      let payload = {
        created_min: this.filterList.period_from,
        created_max: this.filterList.period_to
      }

      await this.loadCvsFrom(payload)
      // update data
      this.cvs = this.getCvs()
      this.nextPage = this.getNextPage()
      this.prevPage = this.getPrevPage()
    },
    async loadNextPage () {
      await this.loadCvPage(this.nextPage) // work
      this.nextPage = this.getNextPage() // work
      this.prevPage = this.getPrevPage() // doesn't work
      // update table
      this.cvs = this.getCvs()
    },
    async loadPrevPage () {
      await this.loadCvPage(this.getPrevPage())
      this.nextPage = this.getNextPage()
      this.prevPage = this.getPrevPage()
      this.cvs = this.getCvs()
    },
    // called when change page number
    loadCvListFromPage () {
      // receive page, then get new list + new prev, next page
    },
    async changePage (e) {
      console.log('page', e)
    },
    removeSkill (item) {
      console.log(item)
      this.filterList.skills.splice(this.filterList.skills.indexOf(item), 1)
    },
    removeCvSkill (item) {
      console.log(item)
      this.resultTemplate.tech.splice(this.filterList.skills.indexOf(item), 1)
    },
    async search (e) {
      if (e.keyCode === 13) {
        // prepare data
        let payload = {
          search: this.searchText
        }
        await this.searchCv(payload)
        this.cvs = this.getCvs()
      }
    },
    deleteCV () {
      for (let i = 0; i < this.selected.length; i++) {
        this.filteredCvs.splice(this.filteredCvs.indexOf(this.selected[i]), 1)
      }
      this.selected.splice(0)
    },
    addToHiring () {
      console.log('selected cv', this.selected)

      // prepare data
      let ids = []
      this.selected.forEach(cv => {
        ids.push(cv.id)
      })

      // send data
      if (ids.length === 0) {
        return
      }
      this.addCvToHiring(ids)
    }
  }

}
</script>

<style lang="scss">

@import '../../scss/components/_btn.scss';
@import '@/scss/components/_form-filter.scss';
@import '@/scss/components/_form.scss';
@import '@/scss/components/_image.scss';
@import '@/scss/pages/_cv-management.scss';

.custom-radio {
  .v-input__slot {
    margin-bottom: 0 !important;
  }
}
</style>
