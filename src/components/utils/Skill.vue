<template>
  <v-dialog
    v-model="this.skillDialog"
    width="700px"
    persistent
  >
    <v-card>
      <v-card-text>
        <v-text-field
          v-model="newSkill.skill_name"
          label="Skill name"/>
        <v-text-field
          v-model="newSkill.skill_description"
          label="Description"/>
        <v-text-field
          v-model="newSkill.experience_by_month"
          type="number"
          label="Experience months"/>
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
    skillType: {
      type: Number,
      default: -1
    },
    id: {
      type: Number,
      default: -1
    }
  },
  data: () => ({
    skillProto: {
      experience_by_month: null,
      skill_name: null,
      skill_description: null
    },
    newSkill: {
      experience_by_month: null
    }
  }),
  computed: {
    ...mapState('utils', ['skillDialog']),
    ...mapState('candidate_draft', ['draftCandidates'])
  },
  methods: {
    ...mapMutations('utils', ['setSkillDialog']),
    ...mapMutations('candidate_draft', ['addSkill']),
    close () {
      Object.assign(this.newSkill, this.skillProto)
      this.setSkillDialog(false)
    },
    save () {
      let payload = {
        skill_name: this.newSkill.skill_name,
        skill_description: this.newSkill.skill_description,
        experience_by_month: this.newSkill.experience_by_month
      }
      this.addSkill(payload)
      this.close()
    }
  }
}
</script>
