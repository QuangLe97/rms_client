<template>
  <v-dialog
    v-model="show"
    width="50vw"
    persistent
    style="height: 80vh">
    <v-tabs
      v-model="tab"
      grow
    >
      <v-tab
        v-for="tabView in tabViews"
        :key="tabView.name"
      >
        {{ tabView.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="tabView in tabViews"
        :key="tabView.name"
      >
        <v-card flat>
          <v-card-text style="padding: 16px 16px 0 0;">
            <div v-if="tabView.name === 'Text'">
              <v-form
                ref="form"
                lazy-validation
                class="form box--white pl-12">
                <h3 class="form__title">{{ $t('manageCv.detailDialog.perInfo') }}</h3>
                <!-- avatar -->
                <div>
                  <div class="label">{{ $t('manageCv.detailDialog.ava') }}</div>
                  <div class="avatar">
                    <v-icon
                      v-if="cv.photo === null"
                      style="font-size: 70px">
                      mdi-account-circle
                    </v-icon>
                    <v-img
                      v-else
                      :src="`${cv.photo}`"
                    />
                  </div>
                </div>
                <!-- Full name -->
                <div>
                  <div class="label">
                    {{ $t('manageCv.detailDialog.name') }}
                  </div>
                  <div class="input input--long">
                    <v-text-field
                      v-model="cv.name_candidate"
                      dense
                      solo
                      value="Full name"
                    />
                  </div>
                </div>
                <!-- DoB -->
                <div>
                  <div class="label">
                    {{ $t('manageCv.detailDialog.birth') }}
                  </div>
                  <div class="input input--short">
                    <v-menu
                      ref="dob_menu"
                      v-model="dob_menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="cv.birthday"
                          label="YYYY-MM-DD"
                          solo
                          readonly
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="cv.birthday"
                        no-title
                        scrollable
                        @change="$refs.dob_menu.save(cv.birthday)"
                      />
                    </v-menu>
                  </div>
                </div>
                <!-- Gender -->
                <div>
                  <div class="label">
                    {{ $t('manageCv.detailDialog.gender') }}
                  </div>
                  <div class="input input--no-border">
                    <v-radio-group
                      v-model="cv.gender"
                      dense
                      class="input-box__input__radio"
                    >
                      <v-radio
                        :input-value="cv.gender"
                        :label="$t('manageCv.detailDialog.fmale')"
                      />
                      <v-radio
                        :input-value="cv.gender"
                        :label="$t('manageCv.detailDialog.male')"
                      />
                    </v-radio-group>
                  </div>
                </div>
                <!-- Phone -->
                <div>
                  <div class="label">
                    {{ $t('manageCv.detailDialog.phone') }}
                  </div>
                  <div class="input input--short">
                    <v-text-field
                      v-model="cv.phone"
                      label="Phone"
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
                    {{ $t('manageCv.detailDialog.email') }}
                  </div>
                  <div class="input input--long">
                    <v-text-field
                      v-model="cv.email"
                      label="E-mail"
                      dense
                      solo
                      required
                    />
                  </div>
                </div>
                <!-- Address -->
                <div>
                  <div class="label">
                    {{ $t('manageCv.detailDialog.address') }}
                  </div>
                  <div class="input input--long">
                    <v-textarea
                      v-model="cv.address"
                      auto-grow
                      rows="1"
                      row-height="2em"
                      dense
                      solo
                      required
                    />
                  </div>
                </div>
                <div class="form__separator mb-4">
                  <v-divider />
                </div>
                <h3 class="form__title">{{ $t('manageCv.detailDialog.edu') }}</h3>
                <!-- School -->
                <div>
                  <div class="label">
                    {{ $t('manageCv.detailDialog.sch') }}
                  </div>
                  <div class="input input--long">
                    <v-text-field
                      v-model="cv.school_name"
                      label="School"
                      dense
                      solo
                      required
                    />
                  </div>
                </div>
                <!-- Major -->
                <div>
                  <div class="label">
                    {{ $t('manageCv.detailDialog.major') }}
                  </div>
                  <div class="input input--normal">
                    <v-combobox
                      v-model="cv.major"
                      :items="popularMajor"
                      label="Major"
                      dense
                      solo
                    />
                  </div>
                </div>
                <!-- Level -->
                <div>
                  <div class="label">
                    {{ $t('manageCv.detailDialog.lv') }}
                  </div>
                  <div class="input input--short">
                    <v-combobox
                      v-model="cv.caa"
                      :items="itemsLevel"
                      label="Level"
                      dense
                      solo
                    />
                  </div>
                </div>
                <!-- School year -->
                <div>
                  <div class="label">
                    {{ $t('manageCv.detailDialog.schYear') }}
                  </div>
                  <div class="input input--normal">
                    <v-text-field
                      v-model="cv.seasion"
                      label="School Year"
                      required
                      dense
                      solo
                    />
                  </div>
                </div>
                <!-- GPA -->
                <div>
                  <div class="label">
                    {{ $t('manageCv.detailDialog.gpa') }}
                  </div>
                  <div class="input input--short">
                    <v-text-field
                      v-model="cv.gpa"
                      label="GPA"
                      max="10"
                      min="5"
                      step="0.1"
                      type="number"
                      required
                      dense
                      solo
                    />
                  </div>
                </div>
                <!-- Status -->
                <div>
                  <div class="label mt-5">
                    {{ $t('manageCv.detailDialog.stt') }}
                  </div>
                  <div class="input input--no-border">
                    <v-checkbox
                      v-model="cv.is_graduated"
                      :label="$t('manageCv.detailDialog.graduate')"
                      color="secondary"
                      hide-details
                      dense
                    />
                  </div>
                </div>
                <br>
                <div class="form__separator mb-4">
                  <v-divider />
                </div>
                <h3 class="form__title">{{ $t('manageCv.detailDialog.invi') }}</h3>
                <!-- Skills -->
                <div>
                  <div class="label mt-2">
                    {{ $t('manageCv.detailDialog.skill') }}
                  </div>
                  <div class="input input--normal">
                    <v-row>
                      <v-col
                        v-for="(item, i) in skillList"
                        :key="i"
                        class="shrink">
                        <v-chip
                          close
                          @click:close="skillList.splice(i, 1)"
                        >
                          {{ item }}
                        </v-chip>
                      </v-col>
                      <v-col
                        cols="12">
                        <v-text-field
                          v-model="skillItem"
                          :hint="$t('manageCv.detailDialog.skillRequired')"
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
                <div class="form__separator mb-4">
                  <v-divider />
                </div>
                <h3 class="form__title">{{ $t('manageCv.detailDialog.otherInfo') }}</h3>
                <!-- note -->
                <div>
                  <div class="label">
                    {{ $t('manageCv.detailDialog.note') }}
                  </div>
                  <div class="input input--long">
                    <v-textarea
                      v-model="cv.note"
                      auto-grow
                      rows="1"
                      row-height="2em"
                      dense
                      solo
                      required
                    />
                  </div>
                </div>
              </v-form>
            </div>
            <div v-if="tabView.name === 'Pdf'">
              <embed
                :src="cv.cv"
                :key="cv.id"
                style="height: 80vh"
                width="100%">
            </div>
          </v-card-text>
          <v-card-actions class="form__footer d-flex align-center ">
            <v-btn
              class="btn btn--primary"
              style="margin: 0 0 0 42px;"
              @click="editCV">
              {{ $t('manageCv.btnEdit') }}
            </v-btn>
            <v-btn
              class="btn btn--secondary"
              style="margin: 0 0 0 42px;"
              @click="closeDialog">
              {{ $t('manageCv.btnClose') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-dialog>

</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    cv: {
      type: Object,
      default: null
    },
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dob_menu: false,
      show: false,
      popularMajor: [
        'Web Developer',
        'Data analysis',
        'computer vision',
        'Design Graphic'
      ],
      skillItem: '',
      tab: null,
      tabViews: [
        {
          name: 'Text'
        },
        {
          name: 'Pdf'
        }
      ],
      // rawCV----Level
      itemsLevel: [
        'College',
        'Bachelor',
        'Master',
        'Doctor']
    }
  },
  computed: {
    ...mapGetters('cv', ['getUpdateStatus']),
    skillList () {
      return this.cv.tech
    }
  },
  watch: {
    skillList () {
      this.skillItem = ''
    },
    showDialog () {
      console.log('update show', this.showDialog)
      this.show = this.showDialog
    }
  },
  methods: {
    ...mapActions('cv', ['updateCv']),
    closeDialog () {
      this.show = false
      this.$emit('close')
    },
    addSkill (e) {
      if (e.keyCode === 13) {
        this.skillList.push(this.skillItem)
      }
    },
    // edit cv, call actions from process cv
    async editCV () {
    // prepare data
      console.log('before save', this.cv)
      let payload = {id: this.cv.id}
      let body = {}
      body['name_candidate'] = this.cv.name_candidate
      body['email'] = this.cv.email
      body['phone'] = this.cv.phone
      body['birthday'] = this.cv.birthday
      body['gender'] = this.cv.gender === null ? null : parseInt(this.cv.gender)
      body['address'] = this.cv.address
      body['school_name'] = this.cv.school_name
      body['gpa'] = this.cv.gpa
      body['seasion'] = this.cv.seasion
      body['tech'] = (this.cv.tech === null) ? null : this.cv.tech.toString()
      body['note'] = this.cv.note
      body['major'] = this.cv.major
      // school_level
      let strLevel = this.cv.school_lever
      let numLevel = null
      if (strLevel !== null) {
        switch (strLevel) {
          case 'College': numLevel = 1; break
          case 'Bachelor': numLevel = 2; break
          case 'Master': numLevel = 3; break
        }
      }
      body['school_lever'] = numLevel
      // this.cv.school_lever = numLevel
      body['is_graduated'] = this.cv.is_graduated === true ? 1 : 0
      // school type
      body['school_type'] = this.cv.school_type
      // provider (source cv)
      body['provider'] = this.cv.provider
      payload['body'] = Object.assign({}, body)

      // update cv
      await this.updateCv(payload)

      if (this.getUpdateStatus === true) { // success
        console.log('need to update parent state')
        this.$emit('update', payload)
        this.show = false
      }
      // close dialog
      // this.dialog_CV = false
      // get new cvs from state
      // this.cvs = this.getCvs()
    }
  }
}
</script>
