<template>
  <v-dialog
    v-model="showDialog"
    fullscreen>
    <v-row
      class="interview-candidate">
      <v-col
        cols="2"
        class="side-bar">

        <!-- Close dialog -->
        <div>
          <v-btn
            icon
            @click="closeDialog">
            <v-icon style="color:white">mdi-close</v-icon>
          </v-btn>
        </div>

        <!-- Brief candidate info -->
        <div>
          <!-- Candidate avatar -->
          <div class="avatar avatar--big">
            <v-icon
              v-if="candidate.photo === null"
              style="font-size: 130px">
              mdi-account-circle
            </v-icon>
            <v-img
              v-else
              :src="candidate.photo"
            />
          </div>

          <!-- Candidate name & view cv action -->
          <div class="text-center">
            <h3
              class="sub-heading sub-heading--white mt-5">
              {{ candidate.name_candidate }}
            </h3>
            <v-btn
              class="btn btn--tertiary btn--tertiary--white mt-1"
              @click="viewCV">View CV</v-btn>
          </div>
        </div>

        <!-- Score note -->
        <div class="note">
          <div>
            <div class="sub-heading sub-heading--white">
              <v-icon
                color="white"
                style="margin-bottom: 4px;">mdi-information-outline</v-icon> Band scores
            </div>
            <div class="content-secondary content-secondary--white">
              <p>1 - bad<br>2 - medium<br>3 - good<br>4 - excellent
              </p>
            </div>
          </div>
        </div>

      </v-col>

      <v-col
        cols="10"
        offset="2"
        class="main-content">
        <!-- Main stuff here -->
        <v-row>
          <v-col>
            <!-- Group topics -->
            <div
              v-for="group in groupTopics"
              :key="group.name_group"
              class="box box--white box--shadow mb-5">
              <div
                class="sub-sub-heading">
                {{ group.name_group }}
              </div>
              <v-data-table
                key="id"
                :headers="headers"
                :items="group.data_table"
                :disable-pagination="true"
                :hide-default-footer="true"
                class="form">
                <!-- Update score -->
                <template v-slot:item.score="props">
                  <div class="input">
                    <v-text-field
                      v-model="props.item.score"
                      :hide-details="true"
                      :min="1"
                      :max="4"
                      solo
                      dense
                      step="1"
                      type="number"
                    />
                  </div>
                </template>

                <!-- Update comment -->
                <template v-slot:item.comment="props">
                  <div class="input input--full">
                    <v-textarea
                      v-model="props.item.comment"
                      :hide-details="true"
                      auto-grow
                      rows="1"
                      row-height="2em"
                      dense
                      solo
                      required
                    />
                  </div>
                </template>
              </v-data-table>
              <v-btn
                class="btn btn--primary mt-5"
                @click="updateAsk(group)">Save</v-btn>
            </div>

            <!-- Summary -->
            <div
              class="box box--white box--shadow">
              <div
                class="sub-sub-heading">
                Summary (required)
              </div>
              <v-data-table
                key="id"
                :headers="headerSummary"
                :items="summary.data_table"
                :disable-pagination="true"
                :hide-default-footer="true"
                class="form">
                <!-- Update score -->
                <template v-slot:item.score="props">
                  <div class="input">
                    <v-text-field
                      v-model="props.item.score"
                      :hide-details="true"
                      :min="1"
                      :max="4"
                      solo
                      dense
                      step="1"
                      type="number"
                    />
                  </div>
                </template>

                <!-- Update comment -->
                <template v-slot:item.comment="props">
                  <div class="input input--full">
                    <v-textarea
                      v-model="props.item.comment"
                      :hide-details="true"
                      auto-grow
                      rows="1"
                      row-height="2em"
                      dense
                      solo
                      required
                    />
                  </div>
                </template>
              </v-data-table>
              <div class="input input--no-border">
                <v-radio-group
                  v-model="summary.is_pass"
                  dense
                  class="input-box__input__radio"
                >
                  <v-radio
                    :input-value="summary.is_pass"
                    label="Pass"
                  />
                  <v-radio
                    :input-value="summary.is_pass"
                    label="Fail"
                  />
                </v-radio-group>
              </div>
              <div class="form">
                <div class="label">
                  Note
                </div>
                <div class="input input--full">
                  <v-textarea
                    v-model="summary.comment"
                    auto-grow
                    rows="1"
                    row-height="2em"
                    dense
                    solo
                    required
                  />
                </div>
              </div>
              <v-btn
                class="btn btn--primary mt-5"
                @click="updateSum">Save</v-btn>
            </div>
          </v-col>

        </v-row>
      </v-col>
    </v-row>

  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import cvDetailDialog from './cvDetailDialog'

export default {
  candidate: {
    cvDetailDialog
  },
  props: {
    interviewInformation: {
      type: Object,
      default: null
    },
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showDialog: false,
      candidate: {},
      summary: {

      },
      headerSummary: [
        {
          text: 'Group',
          value: 'name_group',
          width: 100
        },
        {
          text: 'Score',
          value: 'score',
          width: 100
        },
        {
          text: 'Comment',
          value: 'comment'
        }
      ],
      headers: [
        { text: 'Question', value: 'name_topic' },
        { text: 'Score', value: 'score', width: 100 },
        { text: 'Comment', value: 'comment' }
      ],
      groupTopics: []
    }
  },
  computed: {
    ...mapGetters('interviewCandidate', ['getGroupTopics', 'getCandidate', 'getSummary'])
  },
  watch: {
    async dialog () {
      this.showDialog = this.dialog

      // when open dialog, get group topics
      if (this.dialog & this.interviewInformation.id !== undefined) {
        await this.loadGroupTopics({id_interview: this.interviewInformation.id})
        this.groupTopics = this.getGroupTopics
        this.candidate = this.interviewInformation.candidate
        console.log('group topics', this.getGroupTopics)

        await this.loadSummary({id_interview: this.interviewInformation.id})
        this.summary = this.getSummary
      }
    }
  },
  methods: {
    ...mapActions('interviewCandidate', ['loadGroupTopics', 'updateTopic', 'loadSummary', 'updateSummary']),
    closeDialog () {
      this.showDialog = false
      this.$emit('close')
    },
    async updateAsk (group) {
      console.log('need to save', group)
      await this.updateTopic({data_table: group.data_table})
    },
    async updateSum () {
      // something wrong with api updateSummary
      console.log('summary', this.summary)
      // check all filled data
      if (this.summary.comment === null || this.summary.is_pass === null) {
        // alert
        alert('You must fill in all fields in the summary')
      } else {
        // check array inside
        for (let i = 0; i < this.summary.data_table.length; i++) {
          let data = this.summary.data_table[i]
          if (data.score === null || data.comment === null) {
            // alert
            alert('You must fill in all fields in the summary')
            return
          }
        }
        await this.updateSummary(this.summary)
      }
    },
    async viewCV () {
      console.log('candidate id', this.candidate.id_candidate)
      // get cv information
      // api: getCvInformationById
    }
  }
}
</script>

<style lang="scss">
  @import '@/scss/pages/_interview-candidate.scss';
</style>
