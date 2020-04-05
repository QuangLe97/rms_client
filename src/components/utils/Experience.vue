<template>
  <v-dialog
    v-model="this.experienceDialog"
    width="700px"
    persistent
  >
    <v-card>
      <v-card-text>
        <v-text-field
          v-model="newExp.role"
          label="Title"/>
        <v-text-field
          v-model="newExp.organization"
          label="Company"/>
        <v-text-field
          v-model="newExp.project_name"
          label="Project name"/>
        <v-textarea
          v-model="newExp.project_description"
          label="Description"/>
        <v-checkbox
          v-model="newExp.isWorking"
          label="I am currently working in this role"
        />
        <v-row>
          <v-col cols="6">
            <p>Start Date</p>
            <v-date-picker
              v-model="newExp.start_time"
              type="month"/>
          </v-col>
          <v-col cols="6">
            <p>End Date</p>
            <v-date-picker
              v-if="newExp.isWorking===false"
              v-model="newExp.end_time"
              type="month"/>
            <p v-else>Persent</p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"/>
        <v-btn
          color="blue darken-1"
          text
          @click="close">Cancel</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
  props: {
    expType: {
      type: Number,
      default: -1
    },
    id: {
      type: Number,
      default: -1
    }
  },
  data: () => ({
    expProto: {
      isWorking: false,
      start_time: new Date().toISOString().substr(0, 7),
      end_time: new Date().toISOString().substr(0, 7),
      role: null,
      organization: null,
      project_description: null,
      project_name: null
    },
    newExp: {
      isWorking: false,
      project_name: null
    }
  }),
  computed: {
    ...mapState('utils', ['experienceDialog']),
    ...mapState('candidate_draft', ['draftCandidates'])
  },
  methods: {
    ...mapMutations('utils', ['setExperienceDialog']),
    ...mapMutations('candidate_draft', ['addExperience']),
    close () {
      Object.assign(this.newExp, this.expProto)
      this.setExperienceDialog(false)
    },
    save () {
      let payload = {
        start_time: this.newExp.start_time,
        end_time: this.newExp.end_time,
        role: this.newExp.role,
        organization: this.newExp.organization,
        project_description: this.newExp.project_description,
        project_name: this.newExp.project_name
      }
      if (this.newExp.isWorking === true) {
        payload.end_time = null
      }
      this.addExperience(payload)
      this.close()
    }
  }
}
</script>
