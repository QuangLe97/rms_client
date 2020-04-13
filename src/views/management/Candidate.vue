<template>
  <div class="management">

    <!-- Title & search -->
    <v-row class="mb-2">
      <v-col cols="3">
        <h3
          class="heading heading--small">Candidate Management</h3>
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
      <!-- Filter -->
      <v-col
        cols="3">
        <v-form
          ref="form"
          lazy-validation
          class="formfilter box pl-2"
          style="max-height: 785px; overflow-y: auto;">

          <!-- hiring session -->
          <div>
            <div
              class="label"
              style="width: 120px;">
              Hiring session
            </div>
            <div class="input input--full">
              <v-select
                :items="hiringSessionItems"
                v-model="hiringSession"
                item-text="name_hiring_session"
                return-object
                dense
                solo
                @change="setupPeriodRecruits(hiringSession)"
              />
            </div>
          </div>

          <!-- Sub hiring session -->
          <div>
            <div
              class="label"
              style="width: 120px;">
              Sub session
            </div>
            <div class="input input--full">
              <v-select
                v-model="periodRecruit"
                :items="periodRecruitItems"
                item-text="name"
                return-object
                dense
                solo
                @change="periodRecruitFiter"
              />
            </div>
          </div>

          <!-- period -->
          <div>
            <div class="label">
              CV Upload Time
            </div>
            <div>
              <div class="input input--short">
                <v-menu
                  ref="from_menu"
                  v-model="period_from_menu"
                  :return-value.sync="filterList.period_from"
                  transition="scale-transition"
                  offset-y
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="filterList.period_from"
                      label="from"
                      dense
                      solo
                      readonly
                      clearable
                      style="width: 127px"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="filterList.period_from"
                    :max="new Date().toISOString().substr(0, 10)"
                    no-title
                    scrollable
                    @change="$refs.from_menu.save(filterList.period_from)"/>
                </v-menu>
              </div>
              -
              <div class="input input--short">
                <v-menu
                  ref="to_menu"
                  v-model="period_to_menu"
                  :return-value.sync="filterList.period_to"
                  transition="scale-transition"
                  offset-y
                  width="290px"

                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="filterList.period_to"
                      label="to"
                      solo
                      dense
                      readonly
                      clearable
                      style="width: 127px"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="filterList.period_to"
                    :max="new Date().toISOString().substr(0, 10)"
                    :min="filterList.period_from"
                    no-title
                    scrollable
                    @change="$refs.to_menu.save(filterList.period_to)"/>
                </v-menu>
              </div>
            </div>
          </div>

          <div>
            <v-expansion-panels>
              <v-expansion-panel style="background-color: transparent;">
                <v-expansion-panel-header
                  class="pl-0"
                  expand-icon="mdi-menu-down"
                >
                  Advanced
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <!-- school -->
                  <div>
                    <div class="label">
                      School
                    </div>
                    <div class="input input--normal">
                      <v-combobox
                        v-model="filterList.school"
                        :items="popularSchools"
                        label="name of school"
                        dense
                        solo
                        @keyup="filterSchool"
                      />
                    </div>
                  </div>

                  <!-- GPA -->
                  <div>
                    <div class="label">
                      GPA
                    </div>
                    <div class="input input--Sshort">
                      <v-text-field
                        v-model="filterList.gpa_from"
                        label="from"
                        max="10"
                        min="5"
                        step="0.1"
                        type="number"
                        dense
                        solo
                      />
                    </div>
                    -
                    <div class="input input--Sshort">
                      <v-text-field
                        v-model="filterList.gpa_to"
                        label="to"
                        max="10"
                        min="5"
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
                      Gender
                    </div>
                    <div>
                      <v-radio-group
                        v-model="filterList.gender"
                        dense
                        row
                        class="input-box__input__radio">
                        <v-radio
                          style="height: 38px; line-height: 38px;"
                          label="Female"
                          value="1"/>
                        <v-radio
                          style="height: 38px; line-height: 38px;"
                          label="Male"
                          value="0"/>
                      </v-radio-group>
                    </div>
                  </div>
                  <!-- age -->
                  <div>
                    <div class="label">
                      Age
                    </div>
                    <div class="input input--Sshort">
                      <v-text-field
                        v-model="filterList.age_from"
                        label="from"
                        max="50"
                        min="18"
                        step="1"
                        type="number"
                        dense
                        solo
                      />
                    </div>
                    -
                    <div class="input input--Sshort">
                      <v-text-field
                        v-model="filterList.age_to"
                        label="to"
                        max="50"
                        min="18"
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
                      Skills
                    </div>
                    <div class="input input--normal">
                      <v-combobox
                        v-model="filterList.skills"
                        :items="popularSkills"
                        chips
                        clearable
                        label="skills"
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
        <!-- apply filter -->
        <div>
          <v-btn
            class="mt-5 btn btn--primary"
            @click="filterUpdated">
            Apply
          </v-btn>
        </div>
      </v-col>

      <!-- Result -->
      <v-col cols="9">
        <div class="mb-5">
          <v-btn
            class="btn btn--primary"
            @click="deleteCandi">
            Delete
          </v-btn>
        </div>

        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="draftData"
          item-key="id"
          class="elevation-1"
          style="max-height: 770px; overflow-y: auto;"
          show-select
          hide-default-footer
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
            {{ item.name_candidate }}<br>
            <span class="content-secondary">
              {{ item.birthday }}<span class="mr-1" />
              <img
                v-if="item.gender"
                src="@/icons/male.svg"
                class="icon icon--small"
                alt="male">
              <img
                v-else
                src="@/icons/female.svg"
                class="icon icon--small"
                alt="female">
            </span>
          </template>
          <!-- contact column -->
          <template v-slot:item.contact="{ item }">
            {{ item.email }}<br>
            <span class="content-secondary">
              {{ item.phone }}<br>
              {{ item.address }}
            </span>
          </template>
          <!-- education column -->
          <template v-slot:item.edu="{ item }">
            {{ item.school_name }}<br>
            <span class="content-secondary">
              {{ item.major }}<br>
              {{ item.school_level }}<br>
              {{ item.seasion }}<span class="mr-1"/>
              <!-- 0 -> undergraduate, 1 -> graduated -->
              <img
                v-if="item.is_graduated"
                src="@/icons/graduated.svg"
                class="icon icon--small"
                alt="graduated">
              <img
                v-else
                src="@/icons/graduated-disabled.svg"
                class="icon icon--small"
                alt="undergraduate">
            </span>
          </template>
          <!-- file column -->
          <template v-slot:item.filInfo="{ item }">
            <img
              src="@/icons/file-upload.svg"
              class="icon icon--small"
              alt="file-upload">{{ getDateFromDateTime(item.created_at) }}<br>
            <img
              src="@/icons/file-edit.svg"
              class="icon icon--small"
              alt="file-update">{{ getDateFromDateTime(item.updated_at) }}<br>
            <img
              src="@/icons/add-square.svg"
              class="icon icon--small"
              alt="duplicated cv">
            {{ item.existed.length }}<br>
            {{ item.provider }}
          </template>
          <!-- note column -->
          <template v-slot:item.note="{ item }">
            <div class="three-line-ellipse content-secondary">
              {{ item.note }}
            </div>
          </template>
          <!-- status -->
          <template v-slot:item.status="{ item }">
            <div>{{ item.period_recuit }}</div>
            <img
              v-if="item.confirm"
              src="@/icons/success-cloud.svg"
              class="icon icon--medium mr-1"
              alt="">
            <img
              v-else
              src="@/icons/success-cloud-disabled.svg"
              class="icon icon--medium mr-1"
              alt="confirm/unconfirm">
            <img
              v-if="item.status !== 1"
              src="@/icons/file-deny.svg"
              class="icon icon--medium mr-1"
              alt="reject">
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- Pagination -->
    <div class="text-right mt-5">
      <v-btn
        :disabled="getPrevPage === null"
        small
        @click="loadCandiPage(getPrevPage)"><v-icon>$prev</v-icon></v-btn>
      <v-btn
        :disabled="getNextPage === null"
        small
        @click="loadCandiPage(getNextPage)"><v-icon>$next</v-icon></v-btn>
    </div>

    <!-- raw -->
    <dialogComponent
      :candidate="resultTemple"
      :dialog="dialog_candidate"
      @close="dialog_candidate = false" />
    <br>
  </div>
</template>
<script>
import dialogComponent from './CandidateComponent/CandidateDetail'
// import dialogComponent from './CandidateComponent/Candidate_base'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    dialogComponent
  },
  data () {
    return {
      // replace getCandidates = drafData
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
          period_recuit: '202001',
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
          period_recuit: '202001',
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
          period_recuit: '202001',
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
          period_recuit: '202001',
          status: 4 // 1 -> normal, 2 -> rejected, 3 -> denied, 4 -> delay
        }
      ],
      // filter
      dialog_candidate: false,
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
        period_recruit: null
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
      // ------recruitment stage
      subSessions: [],
      // result founded
      searchText: null,
      headers: [
        {
          text: '',
          align: 'center',
          value: 'avatar'
        },
        { text: 'PERSONAL',
          align: 'left',
          sortable: false,
          value: 'person',
          width: '150px'
        },
        { text: 'CONTACT',
          value: 'contact',
          align: 'left',
          sortable: false,
          width: '270px'
        },
        { text: 'EDUCATION',
          value: 'edu',
          align: 'left',
          sortable: false,
          width: '200px'
        },
        { text: 'FILE',
          value: 'filInfo',
          align: 'left',
          sortable: false,
          width: '120px'
        },
        { text: 'NOTE',
          value: 'note',
          align: 'left',
          sortable: false,
          width: '200px'
        },
        { text: 'STATUS',
          value: 'status',
          align: 'center',
          sortable: false,
          width: '100px'
        }
      ],
      candidates: [],
      selected: [
      ],
      // detail candidate
      resultTemple: null,
      hiringSession: null,
      periodRecruit: null
    }
  },
  computed: {
    ...mapGetters('can_management', ['getCandidates', 'getSessions', 'getNextPage', 'getPrevPage']),
    hiringSessionItems () {
      return this.getSessions
    },
    periodRecruitItems () {
      console.log('period recruit item', this.getSessions)
      if (this.getSessions.length === 0) return
      let array = []
      let all = {
        name: 'all',
        id: null
      }
      for (let i = 0; i < this.getSessions[0].period_recruits.length; i++) {
        let item = {
          name: this.getSessions[0].period_recruits[i].name_period_recruit,
          id: this.getSessions[0].period_recruits[i].id
        }
        array.push(item)
        all.id = '' + item.id + ','
      }
      all.id = all.id.substring(0, all.id.length - 1)
      array.push(all)
      return array
    }
  },
  async created () {
    await this.loadSessionName()
    let payload = {
      period_recruit: this.getSessions[0].period_recruits[0].id + ''
    }
    await this.filter(payload)
    console.log('created', this.getSessions)
    this.hiringSession = this.getSessions[0]
    this.periodRecruit = this.periodRecruitItems[0]
  },
  methods: {
    ...mapActions('can_management', ['loadCandidates', 'loadSessionName', 'filter', 'loadCandiPage', 'delete']),
    // filter form
    setupPeriodRecruits (item) {
      console.log('setup period recruit')
      this.periodRecruitItems = []
      let all = {
        name: 'all',
        id: null
      }
      for (let i = 0; i < item.period_recruits.length; i++) {
        let items = {
          name: item.period_recruits[i].name_period_recruit,
          id: item.period_recruits[i].id
        }
        this.periodRecruitItems.push(items)
        all.id = '' + items.id + ','
      }
      all.id = all.id.substring(0, all.id.length - 1)
      this.periodRecruitItems.push(all)
    },
    async periodRecruitFiter (item) {
      console.log('item', item)
      let payload
      let params
      params = '' + item.id
      payload = {period_recruit: params}
      await this.filter(payload)
    },
    async filterUpdated () {
      let payload
      payload = {
        updated_min: this.filterList.period_from,
        updated_max: this.filterList.period_to
      }
      if ((this.filterList.period_from === null) && (this.filterList.period_to !== null)) {
        payload = {
          updated_max: this.filterList.period_to
        }
      }
      if (this.filterList.period_from !== null && this.filterList.period_to === null) {
        payload = {
          updated_min: this.filterList.period_from
        }
      }
      console.log('payload filter', payload)
      await this.filter(payload)
    },
    // result founded
    showCvDetail (item) {
      this.resultTemple = Object.assign({}, item)
      // let resultTemple = Object.assign({}, item)
      console.log('candidate detail in cadidate', this.resultTemple)
      this.dialog_candidate = true
    },
    removeSkill (item) {
      console.log(item)
      this.filterList.skills.splice(this.filterList.skills.indexOf(item), 1)
    },
    async search (e) {
      if (e.keyCode === 13) {
        let payload = {
          search: this.searchText
        }
        await this.filter(payload)
      }
    },
    async filterSchool (e) {
      if (e.keyCode === 13) {
        let payload = {
          school_name: this.filterList.school
        }
        await this.filter(payload)
      }
    },
    async deleteCandi () {
      let payload
      for (let i = 0; i < this.selected.length; i++) {
        payload = '' + this.selected[i].id + ','
      }
      payload = payload.substring(0, payload.length - 1)
      await this.delete(payload)
      this.selected.splice(0)
    },
    addToHiring () {
      console.log(this.selected)
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
      return dateTime
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/components/_btn.scss';
@import '@/scss/components/_form-filter.scss';
@import '@/scss/components/_image.scss';
@import '@/scss/pages/_management.scss';
.custom-radio {
  .v-input__slot {
    margin-bottom: 0 !important;
  }
}
.topTitle{
  padding: 30px 30px 15px 30px;
  height: 130px !important;
}
.avatar {
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: start;
  padding: 0.5em;
}

</style>
