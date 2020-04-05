<template>
  <div>
    <div class="two-col-container">
      <div class="small-col">
        <h3
          class="heading heading--small"
          style="margin: 0.5rem 0 2.8rem 0; height: 48px;line-height:48px">{{ $t('manageCv.header') }}</h3>
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
        <v-form
          ref="form"
          lazy-validation
          class="formfilter box pl-2"
          style="max-height: 700px; overflow-y: auto; overflow-x: hidden;">
          <!-- period -->
          <div>
            <div class="label">
              {{ $t('manageCv.period') }}
            </div>
            <div>
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
                  large
                  @click="findCv"
                >
                  {{ $t('manageCv.btnFind') }}
                </v-btn>
              </div>
            </div>
          </div>

          <!-- status -->
          <div>
            <v-divider/>
            <div class="input input--long">
              <v-checkbox
                v-model="filterList.is_used"
                :label= "$t('manageCv.filter.used')"
                value="1"
                class="mx-2" />
              <v-checkbox
                v-model="filterList.is_used"
                :label= "$t('manageCv.filter.new')"
                value="0"
                class="mx-2"/>
            </div>
          </div>

          <div>
            <v-divider/>
            <div class="input input--long">

              <v-checkbox
                v-model="filterList.status"
                :value="2"
                :label= "$t('manageCv.filter.reject')"
                class="mx-2"/>
              <v-checkbox
                v-model="filterList.status"
                :value="4"
                :label= "$t('manageCv.filter.delayInter')"
                class="mx-2"/>
              <v-checkbox
                v-model="filterList.status"
                :value="3"
                :label= "$t('manageCv.filter.deniedInter')"
                class="mx-2"/>
            </div>
          </div>

          <div>
            <v-divider/>
            <div class="input input--long">
              <v-checkbox
                v-model="filterList.confirm"
                :value="1"
                :label= "$t('manageCv.filter.confirm')"
                class="mx-2"/>
            </div>

          </div>
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

      </div>

      <!-- table result -->
      <div class="col">

        <v-data-table
          id="table"
          ref="dataTable"
          v-model="selected"
          :headers="headers"
          :items="filteredCvs"
          hide-default-footer
          disable-pagination
          class="elevation-1"
          style="max-height: 685px; overflow-y: auto;"
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
            {{ item.note }}
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

        <v-btn
          class="btn btn--primary"
          @click="addToHiring"
        >
          {{ $t('manageCv.btnAdd') }}
        </v-btn>
        <v-btn
          class="ml-4 btn btn--secondary"
          @click="deleteCV"
        >
          {{ $t('manageCv.btnDelete') }}
        </v-btn>
      </div>
    </div>

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
          value: 'person'
        },
        { text: this.$t('manageCv.headerTable.contact'),
          value: 'contact',
          align: 'left',
          sortable: false,
          width: '300px'
        },
        { text: this.$t('manageCv.headerTable.edu'),
          value: 'edu',
          align: 'left',
          sortable: false
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
          width: '100px'
        },
        { text: this.$t('manageCv.headerTable.stt'),
          value: 'status',
          align: 'center',
          sortable: false
        }
      ]
    },

    filteredCvs () {
      var filter = this.filterList

      if ((filter.status === 1 || filter.status === null) &&
      (filter.confirm === null) &&
      (filter.is_used === null)) { return this.cvs }

      return this.cvs.filter(cv => {
        let resultCheckStatus = cv.status === filter.status || filter.status === null
        let resultCheckConfirm = cv.confirm === filter.confirm || filter.confirm === null
        let resultCheckUsed = cv.is_used === parseInt(filter.is_used) || filter.is_used === null
        return (resultCheckUsed && resultCheckStatus && resultCheckConfirm)
      })
    }
  },
  watch: {
    pagination: function (val) {
      console.log(val)
    }

  },
  async created () {
    console.log('cv list', this.getCvs())
    this.cvs = this.getCvs()
    // get page info
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
      if (dateTime === null || dateTime === undefined) {
        return
      }
      // eslint-disable-next-line no-useless-escape
      let pattern = /(\d{4})\-(\d{2})\-(\d{2})/
      let date = dateTime.match(pattern)[0]
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
@import '@/scss/components/_2-columns.scss';
@import '@/scss/components/_avatar.scss';

.custom-radio {
  .v-input__slot {
    margin-bottom: 0 !important;
  }
}
.avatar {
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: start;
  padding: 0.5em;
}
</style>
