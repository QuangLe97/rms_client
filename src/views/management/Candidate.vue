<template>
  <div>
    <div class="two-col-container">
      <div class="small-col">
        <h3
          class="heading heading--small"
          style="margin: 0.5rem 0 2.8rem 0; height: 48px;line-height:48px">Candidate Management</h3>
      </div>
      <div class="col">
        <v-text-field
          v-model="searchText"
          solo
          label="Search..."
          prepend-inner-icon="mdi-magnify"
          @keyup="search"
        />
      </div>
    </div>
    <div class="two-col-container">
      <div class="small-col">
        <!-- filter -->

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
              <div>
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
              <div>
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
        <div class="btnfilter">
          <v-btn
            class="mt-5 btn btn--primary"
            @click="filterUpdated">
            Apply
          </v-btn>
        </div>
      </div>
      <!-- result -->
      <div class="col">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="getCandidates"
          :items-per-page="5"
          item-key="id"
          class="elevation-1"
          style="max-height: 770px; overflow-y: auto;"
          show-select
          @click:row="showCvDetail"
        >
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
              {{ item.birthday }}<br>
              {{ item.gender == 1 ? 'male':null }}
              {{ item.gender == 0 ? 'female':null }}
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
              {{ item.seasion }}<br>
              {{ item.is_graduated }}
            </span>
          </template>
          <!-- ability column -->
          <template v-slot:item.ability="{ item }">
            {{ item.tech }}
          </template>
          <!-- file column -->
          <template v-slot:item.filInfo="{ item }">
            <span class="content-secondary">upload:</span>{{ item.created_at }}<br>
            <span class="content-secondary">update:</span>{{ item.updated_at }}<br>
            <span class="content-secondary">{{ item.existed.length == 0 ? 'saved':'duplicated' }}<br>
              {{ item.provider }}
            </span>
          </template>
          <!-- note column -->
          <template v-slot:item.note="{ item }">
            {{ item.note }}
          </template>
          <!-- status -->
          <template v-slot:item.status="{ item }">
            {{ item.period_recuit }}<br>
            {{ item.confirm === 0 ? 'none':'confirm' }}<br>
            {{ item.status === 1 ? 'normal': 'reject' }}
          </template>
        </v-data-table>
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
        <div>
          <v-btn
            class="mt-5 btn btn--primary"
            @click="deleteCandi">
            Delete
          </v-btn>
        </div>
      </div>
      <!-- raw -->
      <dialogComponent
        :candidate="resultTemple"
        :dialog="dialog_candidate"
        @close="dialog_candidate = false" />
      <br>
    </div>
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
          value: 'person'
        },
        { text: 'CONTACT',
          value: 'contact',
          align: 'left',
          sortable: false
        },
        { text: 'EDUCATION',
          value: 'edu',
          align: 'left',
          sortable: false
        },
        { text: 'FILE',
          value: 'filInfo',
          align: 'left',
          sortable: false
        },
        { text: 'NOTE',
          value: 'note',
          align: 'left',
          sortable: false
        },
        { text: 'Status',
          value: 'status',
          align: 'center',
          sortable: false
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
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/components/_btn.scss';
@import '@/scss/components/_form-filter.scss';
@import '@/scss/components/_2-columns.scss';
@import '@/scss/components/_image.scss';
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
