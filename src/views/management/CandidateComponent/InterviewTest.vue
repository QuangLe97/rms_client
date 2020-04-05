<v-row v-show="profileTabs[2].active">
  <v-col cols="2">
    <v-list >
      <v-list-item
        v-for="(tab, index) in roundInterview"
        :key="index"
        style="border-right: 2px solid;"
        class="pl-5"
        link
        @click="viewInterviewResult(tab, resultTemple.id, resultTemple.period_recruit)">
        <v-list-item-content>
          <v-list-item-title>
            <b>{{ tab }}</b>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-col>
  <v-col
    v-if="roundType === 'inter'"
    cols="10">
    <h2 class="text-center">{{ roundName }}</h2>
    <!-- topic -->
    <v-row class="mb-2">
      <h4>Topic</h4>
      <v-btn
        class="ml-2"
        color="warning"
        fab
        x-small
        dark
        @click="showAllTopic">
        <v-icon>mdi-chevron-double-right</v-icon>
      </v-btn>
    </v-row>
    <v-expansion-panels
      v-model="topicShowAll"
      multiple>
      <v-expansion-panel
        v-for="(quest, index) in getTopicResult"
        :key="index">
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="12">{{ index + 1 }}. <b>{{ quest.name_topic }}</b></v-col>
            <v-col
              cols="12"
              class="text--secondary"
            >
              <v-fade-transition leave-absolute>
                <v-row
                  v-if="!open"
                  no-gutters
                  style="width: 100%"
                >
                  <v-col/>
                  <v-col
                    v-for="(inter,i) in quest.evaluate_data"
                    :key="i">
                    {{ inter.score !== null ? inter.score:'null ' }}pts
                  </v-col>
                  <v-col/>
                </v-row>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row
            justify="space-around"
            no-gutters>
            <v-col
              v-for="(inter,i) in quest.evaluate_data"
              :key="i"
              cols="3">
              <span style="font-size:20px">{{ inter.interviewer }}</span><br>
              <v-icon style="font-size: 15px">mdi-format-annotation-plus</v-icon>&#32;{{ inter.score !== null ? inter.score:'null ' }}pts<br>
              <v-icon style="font-size: 15px">mdi-comment-processing-outline</v-icon>&#32;{{ inter.comment !== null ? inter.comment:'null ' }}
            </v-col>

          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!-- group -->
    <v-row class="mb-2 mt-12">
      <h4>Group</h4>
      <v-btn
        class="ml-2"
        color="warning"
        fab
        x-small
        dark
        @click="showAllGroup">
        <v-icon>mdi-chevron-double-right</v-icon>
      </v-btn>
    </v-row>
    <v-expansion-panels
      v-model="groupShowAll"
      multiple>
      <v-expansion-panel
        v-for="(group, index) in getGroupResult"
        :key="index">
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="12">{{ index + 1 }}. <b>{{ group.name_group }}</b></v-col>
            <v-col
              cols="12"
              class="text--secondary"
            >
              <v-fade-transition leave-absolute>
                <v-row
                  v-if="!open"
                  no-gutters
                  style="width: 100%"
                >
                  <v-col/>
                  <v-col
                    v-for="(inter,i) in group.evaluate_data"
                    :key="i">
                    {{ inter.score !== null ? inter.score:'null ' }}pts
                  </v-col>
                  <v-col/>
                </v-row>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row
            justify="space-around"
            no-gutters>
            <v-col
              v-for="(inter,i) in group.evaluate_data"
              :key="i"
              cols="3">
              <span style="font-size:20px">{{ inter.interviewer }}</span><br>
              <v-icon style="font-size: 15px">mdi-format-annotation-plus</v-icon>&#32;{{ inter.score !== null ? inter.score:'null ' }}pts<br>
              <v-icon style="font-size: 15px">mdi-comment-processing-outline</v-icon>&#32;{{ inter.comment!== null ? inter.comment:'null ' }}
            </v-col>

          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!-- summary -->
    <v-row class="mb-2 mt-12">
      <h4>Summary</h4>
    </v-row>
    <v-expansion-panels>
      <v-expansion-panel
        v-if="getSummaryResult.length > 0">
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="12"><b>Summary</b></v-col>
            <v-col
              cols="12"
              class="text--secondary"
            >
              <v-fade-transition leave-absolute>
                <v-row
                  v-if="!open"
                  no-gutters
                  style="width: 100%"
                >
                  <v-col/>
                  <v-col
                    v-for="(inter,i) in getSummaryResult"
                    :key="i">
                    {{ inter.is_pass === 1 ? 'yes': null }}
                    {{ inter.is_pass === 0 ? 'no': null }}
                    {{ inter.is_pass === null ? 'null': null }}
                    div
                  </v-col>
                </v-row>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row
            no-gutters>
            <v-col
              v-for="(inter,i) in getSummaryResult"
              :key="i"
              class="mb-5"
              cols="3">
              <span style="font-size:20px">{{ inter.interviewer_name }}</span><br>
              <v-icon>{{ inter.is_pass === 1 ? 'mdi-checkbox-marked-circle': null }}</v-icon>
              <v-icon>{{ inter.is_pass === 1 ? 'mdi-close-circle': null }}</v-icon>
              {{ inter.is_pass === null ? 'null': null }}<br>
              <v-icon style="font-size: 15px">mdi-comment-processing-outline</v-icon>&#32;{{ inter.comment !== null ? inter.comment:'null' }}
            </v-col>
            <v-btn @click="summary_dialog = !summary_dialog"> edit </v-btn>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-col>
  <v-col
    v-if="roundType === 'test'"
    cols="10">
    <h2 class="text-center">{{ roundName }}</h2>
    <v-row>
      <p
        class="d-flex align-content-center flex-wrap"
        style="margin:0">
        Amount questions
      </p>
      <v-col cols="1">
        <v-text-field
          v-model="getTestResult.score.num_questions"
          :min="0"
          dense
          outlined
          hide-details
          type="number"
        />
      </v-col>
    </v-row>
    <v-row>
      <p
        class="d-flex align-content-center flex-wrap"
        style="margin:0">
        Your correct Answer
      </p>
      <v-col cols="1">
        <v-text-field
          v-model="getTestResult.score.true_answers"
          :min="0"
          dense
          outlined
          hide-details
          type="number"
        />
      </v-col>
    </v-row>
    <v-btn @click="onUpdateTestResult">Update</v-btn>
  </v-col>
  <v-dialog
    v-model="summary_dialog"
    max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ summary[summary.length - 1].interviewer_name }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              class="formcol">
              <h4>Agreement</h4>
              <v-select
                v-model="summary[summary.length - 1].is_pass"
                :items="agreement"
                item-value="value"
                item-text="name"
                solo
                dense
              />
            </v-col>
            <v-col cols="12">
              <h4>Reason</h4>
              <v-textarea
                v-model="summary[summary.length - 1].cmt"
                name="input-7-1"
                auto-grow
                rows="3"
                dense
                solo
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="blue darken-1"
          text
          @click="editInterview">edit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-row>
