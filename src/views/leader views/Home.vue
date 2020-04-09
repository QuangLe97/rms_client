<template>
  <div class="leader-home">
    <div class="main-container">

      <h3 class="heading">
        {{ $t('leader.home.heading') }}
      </h3>
      <p class="sub-heading mt-3">
        {{ $t('leader.home.subHeading1') }}<br>
        {{ $t('leader.home.subHeading2') }}
      </p>

      <!-- Date combobox -->
      <!-- Session -->
      <div class="form mt-10">
        <div>
          <div class="input input--short">
            <v-combobox
              v-model="selectedDate"
              :items="dateArray"
              dense
              solo
              @change="getInterviewScheduleFrom"
            />
          </div>
        </div>
      </div>

      <!-- Interview schedule table -->
      <v-data-table
        :headers="headers"
        :items="getInterviewSchedule"
        hide-default-footer
        class="box box--white box--shadow mt-4 mb-5"
        style="max-width: 1200px;"
        @click:row="showInterviewDialog">
        <template v-slot:item.avatar="{ item }">
          <div class="avatar">
            <v-icon
              v-if="item.candidate.photo === null"
              style="font-size: 70px;">
              mdi-account-circle
            </v-icon>
            <!-- Just to remove error in console -->
            <v-img
              v-else
              :src="`${item.candidate.photo}`"
            />
          </div>
        </template>
        <template
          v-slot:item.candidate="{item}">
          <span
            class="content-primary">{{ item.candidate.name_candidate }}</span><br>
          <span class="content-secondary">{{ item.candidate.email }}</span>
        </template>
        <template v-slot:item.time="{item}">
          <span class="content-primary">{{ item.date }}</span><br>
          <span class="content-secondary">{{ `${item.time_start} - ${item.time_end}` }}</span>
        </template>
        <template
          v-slot:item.place="{item}"
          style="max-width: 400px;">
          <span class="content-primary">{{ item.place }}</span><br>
        </template>
        <template v-slot:item.is_interviewed="{item}">
          <span v-if="item.is_interviewed === 0"/>
          <span v-else><v-chip
            color="green"
            text-color="white"
          >Interviewed</v-chip></span>
        </template>
      </v-data-table>

      <!-- Dialog -->
      <InterviewCandidate
        :dialog="showDialog"
        :interview-information="selectedSchedule"
        @close="showDialog = false"/>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import InterviewCandidate from '@/views/components/interviewCandidateDialog'

export default {
  components: {
    InterviewCandidate
  },
  data () {
    return {
      dateArray: ['Today', 'Tomorrow', 'This week'],
      selectedDate: null,
      showDialog: false,
      selectedSchedule: null
    }
  },
  computed: {
    ...mapGetters('leader', ['getInterviewSchedule']),
    headers () {
      return [
        { text: '', value: 'avatar' },
        { text: this.$t('leader.home.headerTable.candidate'), value: 'candidate' },
        { text: this.$t('leader.home.headerTable.round'), value: 'name_round' },
        { text: this.$t('leader.home.headerTable.time'), value: 'time' },
        { text: this.$t('leader.home.headerTable.place'), value: 'place' },
        { text: this.$t('leader.home.headerTable.status'), value: 'is_interviewed' }
      ]
    }
  },
  async created () {
    await this.loadInterviewSchedule()
    console.log('get interview schedule', this.getInterviewSchedule)
  },
  methods: {
    ...mapActions('leader', ['loadInterviewSchedule']),
    getInterviewScheduleFrom () {
      console.log('selected date', this.selectedDate)
    },
    showInterviewDialog (selectedSchedule) {
      console.log('show this row', selectedSchedule)
      this.selectedSchedule = selectedSchedule
      this.showDialog = true
    }
  }

}
</script>
<style lang="scss">
  @import '@/scss/pages/_leader-home.scss';
  @import '@/scss/components/_btn.scss';
  @import '@/scss/components/_box.scss';
  @import '@/scss/components/_form.scss';
  @import '@/scss/components/_image.scss';
</style>
