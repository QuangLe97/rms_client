<template>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent
    fullscreen
  >
    <v-card>
      <v-card-title>
        <span class="headline">Edit candidate</span>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-btn
              color="primary"
              @click="isRaw = !isRaw">{{ isRawTitle }}</v-btn>
            <div v-if="!isRaw">
              <p v-if="candidate.cv === null">Not available</p>
              <embed
                v-else
                :src="`${candidate.cv}`"
                width="100%"
                height="700px" >
            </div>
            <v-row
              v-else
              style="max-height: 1500px">
              <v-col
                v-for="(field, index) in Object.keys(candidate.others)"
                :key="'oi'+index"
                cols="12"
                sm="6"
                md="4">
                <h2>{{ field }}</h2>
                <div
                  v-for="(detail, key) in candidate.others[field]"
                  :key="'dt'+key">
                  <p>{{ detail }}</p>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row>
              <v-col
                sm="4"
                md="4">
                <v-img
                  v-if="candidate.photo === null"
                  :src="require('@/assets/images/person.png')"
                  width="150px"
                  height="150px"/>
                <v-img
                  v-else
                  :src="`${candidate.photo}`"
                  width="150px"
                  height="150px"/>
              </v-col>
              <v-col
                sm="8"
                md="8">
                <v-row>
                  <v-col
                    sm="6"
                    md="7">
                    <v-text-field
                      v-model="candidate.name"
                      label="Tên"/>
                  </v-col>
                  <v-col
                    sm="6"
                    md="5">
                    <v-radio-group
                      v-model="candidate.gender"
                      row>
                      <v-radio
                        :value="1"
                        label="Male"/>
                      <v-radio
                        :value="0"
                        label="Female"/>
                    </v-radio-group>
                  </v-col>
                  <v-col
                    sm="4"
                    md="4">
                    <v-text-field
                      v-model="candidate.address"
                      label="Địa chỉ"/>
                  </v-col>
                  <v-col
                    sm="4"
                    md="4">
                    <v-text-field
                      v-model="candidate.phone"
                      label="SĐT"/>
                  </v-col>
                  <v-col
                    sm="4"
                    md="4">
                    <v-text-field
                      v-model="candidate.email"
                      label="Email"/>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-model="candidate.education.university"
                  label="Trường"/>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-select
                  :items="school_levels"
                  v-model="additionalInfo.school_level"
                  label="Loại trường"/>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-model="candidate.education.GPA"
                  label="GPA"/>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-checkbox
                  v-model="additionalInfo.is_graduated"
                  label="Đã tốt nghiệp"/>
              </v-col>
              <v-col
                v-if="!additionalInfo.is_graduated"
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-model="additionalInfo.sum_remaining_subjects"
                  label="Số môn học còn lại"/>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-model="additionalInfo.career_goal"
                  label="Định hướng nghề nghiệp"/>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-model="additionalInfo.expected_salary"
                  label="Lương mong muốn"
                  type="number"/>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-model="additionalInfo.nationality"
                  label="Quốc tịch"/>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-model="additionalInfo.source"
                  label="Người giới thiệu"/>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-model="additionalInfo.hobbies"
                  label="Sở thích"/>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="candidate.birthday"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="candidate.birthday"
                      label="Birthday"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="candidate.birthday"
                    no-title
                    scrollable>
                    <v-spacer/>
                    <v-btn
                      text
                      color="primary"
                      @click="menu = false">Cancel</v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(candidate.birthday)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col
                v-if="otherFields.length>0"
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-for="(field, key) in otherFields"
                  :key="'of'+key"
                  :label="field.title"
                  :value="field.content"/>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-dialog
                  v-model="newFieldDialog"
                  width="300px">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="primary"
                      dark
                      v-on="on"
                    >
                      New Field
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>New field</v-card-title>
                    <v-card-text>
                      <v-text-field
                        v-model="newField.title"
                        label="Field title"/>
                      <v-text-field
                        v-model="newField.content"
                        label="Field content"/>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn @click="newFieldDialog = false">Cancel</v-btn>
                      <v-btn @click="addField">OK</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
            <br>
            <v-row class="justify-space-between">
              <h2>Experiences</h2>
              <v-icon @click="newExDialog">mdi-plus-circle-outline</v-icon>
            </v-row>
            <Experience :id="candidate.id"/>
            <v-card
              v-for="(experience, key) in currentExperience"
              :key="'exp'+key"
              flat>
              <v-divider/>
              <v-card-actions>
                <v-icon @click="removeExp(experience)">mdi-close</v-icon>
              </v-card-actions>
              <v-card-title>{{ experience.organization }}</v-card-title>
              <v-card-text>
                <p>{{ experience.project_name }}</p>
                <p>{{ experience.role }}</p>
                <p>{{ experience.start_time }} - {{ experience.end_time === null ? 'Present' : experience.end_time }}</p>
                <p>{{ experience.project_description }}</p>
              </v-card-text>

            </v-card>
            <br>
            <v-row class="justify-space-between">
              <h2>Skills</h2>
              <v-icon @click="newSkill">mdi-plus-circle-outline</v-icon>
            </v-row>
            <Skill/>
            <v-card
              v-for="(skill, key) in currentSkill"
              :key="'sk'+key"
              flat>
              <v-divider/>
              <v-card-actions>
                <v-icon @click="deleteSkill(skill)">mdi-close</v-icon>
              </v-card-actions>
              <v-card-title>{{ skill.skill_name }}</v-card-title>
              <v-card-text>
                <p v-if="skill.experience_by_month">{{ skill.experience_by_month }} months experience</p>
                <p>{{ skill.skill_description }}</p>
              </v-card-text>
            </v-card>
            <br>
            <v-row class="justify-space-between">
              <h2>Certifications</h2>
              <v-icon @click="newCert">mdi-plus-circle-outline</v-icon>
            </v-row>
            <Certification/>
            <v-card
              v-for="(cert, key) in currentCert"
              :key="'cer'+key"
              flat>
              <v-divider/>
              <v-card-actions>
                <v-icon @click="deleteCert(cert)">mdi-close</v-icon>
              </v-card-actions>
              <v-card-title>{{ cert.cert_name }}</v-card-title>
              <v-card-text>
                <p>Expire: {{ cert.expire_time }}</p>
                <p>{{ cert.cert_description }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"/>
        <v-btn
          color="blue darken-1"
          text
          @click="closeEditDialog">Cancel</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="save">Confirm</v-btn>
      </v-card-actions>
    </v-card >
  </v-dialog>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Experience from '../utils/Experience'
import Skill from '../utils/Skill'
import Certification from '../utils/Certification'
export default {
  name: 'EditDialog',
  components: {
    Experience,
    Skill,
    Certification
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    editedIndex: {
      type: Number,
      default: -1
    },
    candidate: {
      type: Object,
      default: function () {
        return {
          name: null,
          gender: null,
          photo: null,
          cv: null,
          address: null,
          phone: null,
          email: null,
          education: {
            university: null,
            GPA: null
          }
        }
      }
    }
  },
  data: () => ({
    additionalInfo: {
      school_level: null,
      is_graduated: true,
      sum_remaining_subjects: null,
      career_goal: null,
      expected_salary: null,
      nationality: 'VN',
      source: null,
      hobbies: null
    },
    school_levels: ['I', 'II', 'III'],
    emptyCandidate: {
      id: null,
      cv: null,
      education: {
        university: null,
        GPA: null
      }
    },
    isRaw: false,
    menu: false,
    otherFields: [],
    newField: {
      title: null,
      content: null
    },
    newFieldDialog: false
  }),
  computed: {
    ...mapState('candidate', ['candidates']),
    ...mapState('utils', ['experienceDialog']),
    ...mapState('candidate_draft', ['currentExperience', 'currentSkill', 'currentCert']),
    isRawTitle () {
      return this.isRaw === false ? 'Raw' : 'CV'
    }
  },
  methods: {
    ...mapMutations('candidate_draft', ['setDialog', 'setCurrentExperience', 'removeExperience', 'removeSkill', 'removeCert', 'setCurrentSkill', 'setCurrentCert']),
    ...mapMutations('utils', ['setExperienceDialog', 'setSkillDialog', 'setCertDialog']),
    ...mapActions('candidate', ['create']),
    ...mapActions('candidate_draft', ['deleteDraftCandidate']),
    closeEditDialog () {
      this.resetData()
      this.setDialog(false)
    },
    resetData () {
      this.additionalInfo = {
        school_level: null,
        is_graduated: true,
        sum_remaining_subjects: null,
        career_goal: null,
        expected_salary: null,
        nationality: 'VN',
        source: null,
        hobbies: null
      }
      this.setCurrentExperience([])
      this.setCurrentSkill([])
      this.setCurrentCert([])
      Object.assign(this.candidate, this.emptyCandidate)
    },
    async save () {
      let payload = {}
      Object.assign(payload, this.candidate)
      payload['experiences'] = this.currentExperience
      payload['skills'] = this.currentSkill
      payload['certifications'] = this.currentCert
      payload['other_infos'] = this.otherFields
      payload['school'] = this.candidate.education.university
      payload['gpa'] = this.candidate.education.GPA
      payload['expected_salary'] = this.additionalInfo.expected_salary
      payload['is_graduated'] = this.additionalInfo.is_graduated
      payload['sum_remaining_subjects'] = this.additionalInfo.sum_remaining_subjects
      payload['career_goal'] = this.additionalInfo.career_goal
      payload['nationality'] = this.additionalInfo.nationality
      payload['school_level'] = this.additionalInfo.school_level
      payload['hobbies'] = this.additionalInfo.hobbies
      payload['source'] = this.additionalInfo.source
      await this.create(payload)
      this.deleteDraftCandidate({id: payload.id})
      this.resetData()
      // dispatch('candidate_draft/deleteDraftCandidate', {id: payload.id}, {root: true})
    },
    newExDialog () {
      this.setExperienceDialog(true)
    },
    removeExp (item) {
      this.removeExperience(item)
    },
    deleteSkill (item) {
      this.removeSkill(item)
    },
    newSkill () {
      this.setSkillDialog(true)
    },
    newCert () {
      this.setCertDialog(true)
    },
    deleteCert (item) {
      this.removeCert(item)
    },
    addField () {
      this.otherFields.push(this.newField)
      this.newField = {}
      this.newFieldDialog = false
    }
  }
}
</script>
<style scoped>
  .v-expansion-panel:before { box-shadow: none !important; }
</style>
