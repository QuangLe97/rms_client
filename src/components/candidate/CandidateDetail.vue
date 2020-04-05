<template>
  <v-dialog
    v-model="this.detailDialog"
    width="900px"
    @click:outside="close">
    <v-card>
      <v-tabs>
        <v-tabs-slider/>
        <v-tab>
          Detail
        </v-tab>
        <v-tab>
          CV
        </v-tab>
        <v-tab-item>
          <v-card-text>
            <v-row>
              <v-col md="2">
                <v-img
                  v-if="candidate.photo_url === null"
                  :src="require('@/assets/images/person.png')"
                  width="150px"
                  height="150px"/>
                <v-img
                  v-else
                  :src="`${candidate.photo_url}`"
                  width="150px"
                  height="150px"/>
              </v-col>
              <v-col>
                <div>
                  <v-btn
                    v-if="!isEditing"
                    :loading="editingButton"
                    outlined
                    color="primary"
                    @click="isEditing = true">Edit</v-btn>
                  <v-btn
                    v-else
                    :loading="editingButton"
                    outlined
                    @click="editCandidate">Save</v-btn>
                </div>
                <v-row>
                  <v-col md="1">
                    ID
                  </v-col>
                  <v-col md="1">
                    <v-text-field
                      :disabled="true"
                      :value="candidate.id"/>
                  </v-col>
                  <v-col md="2">
                    Name
                  </v-col>
                  <v-col md="4">
                    <v-text-field
                      :disabled="!isEditing"
                      :value="candidate.name"
                      v-model="candidate.name"/>
                  </v-col>
                  <v-col md="2">
                    Gender
                  </v-col>
                  <v-col md="2">
                    <v-radio-group
                      v-model="candidate.gender"
                      :disabled="!isEditing">
                      <v-radio
                        :value="1"
                        label="Male"/>
                      <v-radio
                        :value="0"
                        label="Female"/>
                    </v-radio-group>
                  </v-col>
                  <v-col md="2">
                    Birthday
                  </v-col>
                  <v-col md="4">
                    <v-menu
                      ref="menu"
                      v-model="dobMenu"
                      :close-on-content-click="false"
                      :return-value.sync="candidate.dob"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          :v-model="new Date(candidate.dob).toISOString().substring(0,10)"
                          :disabled="!isEditing"
                          readonly
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="candidate.dob"
                        no-title
                        scrollable>
                        <v-spacer/>
                        <v-btn
                          text
                          color="primary"
                          @click="dobMenu = false">Cancel</v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(candidate.dob)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col md="2">
                    Phone
                  </v-col>
                  <v-col md="4">
                    <v-text-field
                      :disabled="!isEditing"
                      :value="candidate.phone"
                      v-model="candidate.phone"
                      type="number"/>
                  </v-col>
                  <v-col md="2">
                    Email
                  </v-col>
                  <v-col md="4">
                    <v-text-field
                      :disabled="!isEditing"
                      :value="candidate.email"
                      v-model="candidate.email"/>
                  </v-col>
                  <v-col md="2">
                    Address
                  </v-col>
                  <v-col md="4">
                    <v-text-field
                      :disabled="!isEditing"
                      :value="candidate.address"
                      v-model="candidate.address"/>
                  </v-col>
                  <v-col md="2">
                    Expected Salary
                  </v-col>
                  <v-col md="4">
                    <v-text-field
                      :disabled="!isEditing"
                      :value="candidate.expected_salary"
                      v-model="candidate.expected_salary"/>
                  </v-col>
                  <v-col md="2">
                    Hobbies
                  </v-col>
                  <v-col md="4">
                    <v-text-field
                      :disabled="!isEditing"
                      :value="candidate.hobbies"
                      v-model="candidate.hobbies"/>
                  </v-col>
                  <v-col md="2">
                    Career goal
                  </v-col>
                  <v-col md="4">
                    <v-text-field
                      :disabled="!isEditing"
                      :value="candidate.career_goal"
                      v-model="candidate.career_goal"/>
                  </v-col>
                  <v-col md="2">
                    School
                  </v-col>
                  <v-col md="4">
                    <v-text-field
                      :disabled="!isEditing"
                      :value="candidate.school"
                      v-model="candidate.school"/>
                  </v-col>
                  <v-col md="2">
                    School level
                  </v-col>
                  <v-col md="4">
                    <v-text-field
                      :disabled="!isEditing"
                      :value="candidate.school_level"
                      v-model="candidate.school_level"/>
                  </v-col>
                  <v-col md="2">
                    GPA
                  </v-col>
                  <v-col md="4">
                    <v-text-field
                      :disabled="!isEditing"
                      :value="candidate.gpa"
                      v-model="candidate.gpa"/>
                  </v-col>
                  <v-col md="2">
                    Source
                  </v-col>
                  <v-col md="4">
                    <v-text-field
                      :disabled="!isEditing"
                      :value="candidate.source"
                      v-model="candidate.source"/>
                  </v-col>
                  <v-row
                    v-for="(field, key) in candidate.other_infos"
                    :key="'oi'+key">
                    <v-col md="2" >
                      {{ field.title }}
                    </v-col>
                    <v-col md="2" >
                      <v-text-field
                        :disabled="!isEditing"
                        :value="field.content"
                        v-model="field.content"/>
                    </v-col>
                  </v-row>
                </v-row>
              </v-col>
            </v-row>
            <h1>Experiences</h1>
            <v-divider/>
            <div
              v-for="(experience, key) in candidate.experiences"
              :key="'e'+key">
              <!--              <v-icon @click="deleteExp(experience)">mdi-close</v-icon>-->
              <h2>{{ experience.organization }}</h2>
              <p>{{ experience.project_name }}</p>
              <p>{{ experience.role }}</p>
              <p>{{ new Date(experience.start_time).toISOString().substring(0,10) }} - {{ experience.end_time === null ? 'Present' : new Date(experience.end_time).toISOString().substring(0,10) }}</p>
              <p>{{ experience.project_description }}</p>
            </div>
            <h1>Skills</h1>
            <v-divider/>
            <div
              v-for="(skill, key) in candidate.skills"
              :key="'s'+key">
              <!--              <v-icon @click="deleteSkill(skill)">mdi-close</v-icon>-->
              <h2>{{ skill.skill_name }}</h2>
              <p>{{ skill.experience_by_month === null ? '' : skill.experience_by_month + 'months experience' }}</p>
              <p>{{ skill.skill_description }}</p>
            </div>
            <h1>Certifications</h1>
            <v-divider/>
            <div
              v-for="(cert, key) in candidate.certifications"
              :key="'c'+key">
              <!--              <v-icon @click="deleteCertification(cert)">mdi-close</v-icon>-->
              <h2>{{ cert.cert_name }}</h2>
              <p>Expire time: {{ new Date(cert.expire_time).toISOString().substring(0,10) }}</p>
              <p>{{ cert.cert_description }}</p>
            </div>
          </v-card-text>
        </v-tab-item>
        <v-tab-item>
          <v-card height="750px">
            <p v-if="candidate.cv_url === null">Not avaiable</p>
            <embed
              v-else
              :src="`${candidate.cv_url}`"
              width="100%"
              height="100%" >
          </v-card>
        </v-tab-item>
      </v-tabs>
      <v-divider/>
      <v-card-actions>
        <div class="flex-grow-1"/>
        <v-btn
          color="blue darken-1"
          text
          @click="close">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {mapMutations, mapState, mapActions} from 'vuex'
export default {
  name: 'CandidateDetail',
  props: {
    candidate: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    isEditing: false,
    dobMenu: false
  }),
  computed: {
    ...mapState('candidate', ['detailDialog', 'editingButton'])
  },
  watch: {

  },
  methods: {
    ...mapMutations('candidate', ['setDetailDialog']),
    ...mapActions('candidate', ['update']),
    close () {
      this.candidate.cv_url = null
      this.isEditing = false
      this.setDetailDialog(false)
    },
    async editCandidate () {
      await this.update(this.candidate)
      this.isEditing = false
      console.log(this.candidate)
    },
    deleteExp (item) {
      let index = this.candidate.experiences.findIndex(x => x.id === item.id)
      this.candidate.experiences.splice(index, 1)
      this.$forceUpdate()
    },
    deleteSkill (item) {
      let index = this.candidate.skills.findIndex(x => x.id === item.id)
      this.candidate.skills.splice(index, 1)
      this.$forceUpdate()
    },
    deleteCertification (item) {
      let index = this.candidate.certifications.findIndex(x => x.id === item.id)
      this.candidate.certifications.splice(index, 1)
      this.$forceUpdate()
    }
  }
}
</script>
