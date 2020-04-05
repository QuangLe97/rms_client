<div v-show="profileTabs[1].active">
  <v-data-table
    v-model="sendMailSelect"
    :headers="schHeader"
    :items="getSchedule"
    :single-select="true"
    item-key="name_round"
    show-select
    @click:row="showSchedule">
    <template v-slot:item.time="{ item }">
      {{ item.date }}<br>
      {{ item.time_start }}-{{ item.time_end }}
    </template>
    <template v-slot:item.interviewer="{ item }">
                  <span
                    v-for="(inter,i) in item.interviewer"
                    :key = "i">
                    {{ inter }}<br>
                  </span>
    </template>
    <template v-slot:item.status="{ item }">
                  <span>
                    {{ item.status === 0 ? 'Not Confirm':null }}
                    {{ item.status === 1 ? 'Confirm':null }}
                    {{ item.status === 3 ? 'Refuse':null }}
                    {{ item.status === 4 ? 'Delay':null }}<br>
                    {{ item.is_sent_mail === 0 ? `Mail hasn't been sent`:null }}
                    {{ item.is_sent_mail === 1 ? 'Mail was sent':null }}
                    {{ item.is_sent_mail === 2 ? `Send mail was failed`:null }}
                  </span>
    </template>
  </v-data-table>
  <v-btn
    :disabled="sendMailSelect.length<1"
    color="primary"
    dark
    @click="sendMailDialog = true">
    Send Mail To Candidate
  </v-btn>
</div>
<template>
  <v-row justify="center">
    <v-dialog
      v-model="sendMailDialog"
      persistent
      max-width="600px">
      <v-card>
        <v-alert
          v-model="sendMailSuccess"
          type="success">
          send mail success
        </v-alert>
        <v-alert
          v-model="sendMailFail"
          type="error">
          something was wrong check it again
        </v-alert>
        <v-card-title>
          <span class="headline">SEND MAIL</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <!-- Subject -->
            <div>
              <div class="label">
                {{ $t('schedule.mailDialog.subject') }}
              </div>
              <div class="input input--normal">
                <v-text-field
                  v-model="mail.subject"
                  required
                  outlined
                />
              </div>
            </div>
            <!-- Content -->
            <div>
              <div class="label">
                {{ $t('schedule.mailDialog.content') }}
              </div>
              <div class="input input--long">
                <vue-editor
                  v-model="mail.content"/>
              </div>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="blue darken-1"
            text
            @click="closeSendMail">Close</v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="sendMailCandi">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<v-dialog
  v-model="schedule_dialog"
  max-width="700px">
  <v-card>
    <v-card-title>
      <span class="headline">EDIT SCHEDULE</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <div class="m-form-detail mt-5 form" >
          <div class="input-box">
            <div class="input-box__label">
              <h4>interview date</h4>
            </div>
            <div class="input-box__input">
              <v-menu
                ref="interview_menu"
                v-model="interview_menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                width="200px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="schTemplate.date"
                    readonly
                    outlined
                    dense
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="schTemplate.date"
                  :min="dateStartRecruit"
                  :max="dateEndRecruit"
                  no-title
                  scrollable
                  @change="$refs.interview_menu.save(schTemplate.date)"/>
              </v-menu>
            </div>
          </div>
          <div class="input-box">
            <div class="input-box__label">
              <h4>Time start</h4>
            </div>
            <div class="input-box__input">
              <v-menu
                ref="time_from_menu"
                v-model="time_from_menu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="schTemplate.time_start"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="schTemplate.time_start"
                    readonly
                    outlined
                    dense
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-if="time_from_menu"
                  v-model="schTemplate.time_start"
                  full-width
                  @click:minute="$refs.time_from_menu.save(schTemplate.time_start)"
                />
              </v-menu>
            </div>
          </div>
          <div class="input-box">
            <div class="input-box__label">
              <h4>Time end</h4>
            </div>
            <div class="input-box__input">
              <v-menu
                ref="time_to_menu"
                v-model="time_to_menu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="schTemplate.time_end"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="schTemplate.time_end"
                    readonly
                    outlined
                    dense
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-if="time_to_menu"
                  v-model="schTemplate.time_end"
                  full-width
                  @click:minute="$refs.time_to_menu.save(schTemplate.time_end)"
                />
              </v-menu>
            </div>
          </div>
          <div class="input-box">
            <div class="input-box__label">
              <h4>Place interview</h4>
            </div>
            <div class="input-box__input">
              <v-textarea
                v-model="schTemplate.place"
                outlined
                dense
                auto-grow
                rows="2"
                name="input-7-4"
              />
            </div>
          </div>
          <div class="input-box">
            <div class="input-box__label">
              <h4>interviewer</h4>
            </div>
            <div class="input-box__input">
              <v-select
                v-if="roundType === 'inter'"
                v-model="schTemplate.interviewer"
                :items="getAllInterViewer"
                outlined
                dense
                multiple
                chips
              />
              <v-select
                v-if="roundType === 'test'"
                v-model="schTemplate.interviewer"
                :items="getAllInterViewer"
                outlined
                dense
                chips
              />
            </div>
          </div>
        </div>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="blue darken-1"
        text
        @click="updateSchedule">edit</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
