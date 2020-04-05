<template>
  <v-dialog
    v-model="dialog_candidate"
    fullscreen>
    <v-row
      style="width: 100%;height: 100%;margin:0">
      <v-col
        cols="2"
        style="background-color: #4CAF50">
        <v-btn
          icon
          @click="closeDialog">
          <v-icon style="color:white">mdi-close</v-icon>
        </v-btn>
        <v-list
          nav
          dark
          color="success"
          class="pt-12 mt-10">
          <v-img
            v-if="resultTemple.photo === null"
            :src="require('@/assets/images/person.png')"
            class="ml-5"
            width="130px"
            height="130px"/>
          <v-img
            v-else
            :src="`${resultTemple.photo}`"
            class="ml-5"
            width="130px"
            height="130px"
            style="border-radius:50%"/>
          <div
            class="pt-10 pb-10"
            style="color:white">
            <span
              style="font-size:28px">
              {{ resultTemple.name_candidate }}
            </span><br>
            <v-select
              v-model="resultTemple.status"
              :items="statusList"
              item-text="name"
              item-value="value"
              dense/>
          </div>
          <v-list-item-group
            v-model="defaultSelected"
            color="green lighten-3">
            <v-list-item
              v-for="(tab, index) in profileTabs"
              :key="index"
              class="pl-5"
              link
              @click="viewTab (index)">
              <v-list-item-content>
                <v-list-item-title>{{ tab.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="transparent"
                  class="navbar__nav-box__navlink"
                  style="box-shadow: none"
                  v-on="on"
                >
                  Training
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in dropdown"
                  :key="index"
                  @click="dropdownView(index)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col
        cols="10"
        style="background-color:white">
        <v-row>
          <v-col
            style="background-color: white">
            <!--            profile infomation-->
<!--              <profile-infor/>-->
            <v-form
              v-show="profileTabs[0].active">
              <v-container fluid>
                <h2 class="text-center">Profile Information</h2>
                <v-row>
                  <v-col
                    cols="6"
                    style="border: 1px solid #BDBDBD; border-radius:5px">
                    <h3>Presonal</h3>
                    <v-divider/>
                    <v-row>
                      <!-- name -->
                      <v-col cols="12">
                        <v-row>
                          <v-col
                            cols="2"
                            class="d-flex align-content-center flex-wrap">
                            <h4>Name</h4>
                          </v-col>
                          <v-col cols="10">
                            <v-text-field
                              v-model="resultTemple.name_candidate"
                              :hide-details="true"
                              outlined
                              dense
                            />
                          </v-col>
                        </v-row>

                      </v-col>
                      <!-- date of birth -->
                      <v-col cols="6">
                        <v-row>
                          <v-col
                            cols="4"
                            class="d-flex align-content-center flex-wrap">
                            <h4>Date of birth</h4>
                          </v-col>
                          <v-col cols="8">
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
                                  v-model="resultTemple.birthday"
                                  :hide-details="true"
                                  outlined
                                  readonly
                                  dense
                                  v-on="on"
                                />
                              </template>
                              <v-date-picker
                                v-model="resultTemple.birthday"
                                :max="new Date().toISOString().substr(0, 10)"
                                no-title
                                scrollable
                                @change="$refs.dob_menu.save(resultTemple.birthday)"/>
                            </v-menu>
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- gender -->
                      <v-col cols="6">
                        <v-row>
                          <v-col
                            cols="4"
                            class="d-flex align-content-center flex-wrap">
                            <h4>Gender</h4>
                          </v-col>
                          <v-col
                            cols="8">
                            <v-radio-group
                              v-model="resultTemple.gender"
                              :hide-details="true"
                              style="margin-top:0;"
                              row>
                              <v-radio
                                :value="1"
                                label="Male"/>
                              <v-radio
                                :value="0"
                                label="Female"/>
                            </v-radio-group>
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- email -->
                      <v-col cols="6">
                        <v-row>
                          <v-col
                            cols="4"
                            class="d-flex align-content-center flex-wrap">
                            <h4>Email</h4>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="resultTemple.email"
                              :hide-details="true"
                              outlined
                              dense
                            />
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- phone -->
                      <v-col cols="6">
                        <v-row>
                          <v-col
                            cols="4"
                            class="d-flex align-content-center flex-wrap">
                            <h4>Phone</h4>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="resultTemple.phone"
                              :hide-details="true"
                              outlined
                              dense
                            />
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- address -->
                      <v-col cols="12">
                        <v-row>
                          <v-col
                            cols="2"
                            class="d-flex align-content-center flex-wrap">
                            <h4>Address</h4>
                          </v-col>
                          <v-col cols="10">
                            <v-textarea
                              v-model="resultTemple.address"
                              :hide-details="true"
                              name="input-7-1"
                              auto-grow
                              rows="2"
                              dense
                              outlined/>
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- identify code -->
                      <v-col cols="6">
                        <v-row>
                          <v-col
                            cols="4"
                            class="d-flex align-content-center flex-wrap">
                            <h4>Identify code</h4>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="resultTemple.cmnd"
                              :hide-details="true"
                              outlined
                              dense
                            />
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- nation -->
                      <v-col cols="6">
                        <v-row>
                          <v-col
                            cols="4"
                            class="d-flex align-content-center flex-wrap">
                            <h4>Nation</h4>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="resultTemple.nationality"
                              :hide-details="true"
                              outlined
                              dense
                            />
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- start working date -->
                      <v-col cols="6">
                        <v-row>
                          <v-col
                            cols="4"
                            class="d-flex align-content-center flex-wrap">
                            <h4>Start working date</h4>
                          </v-col>
                          <v-col cols="8">
                            <v-menu
                              ref="swd_menu"
                              v-model="swd_menu"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-y
                              width="290px"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="resultTemple.working_day"
                                  :hide-details="true"
                                  label="start working date"
                                  readonly
                                  outlined
                                  dense
                                  v-on="on"
                                />
                              </template>
                              <v-date-picker
                                v-model="resultTemple.working_day"
                                :max="new Date().toISOString().substr(0, 10)"
                                no-title
                                scrollable
                                @change="$refs.swd_menu.save(resultTemple.working_day)"/>
                            </v-menu>
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- expected salary -->
                      <v-col cols="6">
                        <v-row>
                          <v-col
                            cols="4"
                            class="d-flex align-content-center flex-wrap">
                            <h4>Expected salary</h4>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="resultTemple.recommendations_salary"
                              :hide-details="true"
                              label="money"
                              suffix="$"
                              type="number"
                              min="300"
                              step = "1"
                              outlined
                              dense
                            />
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- Marital status -->
                      <v-col cols="6">
                        <v-row>
                          <v-col
                            cols="4"
                            class="d-flex align-content-center flex-wrap">
                            <h4>Marital status</h4>
                          </v-col>
                          <v-col cols="8">
                            <v-select
                              v-model="resultTemple.marital_status"
                              :items="marital"
                              :hide-details="true"
                              item-text="name"
                              item-value="value"
                              outlined
                              dense/>
                          </v-col>
                        </v-row>

                      </v-col>
                    </v-row>
                    <h3 class="mt-12">Academic</h3>
                    <v-divider/>
                    <v-row>
                      <!-- study level -->
                      <v-col cols="6">
                        <v-row>
                          <v-col
                            cols="4"
                            class="d-flex align-content-center flex-wrap">
                            <h4>Study Level</h4>
                          </v-col>
                          <v-col cols="8">
                            <v-select
                              v-model="resultTemple.school_lever"
                              :items="studyLevel"
                              :hide-details="true"
                              item-text="name"
                              item-value="value"
                              outlined
                              dense/>
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- school name -->
                      <v-col cols="6">
                        <v-row>
                          <v-col
                            cols="4"
                            class="d-flex align-content-center flex-wrap">
                            <h4>School</h4>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="resultTemple.school_name"
                              :hide-details="true"
                              outlined
                              dense/>
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- school type -->
                      <v-col cols="6">
                        <v-row>
                          <v-col
                            cols="4"
                            class="d-flex align-content-center flex-wrap">
                            <h4>School type</h4>
                          </v-col>
                          <v-col cols="8">
                            <v-select
                              v-model="resultTemple.school_type"
                              :items="schoolType"
                              :hide-details="true"
                              outlined
                              dense/>
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- GPA -->
                      <v-col cols="6">
                        <v-row>
                          <v-col
                            cols="4"
                            class="d-flex align-content-center flex-wrap">
                            <h4>GPA</h4>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="resultTemple.gpa"
                              :hide-details="true"
                              type="number"
                              min="5.0"
                              max="10.0"
                              step="0.01"
                              outlined
                              dense/>
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- major -->
                      <v-col cols="6">
                        <v-row>
                          <v-col
                            cols="4"
                            class="d-flex align-content-center flex-wrap">
                            <h4>Major</h4>
                          </v-col>
                          <v-col cols="8">
                            <v-combobox
                              v-model="resultTemple.major"
                              :items="popularMajor"
                              :hide-details="true"
                              outlined
                              dense/>
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- graduated -->
                      <v-col cols="6">
                        <v-checkbox
                          v-model="resultTemple.is_graduated"
                          :value="1"
                          label="Graduated"/>
                      </v-col>
                      <!-- study mode -->
                      <v-col cols="6">
                        <v-row>
                          <v-col
                            cols="4"
                            class="d-flex align-content-center flex-wrap">
                            <h4>Study mode</h4>
                          </v-col>
                          <v-col cols="8">
                            <v-select
                              v-model="resultTemple.education_program"
                              :items="studyMode"
                              :hide-details="true"
                              item-value="value"
                              item-text="name"
                              outlined
                              dense/>
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- ranking -->
                      <v-col cols="6">
                        <v-row>
                          <v-col
                            cols="4"
                            class="d-flex align-content-center flex-wrap">
                            <h4>Ranking</h4>
                          </v-col>
                          <v-col cols="8">
                            <v-select
                              v-model="resultTemple.education_rank"
                              :items="rank"
                              :hide-details="true"
                              item-text="name"
                              item-value="value"
                              outlined
                              dense/>
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- certifications -->
                      <v-col
                        cols="12"
                        style="padding-top:0;padding-bottom:0">
                        <v-row>
                          <v-col
                            cols="12"
                            class="formCol"
                            style="padding-bottom:0">
                            <v-row>
                              <v-col
                                cols="2"
                                class="d-flex align-content-center flex-wrap">
                                <h4>Certificate</h4>
                              </v-col>
                              <v-col cols="10">
                                <v-text-field
                                  v-model="certifiItem"
                                  :hide-details="true"
                                  full-width
                                  outlined
                                  dense
                                  @keyup="addNew"/>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-col cols="2"/>
                          <v-col cols="10">
                            <v-row>
                              <v-col
                                v-for="(item, i) in resultTemple.certifications"
                                :key="i"
                                class="shrink"
                                style="padding-top:0;">
                                <v-chip
                                  close
                                  @click:close="resultTemple.certifications.splice(i, 1)">
                                  {{ item }}
                                </v-chip>
                              </v-col>
                              <v-col
                                style="padding-top:0">
                                <v-btn
                                  x-small
                                  color="warning"
                                  @click="updateCertificate">
                                  Update
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-col>
                      <div
                        style="width:100%; background-color:#757575; color:#E0E0E0; font-size:12px"
                        class="text-center">
                        in case the candidate undergraduate, fill in the form below
                      </div >
                      <!-- reason -->
                      <v-col cols="12">
                        <v-row>
                          <v-col
                            cols="2"
                            class="d-flex align-content-center flex-wrap">
                            <h4>Reason</h4>
                          </v-col>
                          <v-col cols="10">
                            <v-textarea
                              v-model="resultTemple.others_reason"
                              :hide-details="true"
                              name="input-7-1"
                              auto-grow
                              outlined
                              rows="3"
                              dense/>
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- note -->
                      <v-col cols="12">
                        <v-row>
                          <v-col
                            cols="2"
                            class="d-flex align-content-center flex-wrap">
                            <h4>Note</h4>
                          </v-col>
                          <v-col cols="10">
                            <v-textarea
                              v-model="resultTemple.note"
                              :hide-details="true"
                              name="input-7-1"
                              auto-grow
                              rows="2"
                              dense
                              outlined/>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-btn
                      color="warning"
                      class="mr-4"
                      @click="updateCandidate"
                    >
                      Edit
                    </v-btn>
                  </v-col>
                  <!-- pdf -->
                  <v-col cols="6">
                    <embed
                      :src="resultTemple.cv"
                      :key="resultTemple.id"
                      style="height: 80vh"
                      width="100%">
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <!-- schedule -->
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
            <!-- interview & test -->
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
          </v-col>
          <!-- file info -->
          <file-infor/>
          <!--                          <v-data-table-->
          <!--                            v-show="profileTabs[3].active"-->
          <!--                            :headers="fiInHeader"-->
          <!--                            :items="fiInExample">-->
          <!--                            <template v-slot:item.cade>-->
          <!--                              <v-btn @click="viewCandidate">View</v-btn>-->
          <!--                            </template>-->
          <!--                          </v-data-table>-->

        </v-row>
        <v-form
          v-show="dropdown[0].active"
          v-model="state">
          <v-container fluid>
            <v-row>
              <v-col
                cols="12"
                md="12"
              >
                <v-tabs
                  v-model="tabs"
                  slider-size="48"
                  background-color="rgba(255, 255, 255)"
                  grow
                >
                  <v-tab
                    v-for="i in 3"
                    :key="i"
                    style="
                        height: 100%;
                        background-color: rgb(76, 175, 80); margin: 0px 12px"/>

                </v-tabs>
                <v-tabs-items v-model="tabs">
                  <v-tab-item>
                    <v-card flat>
                      <br>
                      <h3 class="text-center heading">BẢNG ĐÁNH GIÁ THỰC HIỆN CÔNG VIỆC TẠI FUJINET OFFSHORE ACADEMY  </h3>
                      <v-card-text>
                        <v-row>
                          <div class="box-heading__title mt-2"><h3>Thông tin chung</h3></div>
                          <v-btn
                            class="ml-5 btn--primary v-btn v-btn--contained theme--light v-size--small"
                            fab
                            small
                            @click="dialogTotal = true">
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </v-row>
                        <v-dialog
                          v-model="dialogTotal"
                          rounded
                          persistent
                          max-width="350px">
                          <v-card>
                            <v-card-title class="green">
                              <span class="headline">Thông tin chung</span>
                            </v-card-title>
                            <v-divider/>
                            <v-card-text>
                              <v-container>
                                <div
                                  class="m-form-detail mt-5 form"
                                >
                                  <div>
                                    <div class="label">
                                      Người đánh giá
                                    </div>
                                    <div class="input input--long">
                                      <v-select
                                        v-model="supervisor"
                                        :items="getSupervisorsResult"
                                        item-text="username"
                                        dense
                                        rounded
                                        solo
                                        return-object
                                        @click="getSuper"
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <div class="label">
                                      Thời gian bắt đầu
                                    </div>
                                    <div class="input input--long">
                                      <v-menu
                                        ref="menu"
                                        v-model="menu1"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        :return-value.sync="time"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="290px"
                                      >
                                        <template v-slot:activator="{ on }">

                                          <v-text-field
                                            v-model="period_from"
                                            clearable
                                            label="YYYY-MM-DD"
                                            solo
                                            rounded
                                            readonly
                                            dense
                                            style="width: auto"
                                            @click:clear="date = null"
                                            v-on="on"/>

                                        </template>
                                        <v-date-picker
                                          ref="picker"
                                          v-model="period_from"
                                          :max="period_to"
                                          @input="menu1 = false"
                                        />
                                      </v-menu>
                                    </div>
                                  </div>
                                  <div>
                                    <div class="label">
                                      Thời gian kết thúc
                                    </div>
                                    <div class="input input--long">
                                      <v-menu
                                        ref="menu"
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        :return-value.sync="time"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="290px"
                                      >
                                        <template v-slot:activator="{ on }">
                                          <v-text-field
                                            v-model="period_to"
                                            clearable
                                            label="YYYY-MM-DD"
                                            solo
                                            rounded
                                            readonly
                                            dense
                                            style="width: auto"
                                            @click:clear="date = null"
                                            v-on="on"/>
                                        </template>
                                        <v-date-picker
                                          ref="picker"
                                          v-model="period_to"
                                          :min="period_from"
                                          @input="menu2 = false"
                                        />
                                      </v-menu>
                                    </div>
                                  </div>
                                </div>
                              </v-container>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer/>
                              <v-btn
                                class="btn btn--secondary v-btn--contained theme--light v-size--small"
                                text
                                rounded
                                @click="dialogTotal = false">Close</v-btn>
                              <v-btn
                                :loading="isLoadingSaveBtn"
                                class="btn btn--primary v-btn--contained theme--light v-size--small"
                                text
                                rounded
                                @click="onSaveTotal()">Save</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <v-row>&nbsp;&nbsp;
                          <v-col cols="3">
                            <v-text class="font-weight-bold">Người đánh giá: </v-text>
                          </v-col>
                        </v-row>
                        &emsp;&emsp;&emsp;{{ itemdg }}

                        <v-row>&nbsp;&nbsp;
                          <v-col cols="8">
                            <v-text class="font-weight-bold">Thời gian đánh giá:</v-text>
                          </v-col>
                        </v-row>
                        <v-row> &emsp;&emsp;&emsp;
                          <v-col cols="3"> Thời gian bắt đầu:
                            <v-text>{{ getEvaluateResult.time_start }}</v-text>
                          </v-col>
                          <v-col cols="3">
                            Thời gian kết thúc:
                            <v-text>{{ getEvaluateResult.time_end }} </v-text>
                          </v-col>
                        </v-row>
                        <v-row>
                          <div class="box-heading__title mt-2"><h3>Nội dung công việc</h3></div>
                          <v-btn
                            class="ml-5 btn--primary v-btn v-btn--contained theme--light v-size--small"
                            fab
                            small
                            @click="dialog1 = true">
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </v-row>
                        <v-row>
                          <v-row dense>
                            <v-col
                              v-for="(value, key) in getItemContents"
                              :key="key"
                              cols="12"
                            >
                              <small>
                                <v-card-subtitle
                                  class="heading--small"
                                  v-text="key"
                                />
                                <v-card-text
                                  small
                                  v-text="value"/>
                              </small>
                            </v-col>
                          </v-row>
                        </v-row>
                        <v-row>
                          <div class="box">
                            <div class="box-heading__title mt-2"><h3>TỔNG KẾT</h3></div>
                            <v-data-table
                              :headers="headers"
                              :items="itemsTable"
                              hide-default-footer
                              class="elevation-1 "
                              style="max-height: 770px; overflow-y: auto ; overflow-x: visible">

                              <template v-slot:body.append>
                                <tr>
                                  <td style="text-align: center"> <h3>Điểm trung bình : {{ itemsTableAverage }} </h3></td>
                                  <td/>
                                  <td colspan="4"/>
                                </tr>
                              </template>
                            </v-data-table>
                          </div>
                        </v-row>
                        <v-row class="mt-5">
                          <div class=" box-heading__title mt-2"><h3>NHẬN XÉT</h3></div>
                          <v-btn
                            class="ml-5  btn--primary v-btn v-btn--contained theme--light v-size--small"
                            fab
                            small
                            @click="dialog2 = true"
                          >
                            <v-icon >mdi-plus</v-icon>
                          </v-btn>
                        </v-row>
                        <v-row>
                          <v-row dense>
                            <v-col
                              v-for="(value, key) in getItemComment"
                              :key="key"
                              cols="12"
                            >
                              <small>
                                <v-card-subtitle
                                  class="heading--small"
                                  v-text="key"
                                />
                                <v-card-text
                                  small
                                  v-text="value"/>
                              </small>
                            </v-col>
                          </v-row>
                        </v-row>
                        <v-row class="mt-3">
                          <div class="mr-5">*Note: </div>
                          <v-textarea
                            v-model="noteTrain"
                            outlined
                            class="mr-3"
                            clearable
                            type="text"/>
                        </v-row>
                        <div class="text-right mb-2">
                          <v-btn
                            :loading="isLoadingSaveBtn"
                            rounded
                            class="btn--primary v-btn v-btn--contained theme--light v-size--small"
                            @click="saveAll">Save</v-btn>
                        </div>
                        <!--Dialog add comment-->
                        <v-dialog
                          v-model="dialog2"
                          persistent
                          max-width="600px">
                          <v-card>
                            <v-card-title class="green">
                              <span class="headline">Nội dung công việc nhận xét</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container
                                style="height: 300px; overflow: auto"
                                rounded>
                                <v-row
                                  dense
                                  rounded>
                                  <v-col
                                    v-for="(value, key) in getItemComment"
                                    :key="key"
                                    rounded
                                    cols="12"
                                  >
                                    <v-card
                                      rounded
                                    >
                                      <div class="d-flex flex-no-wrap justify-space-between">
                                        <div>
                                          <v-card-title
                                            class="headline"
                                            v-text="key"
                                          />
                                          <v-card-subtitle v-text="value"/>
                                        </div>
                                        <v-btn
                                          class="ma-2"
                                          text
                                          icon
                                          color="red lighten-2"
                                          @click="deleteItemComment(key)">
                                          <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                      </div>
                                    </v-card>
                                  </v-col>
                                </v-row>
                                <v-row
                                  align="center"
                                  justify="center"
                                  style="height: 300px"
                                />
                              </v-container>
                              <v-divider/>
                              <v-container>
                                <v-row>
                                  <v-col cols="10">
                                    <small>
                                      <v-text-field
                                        v-model="editComment.title"
                                        label="Tiêu đề công việc"/>
                                    </small>
                                  </v-col>
                                  <v-col cols="2">
                                    <v-btn
                                      class="btn btn--primary v-btn--contained theme--light v-size--small"
                                      text
                                      small
                                      fab
                                      @click="addComment"><v-icon >mdi-plus</v-icon></v-btn>
                                  </v-col>
                                  <v-col cols="12">
                                    <small>
                                      <v-textarea
                                        v-model="editComment.comment"
                                        outlined
                                        rounded
                                        label="Nhận xét"/>
                                    </small>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer/>
                              <v-btn
                                class="btn btn--secondary v-btn--contained theme--light v-size--small"
                                text
                                rounded
                                @click="dialog2 = false">Close</v-btn>
                              <v-btn
                                class="btn btn--primary v-btn--contained theme--light v-size--small"
                                text
                                rounded
                                @click="saveComment">Save</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>

                        <!--Dialog add content-->
                        <v-dialog
                          v-model="dialog1"
                          persistent
                          max-width="600px">
                          <v-card>
                            <v-card-title class="green">
                              <span class="headline">Nội dung công việc </span>
                            </v-card-title>
                            <v-card-text>
                              <v-container style="height: 300px; overflow: auto; ">
                                <v-row dense>
                                  <v-col
                                    v-for="(value, key) in getItemContents"
                                    :key="key"
                                    cols="12"
                                  >
                                    <v-card
                                      rounded
                                    >
                                      <div class="d-flex flex-no-wrap justify-space-between">
                                        <div>
                                          <small>
                                            <v-card-title
                                              v-text="key"
                                            />
                                            <v-card-subtitle v-text="value"/>
                                          </small>
                                        </div>
                                        <v-btn
                                          class="ma-2"
                                          text
                                          icon
                                          color="red lighten-2"
                                          @click="deleteItemContent(key)">
                                          <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                      </div>
                                    </v-card>
                                  </v-col>
                                </v-row>
                                <v-row
                                  align="center"
                                  justify="center"
                                  style="height: 300px"
                                />
                              </v-container>
                              <v-divider/>
                              <v-container>
                                <v-row>
                                  <v-col cols="10">
                                    <v-text-field
                                      v-model="editContent.title"
                                      class="headline"
                                      label="Tiêu đề công việc"/>
                                  </v-col>
                                  <v-col cols="2">
                                    <v-btn
                                      class="btn btn--primary v-btn--contained theme--light v-size--small"
                                      text
                                      small
                                      fab
                                      @click="addContent"><v-icon >mdi-plus</v-icon></v-btn>
                                  </v-col>
                                  <v-col cols="12">
                                    <v-textarea
                                      v-model="editContent.content"
                                      outlined
                                      rounded
                                      label="Nội dung công việc"/>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer/>
                              <v-btn
                                class="btn btn--secondary v-btn--contained theme--light v-size--small"
                                text
                                rounded
                                @click="dialog1 = false">Close</v-btn>
                              <v-btn
                                class="btn btn--primary v-btn--contained theme--light v-size--small"
                                text
                                rounded
                                @click="saveContent">Save</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <br><br>
                      <v-card-title class="headline">ĐÁNH GIÁ NĂNG LỰC (theo mô hình ASK)</v-card-title>
                      <v-card-text>
                        <h4>Đánh giá theo thang điểm 10.</h4>
                        <h4>- Rất tốt: >= 9 điểm - Trung bình: >= 5 điểm</h4>
                        <h4>- Tốt: >= 8 điểm - Yếu: >= 4 điểm, &#60; 5 điểm</h4>
                        <h4>- Khá: >= 6.5 điểm - Kém: &#60; 4 điểm </h4>
                        <br>
                        <v-divider/>
                        <!--Knowledge-->
                        <v-row>
                          <v-col
                            cols="3"
                            class="mt-3"><h4>Kiến thức chuyên môn (Knowledge)</h4></v-col>
                          <v-col cols="2">
                            <v-btn
                              class=" btn btn--primary "
                              fab
                              small
                              @click="addTableK">
                              <v-icon >mdi-plus</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                        <v-data-table
                          :headers="headerTest"
                          :items="itemsTableK"
                          hide-default-footer
                          item-key="name"
                          class="elevation-1"
                        >
                          <template v-slot:item.action="{ item }">
                            <v-icon
                              small
                              class="mr-2"
                              @click="editItemTable(item)"
                            >
                              edit
                            </v-icon>
                            <v-icon
                              small
                              class="mr-2"
                              @click="deleteItemTable(item)"
                            >
                              close
                            </v-icon>
                          </template>
                          <template v-slot:body.append>
                            <tr>
                              <td style="text-align: center"> <h3>Điểm trung bình : {{ itemsTableAverageK }} </h3></td>
                              <td/>
                              <td colspan="4"/>
                            </tr>
                          </template>
                        </v-data-table>
                        <br>
                        <v-divider/>
                        <!--Skill-->

                        <v-row>
                          <v-col
                            cols="3"
                            class="mt-3"><h4>Kỹ năng (Skill)</h4></v-col>
                          <v-col cols="2">
                            <v-btn
                              class=" btn btn--primary "
                              fab
                              small>
                              <v-icon >mdi-plus</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                        <v-data-table
                          :headers="headerTest"
                          :items="itemsTableS"
                          hide-default-footer
                          item-key="name"
                          class="elevation-1"
                        >
                          <template v-slot:item.action="{ item }">
                            <v-icon
                              small
                              class="mr-2"
                              @click="editItemTable(item)"
                            >
                              edit
                            </v-icon>
                            <v-icon
                              small
                              class="mr-2"
                              @click="deleteItemTable(item)"
                            >
                              close
                            </v-icon>
                          </template>
                          <template v-slot:body.append>
                            <tr>
                              <td style="text-align: center"> <h3>Điểm trung bình : {{ itemsTableAverageS }} </h3></td>
                              <td/>
                              <td colspan="4"/>
                            </tr>
                          </template>
                        </v-data-table>
                        <br>
                        <v-divider/>
                        <!--Attitude-->

                        <v-row>
                          <v-col
                            cols="3"
                            class="mt-3"><h4>Thái độ/ Hành vi (Attitude)</h4></v-col>
                          <v-col cols="2">
                            <v-btn
                              class=" btn btn--primary "
                              fab
                              small>
                              <v-icon >mdi-plus</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                        <v-data-table
                          :headers="headerTest"
                          :items="itemsTableA"
                          hide-default-footer
                          item-key="name"
                          class="elevation-1"
                        >
                          <template v-slot:item.action="{ item }">
                            <v-icon
                              small
                              class="mr-2"
                              @click="editItemTable(item)"
                            >
                              edit
                            </v-icon>
                            <v-icon
                              small
                              class="mr-2"
                              @click="deleteItemTable(item)"
                            >
                              close
                            </v-icon>
                          </template>
                          <template v-slot:body.append>
                            <tr>
                              <td style="text-align: center"> <h3>Điểm trung binh : {{ itemsTableAverageA }} </h3></td>
                              <td/>
                              <td colspan="4"/>
                            </tr>
                          </template>
                        </v-data-table>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <br><br>
                      <v-card-title class="headline">ĐÁNH GIÁ BÀI TEST CUỐI KHÓA</v-card-title>
                      <v-card-text>
                        <v-row>
                          <v-col
                            cols="3"
                            class="mt-3"><h4>Những nội dung đánh giá khác</h4></v-col>
                          <v-col cols="2">
                            <v-btn
                              class=" btn btn--primary "
                              fab
                              small
                              @click="addTableT">
                              <v-icon >mdi-plus</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                        <!--dialog insert table and edit-->
                        <v-dialog
                          v-model="dialogTable"
                          persistent
                          max-width="400px">
                          <v-card>
                            <v-card-title class="green">
                              <span class="headline">{{ this.dialogTitle }}</span>
                            </v-card-title>
                            <v-divider/>
                            <v-card-text>
                              <v-container>
                                <v-text>Yêu cầu</v-text>
                                <v-textarea
                                  v-model="requireTable"
                                  rounded
                                  rows="3"
                                  row-height="30"
                                  solo/>
                                <v-text>Trọng số</v-text>
                                <v-text-field
                                  v-model="heightTable"
                                  rounded
                                  solo/>
                                <v-text>Đánh giá</v-text>
                                <v-text-field
                                  v-model="estimateTable"
                                  rounded
                                  solo/>
                                <v-text>Nhận xét</v-text>
                                <v-textarea
                                  v-model="commentTable"
                                  rounded
                                  rows="3"
                                  row-height="30"
                                  solo/>
                              </v-container>
                            </v-card-text>
                            <v-card-actions class="mr-6">
                              <v-spacer/>
                              <v-btn
                                class="btn btn--secondary v-btn--contained theme--light v-size--small"
                                text
                                rounded
                                @click="dialogTable = false">Close</v-btn>
                              <v-btn
                                class="btn btn--primary v-btn--contained theme--light v-size--small"
                                text
                                rounded
                                @click="saveCd">Save</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <v-data-table
                          :headers="headerTest"
                          :items="itemsTableT"
                          hide-default-footer
                          item-key="name"
                          class="elevation-1"
                        >
                          <template v-slot:item.action="{ item }">
                            <v-icon
                              small
                              class="mr-2"
                              @click="editItemTable(item)"
                            >
                              edit
                            </v-icon>
                            <v-icon
                              small
                              class="mr-2"
                              @click="deleteItemTable(item)"
                            >
                              close
                            </v-icon>
                          </template>
                          <template v-slot:body.append>
                            <tr>
                              <td style="text-align: center"> <h3>Điểm trung binh : {{ itemsTableAverageT }} </h3></td>
                              <td/>
                              <td colspan="4"/>
                            </tr>
                          </template>
                        </v-data-table>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </v-col>
            </v-row>

          </v-container>
        </v-form>
      </v-col>
    </v-row>

  </v-dialog>
</template>
<script>
import FileInfor from './FileInfomation.vue'
import ProfileInfor from './Profile'
import { mapGetters, mapActions } from 'vuex'
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor,
    FileInfor: FileInfor,
    ProfileInfor: ProfileInfor
  },
  props: {
    candidate: {
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
      dialog_candidate: false,
      resultTemple: {
        address: null,
        birthday: null,
        certifications: [],
        cmnd: null,
        created_at: null,
        cv: null,
        cv_raw: null,
        cv_submitted_time: null,
        education_program: null,
        education_rank: null,
        email: null,
        existed: [],
        expected_salary: null,
        facebook: null,
        gender: null,
        gpa: null,
        id: null,
        interview: [],
        interview_accept: null,
        interview_comment: null,
        is_accepted: null,
        is_graduated: null,
        major: null,
        marital_status: null,
        name_candidate: null,
        nationality: null,
        note: null,
        num_course_owed: null,
        others_reason: null,
        period_recruit: null,
        phone: null,
        photo: '',
        recommendations_salary: null,
        reference_person_code: null,
        school_lever: null,
        school_name: null,
        school_type: null,
        seasion: null,
        status: null,
        tech: null
      },
      // candidate profile
      profileTabs: [
        {
          name: 'Profile Information',
          active: true
        },
        {
          name: 'Schedule',
          active: false
        },
        {
          name: 'Interview & Test',
          active: false
        },
        {
          name: 'File Information',
          active: false
        }

      ],
      dropdown: [
        {
          title: 'FOA',
          active: false
        },
        {
          title: 'DEPT',
          active: false
        }
      ],
      // ---------------------------detail candidate/personal
      // ----DoB
      dob_menu: false,
      // start working date
      swd_menu: false,
      // ----marital status
      marital: [
        {
          name: 'single',
          value: 0
        },
        {
          name: 'married',
          value: 1
        }
      ],
      // ---------------------------detail candidate/education
      // ----Level
      studyLevel: [
        {
          name: 'College',
          value: 1
        },
        {
          name: 'Bachelor',
          value: 2
        },
        {
          name: 'Master',
          value: 3
        },
        {
          name: 'Doctor',
          value: 4
        }
      ],
      // ----school type
      schoolType: [1, 2, 3],
      // ----Major
      popularMajor: [
        'COMPUTER VISION AND ROBOTICS',
        'KNOWLEDGE ENGINEERING',
        'COMPUTER SCIENCES',
        'SOFTWARE ENGINEERING',
        'COMPUTER NETWORKS AND TELECOMMUNICATION',
        'INFORMATION SYSTEM ENGINEERING'
      ],
      // ----study mode
      studyMode: [
        {
          name: 'full-time',
          value: 1
        },
        {
          name: 'part-time',
          value: 2
        }
      ],
      // ----capacity
      rank: [
        {
          name: 'good',
          value: 1
        },
        {
          name: 'excellent',
          value: 2
        },
        {
          name: 'average',
          value: 3
        },
        {
          name: 'others',
          value: 0
        }
      ],
      // ----certificate
      certifiItem: null,
      // ----expect to graduate
      etg_menu: false,
      // ---------------------------detail candidate/schedule
      schTemplate: {
        name_round: null,
        date: null,
        time_start: null,
        time_end: null,
        place: null,
        status: null,
        is_sent_mail: null,
        interviewer: []
      },
      schHeader: [
        {
          text: 'Round',
          value: 'name_round',
          sortable: false,
          align: 'center'
        },
        { text: 'Time',
          sortable: false,
          value: 'time',
          align: 'center'
        },
        { text: 'Place',
          value: 'place',
          align: 'center',
          sortable: false
        },
        { text: 'Interviewer',
          sortable: false,
          value: 'interviewer',
          align: 'center'
        },
        {
          text: 'Status',
          sortable: false,
          value: 'status',
          align: 'center'
        }
      ],
      statusList: [
        {
          name: 'PREQUALIFICATION',
          value: 5
        },
        {
          name: 'TRIAL STAFF',
          value: 6
        },
        {
          name: 'OFFICAL STAFF',
          value: 7
        },
        {
          name: 'FIRED',
          value: 8
        },
        {
          name: 'RESIGNED',
          value: 9
        }
      ],
      schedule_dialog: false,
      interview_menu: false,
      time_from_menu: false,
      time_to_menu: false,
      // ---------------------------detail candidate/file info
      fiInHeader: [
        {
          text: 'SESSION',
          value: 'session',
          sortable: false
        },
        {
          text: 'CV UPLOADED TIME',
          value: 'cvUpTime',
          sortable: false
        },
        {
          text: 'CANDIDATE DETAIL',
          value: 'cade',
          sortable: false
        }
      ],
      fiInExample: [
        {
          session: 'spring sesson',
          cvUpTime: '2020-01-10'
        },
        {
          session: 'spring sesson',
          cvUpTime: '2020-02-10'
        },
        {
          session: 'spring sesson',
          cvUpTime: '2020-03-01'
        }
      ],
      // ---------------------------detail candidate/Interview

      summary: [
        {
          interviewer_name: 'Leader A',
          is_pass: 1,
          cmt: 'our company need him'
        },
        {
          interviewer_name: 'Leader B',
          is_pass: 1,
          cmt: 'our company need him'
        },
        {
          interviewer_name: 'Leader C',
          is_pass: 1,
          cmt: 'our company need him'
        },
        {
          interviewer_name: 'Leader D',
          is_pass: 1,
          cmt: 'our company need him'
        },
        {
          interviewer_name: 'Manager Of Leader',
          is_pass: 0,
          cmt: `ugly face i don't like`
        }
      ],
      topicShowAll: [],
      groupShowAll: [],
      summary_dialog: false,
      agreement: [
        {
          name: 'yes',
          value: 1
        },
        {
          name: 'no',
          value: 0
        }
      ],
      roundName: '',
      dateStartRecruit: null,
      dateEndRecruit: null,
      sendMailDialog: false,
      mail: {
        subject: '',
        content: ''
      },
      sendMailSelect: [],
      tabs: null,
      headerTest: [
        {
          text: 'Yêu cầu',
          value: 'require'
        },
        { text: 'Trọng số',
          value: 'weight',
          align: 'center'
        },
        { text: 'Đánh giá',
          value: 'score',
          align: 'center'
        },
        { text: 'Kết quả',
          value: 'result',
          align: 'center'
        },
        {
          text: 'Nhận xét/Giải thích lý do',
          value: 'comment',
          align: 'center'
        },
        {
          text: 'Action',
          value: 'action',
          align: 'center'
        }
      ],
      defaultSelected: 0,
      sendMailSuccess: false,
      sendMailFail: false,
      roundType: null,
      time: null,
      menu2: false,
      menu1: false,
      period_from: '',
      period_to: '',
      dialog2: false,
      dialog1: false,
      dialogTotal: false,
      bordered: true,
      supervisor: '',
      noteTrain: '',
      headers: [
        {text: 'Yêu cầu ', value: 'require'},
        {text: 'Trọng số', value: 'weight', align: 'center'},
        {text: 'Đánh giá', value: 'score', align: 'center'},
        {text: 'Kết quả', value: 'result', align: 'center'}
      ],
      editContent: {
        title: '',
        content: ''
      },
      editComment: {
        title: '',
        comment: ''
      },
      defaultContent: {
        title: '',
        content: ''
      },
      defaultComment: {
        title: '',
        comment: ''
      },
      isLoadingSaveBtn: false,
      dialogTable: false,
      dialogTitle: '',
      requireTable: '',
      heightTable: '',
      estimateTable: '',
      commentTable: ''
    }
  },
  computed: {

    ...mapGetters('can_management', ['getSummaryResult', 'getTopicResult', 'getCandidates', 'getSessions',
      'getNextPage', 'getPrevPage', 'getSchedule', 'getGroupResult', 'getAllInterViewer', 'getEvaluateResult', 'getSupervisorsResult', 'getItemContents', 'getItemComment', 'getTestResult']),

    roundInterview () {
      let round = []
      for (let i = 0; i < this.getSessions.length; i++) {
        for (let j = 0; j < this.getSessions[i].period_recruits.length; j++) {
          if (this.getSessions[i].period_recruits[j].id === this.resultTemple.period_recruit) {
            round = this.getSessions[i].period_recruits[j].rounds
          }
        }
      }
      return round
    },
    // state (){
    //   if this.getEvaluateResult
    //
    // },
    allSuper () {
      return this.getEvaluateResult
    },
    itemsContent () {
      console.log('item', this.getEvaluateResult.description)
      return this.getEvaluateResult.description
    },
    itemsComment () {
      return this.getEvaluateResult.comment
    },
    itemsTable () {
      return this.getEvaluateResult.summary ? this.getEvaluateResult.summary.data_table : []
    },
    itemsTableAverage () {
      return this.getEvaluateResult.summary ? this.getEvaluateResult.summary.average : []
    },
    itemsTableK () {
      return this.getEvaluateResult.K ? this.getEvaluateResult.K.data_table : []
    },
    itemsTableS () {
      return this.getEvaluateResult.S ? this.getEvaluateResult.S.data_table : []
    },
    itemsTableA () {
      return this.getEvaluateResult.A ? this.getEvaluateResult.A.data_table : []
    },
    itemsTableT () {
      return this.getEvaluateResult.T ? this.getEvaluateResult.T.data_table : []
    },
    itemsTableAverageK () {
      return this.getEvaluateResult.K ? this.getEvaluateResult.K.average : []
    },
    itemsTableAverageS () {
      return this.getEvaluateResult.S ? this.getEvaluateResult.S.average : []
    },
    itemsTableAverageA () {
      return this.getEvaluateResult.A ? this.getEvaluateResult.A.average : []
    },
    itemsTableAverageT () {
      return this.getEvaluateResult.T ? this.getEvaluateResult.T.average : []
    },
    itemdg () {
      return this.getEvaluateResult.supervisor ? this.getEvaluateResult.supervisor.supervisor_name : 'Nobody'
    }

  },
  watch: {
    candidate () {
      this.resultTemple = this.candidate
      console.log('candidate detail - result templte', this.resultTemple)
    },
    dialog () {
      this.dialog_candidate = this.dialog
      this.checkStatus()
    }
  },
  async created () {
    await this.getAllInter()
  },
  methods: {
    ...mapActions('can_management', ['updateCandi', 'loadSummaryResult', 'loadTopicResult', 'loadSchedule', 'getEvaluateResultTrain',
      'loadGroupResult', 'sendMail', 'loadAllInterviewer', 'updateInter', 'updateTest', 'loadTestResult', 'updateComment', 'updateDescription',
      'updateSupervisor', 'getSupervisor', 'getTestResult', 'deleteKeyEvaluateResultDescription', 'deleteKeyEvaluateResultComment',
      'updateTestResult']),
    updateCertificate () {
      let payload = {
        id: this.resultTemple.id,
        body: {
          certificate: this.resultTemple.certifications
        }
      }
      this.updateCandi(payload)
    },
    onUpdateTestResult () {
      let payload = {
        id: this.getTestResult.candidate__id,
        body: {
          ids: this.getTestResult.ids,
          num_questions: this.getTestResult.score.num_questions * 1,
          true_answers: this.getTestResult.score.true_answers * 1
        }
      }
      console.log('update test result', payload)
      this.updateTestResult(payload)
    },
    async updateSchedule () {
      let payload = {
        data: {
          ids: this.schTemplate.ids,
          interviewer: this.schTemplate.interviewer,
          date: this.schTemplate.date,
          time_start: this.schTemplate.time_start,
          time_end: this.schTemplate.time_end,
          place: this.schTemplate.place
        },
        index: this.schTemplate.index
      }
      if (this.roundType === 'inter') {
        await this.updateInter(payload)
      }
      if (this.roundType === 'test') {
        await this.updateTest(payload)
      }
    },
    getRoundType (item) {
      let name = Object.assign(item)
      name.toLowerCase()
      if (name.toLowerCase().includes('test')) {
        this.roundType = 'test'
      }
      if (name.toLowerCase().includes('inter')) {
        this.roundType = 'inter'
      }
    },
    async getAllInter () {
      let payload = {}
      await this.loadAllInterviewer(payload)
    },
    async sendMailCandi () {
      let mail = Object.assign({}, this.mail)
      let payload = {
        period_recruit: this.resultTemple.period_recruit,
        candidates: this.resultTemple.id,
        name_round: this.sendMailSelect[0].name_round,
        options_save: 0,
        default_content: -1,
        subject: mail.subject,
        content: mail.content
      }
      if (payload.subject === '' || payload.content === '') {
        this.sendMailFail = true
        this.sendMailSuccess = false
      } else {
        const response = await this.sendMail(payload)
        if (response.fail.length > 0) {
          this.sendMailFail = true
          this.sendMailSuccess = false
        } else {
          this.sendMailSuccess = true
          this.sendMailFail = false
          console.log('payload send mail', payload)
        }
      }
    },
    closeSendMail () {
      this.sendMailDialog = false
      this.mail.subject = ''
      this.mail.content = ''
      this.sendMailSuccess = false
      this.sendMailFail = false
    },
    closeDialog () {
      for (let i = 0; i < this.profileTabs.length; i++) {
        this.profileTabs[i].active = false
      }
      this.profileTabs[0].active = true
      this.dialog_candidate = false
      this.defaultSelected = 0
      this.$emit('close')
    },
    viewTab (index) {
      for (let i = 0; i < this.profileTabs.length; i++) {
        this.profileTabs[i].active = false
      }
      for (let i = 0; i < this.dropdown.length; i++) {
        this.dropdown[i].active = false
      }
      this.profileTabs[index].active = true
      if (index === 1) {
        this.loadSchedule(this.resultTemple.id)
        for (let i = 0; i < this.getSessions.length; i++) {
          for (let j = 0; j < this.getSessions[i].period_recruits.length; j++) {
            if (this.getSessions[i].period_recruits[j].id === this.resultTemple.period_recruit) {
              this.dateStartRecruit = this.getSessions[i].period_recruits[j].time_start
              this.dateEndRecruit = this.getSessions[i].period_recruits[j].time_end
              break
            }
          }
        }
      } else {
        this.roundType = null
      }
    },
    checkStatus () {
      if ((this.resultTemple.status !== 5) && (this.resultTemple.status !== 6) &&
          (this.resultTemple.status !== 7) && (this.resultTemple.status !== 8) &&
          (this.resultTemple.status !== 9)) {
        let item = {
          name: 'NEW CANDIDATE',
          value: this.resultTemple.status
        }
        this.statusList.push(item)
      }
    },
    async dropdownView (index) {
      for (let i = 0; i < this.profileTabs.length; i++) {
        this.profileTabs[i].active = false
      }
      this.dropdown[index].active = true
      let result
      if (index === 0) {
        result = await this.getEvaluateResultTrain({candidate: this.resultTemple.id, evaluate_from: 'foa'})
        this.initTraining()
        this.getSuper()
      }
      console.log(result)
    },
    addNew (e) {
      if (e.keyCode === 13) {
        this.resultTemple.certifications.push(this.certifiItem)
        this.certifiItem = ''
      }
    },
    viewCandidate () {
      this.profileTabs[this.profileTabs.length - 1].active = false
      this.profileTabs[0].active = true
    },
    showSchedule (item) {
      let temp = {...item}
      this.schTemplate = Object.assign(temp)
      this.schTemplate.index = this.getSchedule.indexOf(item)
      this.getRoundType(item.name_round)
      this.schedule_dialog = true
    },
    showAllTopic () {
      if (this.topicShowAll.length < 1) {
        this.topicShowAll = this.getTopicResult.map((k, index) => index)
      } else {
        this.topicShowAll = []
      }
    },
    showAllGroup () {
      if (this.groupShowAll.length < 1) {
        this.groupShowAll = this.getGroupResult.map((k, index) => index)
      } else {
        this.groupShowAll = []
      }
      console.log('getGroupResult', this.getGroupResult)
    },
    async editInterview () {
      let payload = {
        candidate: this.resultTemple.id,
        period_recruit: 212,
        name_round: 'INTER-round 1',
        is_pass: this.summary[this.summary.length - 1].is_pass,
        comment: this.summary[this.summary.length - 1].cmt
      }
      console.log('payload in update interview', payload)
    },
    viewInterviewResult (tab, id, recruit) {
      this.roundName = tab
      let payload = {
        candidate: id,
        period_recruit: recruit,
        name_round: tab
      }
      if (this.roundType === 'inter') {
        this.loadGroupResult(payload)
        this.loadTopicResult(payload)
        this.loadSummaryResult(payload)
      }
      if (this.roundType === 'test') {
        this.loadTestResult(payload)
      }
    },
    updateCandidate () {
      let payload = {
        id: this.resultTemple.id,
        body: {
          address: this.resultTemple.address,
          birthday: this.resultTemple.birthday,
          cmnd: this.resultTemple.cmnd,
          created_at: this.resultTemple.created_at,
          cv: this.resultTemple.cv,
          cv_raw: this.resultTemple.cv_raw,
          cv_submitted_time: this.resultTemple.cv_submitted_time,
          education_program: this.resultTemple.education_program,
          education_rank: this.resultTemple.education_rank,
          email: this.resultTemple.email,
          expected_salary: this.resultTemple.expected_salary,
          facebook: this.resultTemple.facebook,
          gender: this.resultTemple.gender,
          gpa: this.resultTemple.gpa,
          interview_accept: this.resultTemple.interview_accept,
          interview_comment: this.resultTemple.interview_comment,
          is_accepted: this.resultTemple.is_accepted,
          is_graduated: this.resultTemple.is_graduated,
          major: this.resultTemple.major,
          marital_status: this.resultTemple.marital_status,
          name_candidate: this.resultTemple.name_candidate,
          nationality: this.resultTemple.nationality,
          note: this.resultTemple.note,
          num_course_owed: this.resultTemple.num_course_owed,
          others_reason: this.resultTemple.others_reason,
          period_recruit: this.resultTemple.period_recruit,
          phone: this.resultTemple.phone,
          photo: this.resultTemple.photo,
          recommendations_salary: this.resultTemple.recommendations_salary,
          reference_person_code: this.resultTemple.reference_person_code,
          school_lever: this.resultTemple.school_lever,
          school_name: this.resultTemple.school_name,
          school_type: this.resultTemple.school_type,
          seasion: this.resultTemple.seasion,
          // status: this.resultTemple.status,
          tech: this.resultTemple.tech
        }
      }
      this.updateCandi(payload)
    },
    deleteItemComment (key) {
      console.log('delete', this.itemsComment)
      this.deleteKeyEvaluateResultComment(key)
    },
    deleteItemContent (key) {
      console.log('delete', this.itemsContent)
      this.deleteKeyEvaluateResultDescription(key)
    },
    async saveContent () {
      if (this.editContent.title) {
        let key = this.editContent.title
        let content = this.editContent.content
        this.itemsContent[key] = content
        this.editContent = {}
        this.dialog1 = false
      }
    },
    addContent () {
      if (this.editContent.title) {
        let key = this.editContent.title
        let content = this.editContent.content
        this.itemsContent[key] = content
        this.editContent = {}
      }
    },

    saveComment () {
      if (this.editComment.title) {
        let key = this.editComment.title
        let comment = this.editComment.comment
        this.itemsComment[key] = comment
        this.editComment = {}
      }
      this.dialog2 = false
    },
    addComment () {
      if (this.editComment.title) {
        let key = this.editComment.title
        let comment = this.editComment.comment
        this.itemsComment[key] = comment
        this.editComment = {}
      }
    },
    async onSaveTotal () {
      this.isLoadingSaveBtn = true
      let payload1 = {
        id_training: this.allSuper.id,
        supervisor_id: this.supervisor.supervisor_id,
        time_start: this.period_from,
        time_end: this.period_to
      }
      this.dialogTotal = false
      await this.updateSupervisor(payload1)
      this.isLoadingSaveBtn = false
    },
    async saveAll () {
      this.isLoadingSaveBtn = true
      try {
        let payload1 = {
          id_training: this.allSuper.id,
          supervisor_id: this.supervisor.supervisor_id,
          time_start: this.period_from,
          time_end: this.period_to
        }
        let payload2 = {
          id_training: this.allSuper.id,
          content: this.itemsContent
        }
        let payload3 = {
          id_training: this.allSuper.id,
          content: this.itemsComment
        }
        await this.updateSupervisor(payload1)
        await this.updateDescription(payload2)
        await this.updateComment(payload3)
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoadingSaveBtn = false
      }
    },
    initTraining () {
      this.period_from = this.allSuper.time_start
      this.period_to = this.allSuper.time_end
      this.supervisor = {
        id: this.allSuper.supervisor.supervisor_id,
        username: this.allSuper.supervisor.supervisor_name
      }
    },
    async getSuper () {
      let payload = {}
      await this.getSupervisor(payload)
    },
    editItemTable (item) {
      console.log('tetssssssssssssss')
    },
    addTableT () {
      console.log('add')
      this.dialogTable = true
      this.dialogTitle = 'Thêm nội dung bảng kiến thức'
    },
    addTableK () {
      console.log('add table K')
    }
  }
}
</script>
