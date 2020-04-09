<template>
  <v-row>
    <!-- CV list -->
    <v-col
      cols="2"
      class="column"
    >
      <!-- List header -->
      <h3 class="sub-heading">{{ $t('process.details.listCv') }}</h3>
      <v-list
        class="left-list">
        <!-- List process bar -->
        <v-progress-linear
          v-show="isLoadingGetCvList"
          color="primary"
          indeterminate
        />
        <!-- List -->
        <v-list-item-group v-model="defaultSelectedCv">
          <v-list-item
            v-for="(cv, cvIndex) in getListCv"
            v-show="!isLoadingGetCvList"
            :key="cv.id"
            class="l-item"
          >
            <!-- Single item -->
            <v-list-item-content
              v-if="isSingle(cv)"
              class="l-item__content"
              @click="loadCV(cv, cvIndex)">
              <v-list-item-title v-text="getCvName(cv.cv)"/>
              <v-list-item-subtitle v-if="cv.confirm"><small>{{ $t('process.details.cvSaved') }}</small></v-list-item-subtitle>
              <v-list-item-subtitle v-if="cv.status === 2"><small>{{ $t('process.details.cvRejected') }}</small></v-list-item-subtitle>

            </v-list-item-content>

            <!-- Multiple items -->
            <v-list-group v-else>

              <template v-slot:activator>
                <v-list-item-content
                  class="l-item__content"
                  @click="prepareDuplicatedCv(cv)">
                  <v-list-item-title v-text="getCvName(cv.cv)"/>
                  <v-list-item-subtitle><small>{{ $t('process.details.dupCv') }}</small></v-list-item-subtitle>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="(duplicatedCv, duplicatedCvIndex) in cv.existed"
                :key="duplicatedCv.id"
                @click="loadCV(duplicatedCv, duplicatedCvIndex, cv)"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="getCvName(duplicatedCv.cv)"/>
                  <v-list-item-subtitle v-if="duplicatedCv.confirm"><small>{{ $t('process.details.cvSaved') }}</small></v-list-item-subtitle>
                  <v-list-item-subtitle v-if="duplicatedCv.status === 2"><small>{{ $t('process.details.cvRejected') }}</small></v-list-item-subtitle>
                  <v-list-item-subtitle><small>{{ getDateFromDateTime() }}</small></v-list-item-subtitle>
                </v-list-item-content>

              </v-list-item>
            </v-list-group>

          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>

    <!-- CV detail -->
    <v-col
      v-show="!initDetail"
      cols="4"
      class="column">
      <div class="middle-detail">
        <h3 class="sub-heading mb-2">{{ $t('process.details.detail') }}</h3>
        <v-form
          ref="form"
          lazy-validation
          class="box box--white box--shadow form pa-0"
        >
          <div class="box">
            <h3 class="form__title">{{ $t('process.details.perInfo') }}</h3>

            <!-- avatar -->
            <div>
              <div class="label">{{ $t('process.details.avatar') }}</div>
              <div class="avatar">

                <v-icon
                  v-if="selectedCV.photo === null"
                >mdi-48px mdi-account-circle</v-icon>
                <v-img
                  v-else
                  :src="`${selectedCV.photo}`"
                  width="50px"
                  height="50px"/>
              </div>
            </div>
            <!-- Full name -->
            <div>
              <div class="label">
                {{ $t('process.details.name') }}
              </div>
              <div class="input input--long">
                <v-text-field
                  v-model="selectedCV.name_candidate"
                  :disabled="!isAdjusting"
                  required
                  dense
                  solo
                  value="Nguyen Van A"
                />
              </div>
            </div>

            <!-- DoB -->
            <div>
              <div class="label">
                {{ $t('process.details.birth') }}
              </div>
              <div class="input input--short">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="selectedCV.birthday"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"

                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="selectedCV.birthday"
                      :disabled="!isAdjusting"
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
                    v-model="date"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  />
                </v-menu>
              </div>
            </div>

            <!-- Gender -->
            <div>
              <div class="label">
                {{ $t('process.details.gender') }}
              </div>
              <div class="input input--no-border">
                <v-radio-group
                  v-model="selectedCV.gender"
                  dense
                  class="input-box__input__radio">
                  <v-radio
                    :label="$t('process.details.male')"
                    value="1"
                  />
                  <v-radio
                    :label="$t('process.details.female')"
                    value="0"/>
                </v-radio-group>
              </div>
            </div>

            <!-- Phone -->
            <div>
              <div class="label">
                {{ $t('process.details.phone') }}
              </div>
              <div class="input input--short">
                <v-text-field
                  :disabled="!isAdjusting"
                  v-model="selectedCV.phone"
                  counter="12"
                  dense
                  solo
                  required
                />
              </div>
            </div>

            <!-- Email -->
            <div>
              <div class="label">
                {{ $t('process.details.email') }}
              </div>
              <div class="input input--long">
                <v-text-field
                  :disabled="!isAdjusting"
                  v-model="selectedCV.email"
                  dense
                  solo
                  required
                />
              </div>
            </div>

            <!-- Address -->
            <div>
              <div class="label">
                {{ $t('process.details.address') }}
              </div>
              <div class="input input--long">
                <v-textarea
                  v-model="selectedCV.address"
                  :disabled="!isAdjusting"
                  auto-grow
                  rows="1"
                  row-height="2em"
                  dense
                  solo
                  required
                />
              </div>
            </div>

            <div class="form__separator">
              <v-divider/>
            </div>
            <h3 class="form__title">{{ $t('process.details.education') }}</h3>
            <!-- School -->
            <div>
              <div class="label">
                {{ $t('process.details.school') }}
              </div>
              <div class="input input--long">
                <v-text-field
                  :disabled="!isAdjusting"
                  v-model="selectedCV.school_name"
                  dense
                  solo
                  required
                />
              </div>
            </div>
            <!-- School type -->
            <div>
              <div class="label">
                {{ $t('process.details.typeSchool') }}
              </div>
              <div class="input input--short">
                <v-combobox
                  v-model="selectedCV.school_type"
                  :items="schoolTypeSamples"
                  :hint="$t('process.details.schoolNote')"
                  persistent-hint
                  dense
                  solo
                />
              </div>
            </div>

            <!-- School year -->
            <div>
              <div class="label">
                {{ $t('process.details.schYear') }}
              </div>
              <div class="input input--normal">
                <v-text-field
                  :disabled="!isAdjusting"
                  v-model="selectedCV.seasion"
                  label="YYYY-YYYY"
                  required
                  dense
                  solo
                />
              </div>
            </div>

            <!-- Major -->
            <div>
              <div class="label">
                {{ $t('process.details.major') }}
              </div>
              <div class="input input--long">
                <v-combobox
                  v-model="selectedCV.major"
                  :items="sampleMajor"
                  dense
                  solo
                />
              </div>
            </div>

            <!-- Level -->
            <div>
              <div class="label">
                {{ $t('process.details.lv') }}
              </div>
              <div class="input input--short">
                <v-combobox
                  v-model="selectedCV.school_lever"
                  :items="schoolLevelSamples"
                  dense
                  solo
                />
              </div>
            </div>

            <!-- GPA -->
            <div>
              <div class="label">
                GPA
              </div>
              <div class="input input--short">
                <v-text-field
                  :disabled="!isAdjusting"
                  v-model="selectedCV.gpa"
                  hint="actual/max"
                  persistent-hint
                  required
                  dense
                  solo
                />
              </div>
            </div>

            <!-- Status -->
            <div>
              <div
                class="label"
                style="margin-top: 16px">
                {{ $t('process.details.status') }}
              </div>
              <div class="input input--no-border">
                <v-checkbox
                  :disabled="!isAdjusting"
                  v-model="selectedCV.is_graduated"
                  :label="$t('process.details.graduate')"
                  color="secondary"
                  hide-details
                  dense
                />
              </div>
            </div>
            <br>

            <div class="form__separator">
              <v-divider/>
            </div>
            <h3 class="form__title">{{ $t('process.details.ability') }}</h3>

            <!-- Skills new -->
            <div>
              <div class="label">
                {{ $t('process.details.skill') }}
              </div>
              <div class="input input--normal">
                <v-row>
                  <v-col
                    v-for="(item, i) in selectedCV.tech"
                    :key="i"
                    class="shrink">
                    <v-chip
                      close
                      @click:close="selectedCV.tech.splice(i, 1)"
                    >
                      {{ item }}
                    </v-chip>
                  </v-col>
                  <v-col
                    cols="12">
                    <v-text-field
                      v-model="skillItem"
                      :hint="$t('process.details.skillNote')"
                      dense
                      solo
                      full-width
                      persistent-hint
                      @keyup="addSkill"
                    />
                  </v-col>
                </v-row>
              </div>
            </div>

            <div class="form__separator">
              <v-divider/>
            </div>
            <h3 class="form__title">{{ $t('process.details.otherInfo') }}</h3>
            <!-- Note -->
            <div>
              <div class="label">
                {{ $t('process.details.note') }}
              </div>
              <div class="input input--long">
                <v-textarea
                  v-model="selectedCV.note"
                  :disabled="!isAdjusting"
                  :hint="$t('process.details.noteNote')"
                  auto-grow
                  rows="1"
                  row-height="2em"
                  dense
                  solo
                  persistent-hint
                />
              </div>
            </div>

            <!-- Source cv -->
            <div>
              <div class="label">
                {{ $t('process.details.source') }}
              </div>
              <div class="input input--normal">
                <v-combobox
                  v-model="selectedCV.provider"
                  :items="sampleProvider"
                  dense
                  solo
                />
              </div>
            </div>

          </div>
          <!-- Form footer button -->
          <div
            class="form__footer d-flex align-center">

            <!-- Button save -->
            <v-btn
              class="btn btn--primary mr-5"
              @click="saveCandidate"
            >
              {{ $t('process.details.btnSave') }}
            </v-btn>

            <!-- Button reject -->
            <v-btn
              class="mr-5 btn btn--secondary"
              @click="rejectCandidate"
            >{{ $t('process.details.btnReject') }}</v-btn>
            <v-dialog
              v-model="reasonRejectDialog"
              persistent
              max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="headline">Reject reason</span>
                </v-card-title>
                <v-card-text>
                  Why do you want to reject this cv? Let us know in the note field
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    class="btn btn--tertiary"
                    @click="reasonRejectDialog = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- Button remove -->
            <v-btn
              class="btn btn--tertiary"
              @click="removeCandidate"
            >
              {{ $t('process.details.btnRemove') }}
            </v-btn>
          </div>

        </v-form>
      </div>
    </v-col>

    <div
      v-show="initDetail">
      <v-card
        class="mx-auto"
        max-width="344"
        outlined
        style="padding: 0; border: none; background: transparent; margin-top: 80px"
      >
        <v-list-item three-line>
          <v-icon size="40">mdi-arrow-left</v-icon>
          <v-list-item-content>
            <v-list-item-title class="headline">{{ $t('process.details.select') }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </v-card>
    </div>

    <!-- CV raw -->
    <v-col
      v-show="!initDetail"
      cols="6"
      class="right-raw">
      <div
        style="height: 100%">
        <v-tabs
          v-model="tab_model"
          background-color="transparent"
          grow
        >
          <v-tab
            v-for="tab in tabs"
            :key="tab.name"
            class="tab"
          >
            {{ tab.name }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab_model">
          <v-tab-item
            v-for="tab in tabs"
            :key="tab.name"
          >
            <v-card
              flat
              color="basil"
            >
              <v-card-text ><embed
                v-if="tab.name === 'Pdf'"
                :src="selectedCV.cv"
                :key="selectedCV.id"
                height="100%"
                width="100%">
                <div
                  v-else
                  height="100%">
                  <!-- information -->
                  <ul
                    v-for="(value, name, index) in selectedCV.text_raw_dict"
                    :key="index">
                    <h4>{{ name }}</h4>
                    <ul
                      v-for="(val, index) in value"
                      :key="index">
                      <li>{{ val }}</li>
                    </ul>
                  </ul>
                </div>
              </v-card-text>

            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>

    </v-col>
  </v-row>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import router from '../../router'
export default {
  data () {
    return {
      // The data types below depend on the server and database. I just create it for visuability
      cvList: [],
      skillItem: '',
      defaultSelectedCv: 0,
      initDetail: true,
      selectedCV: {
        id: null,
        index: null,
        parent: null,
        cv: null,
        name_candidate: null,
        email: null,
        phone: null,
        photo: null,
        facebook: null,
        birthday: null,
        gender: null,
        address: null,
        nationality: null,
        school_name: null,
        school_lever: null,
        school_type: null,
        gpa: null,
        major: null,
        is_graduated: null,
        tech: null,
        seasion: null,
        provider: null,
        tex_raw: null,
        created_at: null,
        updated_at: null,
        status: null,
        existed: null,
        user_create: {}
      },
      // sample skills
      sampleSkills: ['java', 'python', 'c++'],
      // sample school types
      schoolTypeSamples: [1, 2, 3],
      // sample cv provider
      sampleProvider: [
        'ITviec', 'VietnamWorks', 'Vietsingworks'
      ],
      // adjust, save status
      isAdjusting: true,

      // some data for showing dialog, ignore it
      date: null,
      menu: false,
      initDetailCv: 0,
      tab_model: null,
      // tab content. The pdf and text from the server should be shown here
      tabs: [
        {
          name: 'Pdf',
          content: null
        },
        {
          name: 'Text',
          content: null
        }
      ],
      itemsSkill: ['NodeJS', 'Web Design', 'VueJS'],

      sampleMajor: ['Computer sciences', 'Knowledge engineering', 'Information system engineering', 'Software engineering', 'Computer networks and telecommunication', 'Computer vision and robotics'],

      schoolLevelSamples: ['College', 'Bachelor', 'Master'],
      isLoadingGetCvList: false,
      reasonRejectDialog: false,
      reasonRejectText: null
    }
  },
  // eslint-disable-next-line no-dupe-keys
  async created () {
    console.log('creatttttttttttttt')
    this.isLoadingGetCvList = true

    await this.getCvByUserId()

    console.log('getlistcv: ', this.getListCv)
    if (this.getListCv.length > 0) {
      this.loadCV(this.getListCv[0])
    }
    this.isLoadingGetCvList = false
    this.initDetail = false
    this.initDetailCv = false
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    // eslint-disable-next-line no-undef
    ...mapState('candidate', ['listCvByUserId', 'cvInfo', 'processCv']),
    // eslint-disable-next-line vue/return-in-computed-property
    getListCv () {
      // eslint-disable-next-line no-unused-vars
      let data = this.$store.state.candidate.listCvByUserId
      return data.results
    },
    getCvInfoById () {
      let data = this.$store.state.candidate.cvInfo
      return data
    },
    skillList () {
      return this.selectedCV.tech
    }
  },
  // eslint-disable-next-line no-dupe-keys,vue/order-in-components
  watch: {
    getCvInfoById () {
      console.log(this.getCvInfoById.results[0])
      this.selectedCV.id = this.getCvInfoById.results[0].id
      this.selectedCV.name_candidate = this.getCvInfoById.results[0].name_candidate
      this.selectedCV.email = this.getCvInfoById.results[0].email
      this.selectedCV.gender = this.getCvInfoById.results[0].gender === null ? null : this.getCvInfoById.results[0].gender.toString()
      this.selectedCV.birthday = this.getCvInfoById.results[0].birthday
      this.selectedCV.phone = this.getCvInfoById.results[0].phone
      this.selectedCV.address = this.getCvInfoById.results[0].address
      this.selectedCV.school_name = this.getCvInfoById.results[0].school_name
      this.selectedCV.photo = this.getCvInfoById.results[0].photo
      this.selectedCV.cv = this.getCvInfoById.results[0].cv
      this.selectedCV.tex_raw = this.getCvInfoById.results[0].tex_raw
      this.selectedCV.tech = this.getCvInfoById.results[0].tech.split(',')
      this.selectedCV.is_graduated = this.getCvInfoById.results[0].is_graduated
      this.selectedCV.gpa = this.getCvInfoById.results[0].gpa
      this.selectedCV.seasion = this.getCvInfoById.results[0].seasion
      this.selectedCV.note = this.getCvInfoById.results[0].note
      let _tabs = [
        {
          name: 'Pdf',
          content: this.selectedCV.cv
        },
        {
          name: 'Text',
          content: this.selectedCV.tex_raw
        }
      ]
      this.tabs = _tabs
    },
    skillList () {
      this.skillItem = ''
    }
  },
  methods: {
    ...mapMutations('candidate', ['setListCvByUserId', 'setCvInformationById', 'deleteListCvByUserId']),
    ...mapActions('candidate', ['getListCvByUserId', 'getCvInformationById', 'deleteCandidateFromCv', 'update', 'reject']),

    async getCvByUserId () {
      console.log('processcv', this.processCv)
      let payload = {user_id: this.processCv.user_id, date: this.processCv.date, page_size: this.processCv.page_size}
      if (payload.user_id === undefined) {
        // try to get from localStorage
        let payloadLocalStorage = {
          user_id: localStorage.getItem('processCv-user-id'),
          date: localStorage.getItem('processCv-date'),
          page_size: localStorage.getItem('processCv-page-size')
        }
        Object.assign(payload, payloadLocalStorage)
      }
      await this.getListCvByUserId(payload)
    },
    getCvName (cv) {
      let arrStr = cv.split('/')
      if (arrStr.length > 0) { // cv can split
        return arrStr[arrStr.length - 1]
      }
      return cv
    },
    getCvSkills (str) {
      let arrStr = str.split(',')
      if (arrStr.length > 0) { // skill can split
        return arrStr
      }
      return str
    },
    addSkill (e) {
      console.log('before add skill')
      if (e.keyCode === 13) {
        this.skillList.push(this.skillItem)
        console.log('skill added!')
      }
    },
    loadCV (cv, index, parent) {
      console.log('parent: ', parent)
      this.selectedCV = cv
      this.selectedCV.index = index
      this.selectedCV.parent = parent
      console.log('text_raw_dict', this.selectedCV.text_raw_dict)

      // prepare skill
      if (typeof (this.selectedCV.tech) === 'string') {
        let strSkill = this.selectedCV.tech
        console.log('strSkill', strSkill)
        let arrSkill = strSkill.split(',')
        this.selectedCV.tech = arrSkill.splice(0)
      }

      // prepare school level
      console.log('school level: ', this.selectedCV.school_lever)
      let numLevel = this.selectedCV.school_lever
      let strLevel = numLevel

      if (numLevel !== null) {
        switch (numLevel) {
          case 1: strLevel = 'College'; break
          case 2: strLevel = 'Bachelor'; break
          case 3: strLevel = 'Master'; break
        }
      }
      this.selectedCV.school_lever = strLevel

      // prepare gender
      console.log('gender: ', this.selectedCV.gender)
      this.selectedCV.gender = (this.selectedCV.gender === null) ? null : this.selectedCV.gender.toString()

      this.initDetail = false
      console.log('loadcv', this.selectedCV)
    },
    getDateFromDateTime () {
      let strDate = this.selectedCV.updated_at
      if (strDate === null || strDate === undefined) {
        return
      }
      // eslint-disable-next-line no-useless-escape
      let pattern = /(\d{4})\-(\d{2})\-(\d{2})/
      let date = strDate.match(pattern)[0]
      return date
    },

    removeSkill (item) {
      console.log(item)
      console.log(this.selectedCV.tech.indexOf(item, 1))
      this.selectedCV.tech.splice(this.selectedCV.tech.indexOf(item), 1)
    },

    removeCertification (item) {
      this.selectedCV.educationalInfo.certifications.splice(this.selectedCV.educationalInfo.certifications.indexOf(item), 1)
      this.selectedCV.educationalInfo.certifications = [...this.selectedCV.educationalInfo.certifications]
    },

    // save date from date picker, ignore
    save (date) {
      this.$refs.menu.save(date)
    },

    async saveCandidate () {
      // prepare data
      console.log('before save', this.selectedCV)
      let payload = {id: this.selectedCV.id}
      let body = {}
      body['name_candidate'] = this.selectedCV.name_candidate
      body['email'] = this.selectedCV.email
      body['phone'] = this.selectedCV.phone
      body['birthday'] = this.selectedCV.birthday
      body['gender'] = this.selectedCV.gender === null ? null : parseInt(this.selectedCV.gender)
      body['address'] = this.selectedCV.address
      body['school_name'] = this.selectedCV.school_name
      body['gpa'] = this.selectedCV.gpa
      body['seasion'] = this.selectedCV.seasion
      body['tech'] = (this.selectedCV.tech === null) ? null : this.selectedCV.tech.toString()
      body['note'] = this.selectedCV.note
      body['major'] = this.selectedCV.major
      // school_level
      let strLevel = this.selectedCV.school_lever
      let numLevel = null
      if (strLevel !== null) {
        switch (strLevel) {
          case 'College': numLevel = 1; break
          case 'Bachelor': numLevel = 2; break
          case 'Master': numLevel = 3; break
        }
      }
      body['school_lever'] = numLevel
      // this.selectedCV.school_lever = numLevel
      body['is_graduated'] = this.selectedCV.is_graduated === true ? 1 : 0
      // school type
      body['school_type'] = this.selectedCV.school_type
      // provider (source cv)
      body['provider'] = this.selectedCV.provider
      payload['body'] = body

      console.log('edited cv: ', payload)

      // send data
      let result = await this.update(payload)
      // check save success
      if (result === 0) {
        // update cv list
        // get updatedCv, then update
        let updatedCV
        if (this.selectedCV.parent === undefined) { // it's a parent
          updatedCV = this.getListCv[this.selectedCV.index]
        } else { // it's a child
          updatedCV = this.selectedCV.parent.existed[this.selectedCV.index]
        }
        updatedCV['confirm'] = 1
      }
    },

    async removeCandidate () {
      let result = await this.deleteCandidateFromCv({id: this.selectedCV.id})

      if (result === 0) { // delete success
        console.log('delete successfully')

        // update cv list
        if (this.selectedCV.parent === undefined) { // it's a parent
          this.getListCv.splice(this.selectedCV.index, 1)
        } else { // it's a child
          this.selectedCV.parent.existed.splice(this.selectedCV.index, 1)
        }
      }
      this.initDetail = true
      if (this.getListCv.length === 0) {
        router.push({path: '/process-cv'})
      }
    },
    isSingle (cv) {
      return cv.existed.length === 0
    },
    log (item) {
      console.log('log: ', item)
    },
    prepareDuplicatedCv (cv) {
      // if the first item in the array is object
      console.log('current cv: ', cv)
      if (typeof (cv.existed[0]) === 'object') {
        if (cv.existed[0].id !== cv.id) {
          cv.existed.unshift(cv)
        }
      }
    },
    async rejectCandidate () {
      console.log(this.selectedCV.id)
      console.log('reject note', this.selectedCV.note)

      if (this.selectedCV.note === undefined || this.selectedCV.note === null || this.selectedCV.note.trim().length === 0) { // not be typed
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
        this.reasonRejectDialog = true // show dialog
        return 0
      }

      let result = await this.reject({id: this.selectedCV.id, note: this.selectedCV.note})

      // check reject successfully
      if (result === 0) {
        // update cv list
        // get updatedCv, then update
        let updatedCV
        if (this.selectedCV.parent === undefined) { // it's a parent
          updatedCV = this.getListCv[this.selectedCV.index]
        } else { // it's a child
          updatedCV = this.selectedCV.parent.existed[this.selectedCV.index]
        }
        updatedCV['confirm'] = 1
        updatedCV.status = 2
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/components/_image.scss';
@import '../../scss/components/_form.scss';
@import '../../scss/components/_3-columns.scss';
</style>
