<template>
  <div class="process-cv">
    <h3 class="heading">
      {{ $t('process.home.heading') }}
    </h3>
    <p class="sub-heading mt-3">
      {{ $t('process.home.subHeading1') }}<br>
      {{ $t('process.home.subHeading2') }}
    </p>

    <!-- Two column -->
    <v-row >
      <!-- uploader component -->
      <v-col
        lg="6"
        cols="12">
        <h5 class="sub-heading mb-4">{{ $t('process.home.titleUploader') }}</h5>
        <UploadFile/>
      </v-col>
      <!-- upload history -->
      <v-col
        lg="6"
        cols="12">
        <h5 class="sub-heading">{{ $t('process.home.nameTable') }}</h5>
        <v-data-table
          :headers="headers"
          :items="historyData"
          hide-default-footer
          class="upload-history box box--white box--shadow mt-4"
        >
          <template v-slot:item.action="{ item }">
            <v-btn
              class="btn btn--secondary mr-2"
              small
              @click="setProcessCvList(item)"
            >{{ $t('process.home.btnView') }}</v-btn>
            <v-btn
              class="btn btn--secondary"
              small
              @click="onExportCSV(item)">{{ $t('process.home.btnExport') }}</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import {mapState, mapMutations, mapActions} from 'vuex'
import UploadFile from '@/views/components/uploadFile'

import router from '../../router'
export default {
  components: {
    UploadFile
  },
  data () {
    return {
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...mapState('candidate', ['uploadHistoryData']),
    historyData () {
      return this.uploadHistoryData !== undefined ? this.uploadHistoryData.data : []
    },
    headers () {
      return [
        { text: this.$t('process.home.headerTable.date'), value: 'date_created' },
        { text: this.$t('process.home.headerTable.uploader'), value: 'user_create' },
        { text: this.$t('process.home.headerTable.cv'), value: 'sum_cv' },
        { text: this.$t('process.home.headerTable.approved'), value: 'appruved' },
        { text: this.$t('process.home.headerTable.action'), value: 'action' }
      ]
    }
  },
  async created () {
    await this.getHistoryUploadData()
  },
  methods: {
    // eslint-disable-next-line no-undef
    ...mapMutations('candidate', ['setUploadHistoryData']),
    ...mapActions('candidate', ['getUploadHistory', 'setProcessCv', 'exportCsv']),

    getHistoryUploadData () {
      let payload = {}
      this.getUploadHistory(payload)
    },

    setProcessCvList (item) {
      let payload = {...{user_id: item.user_id, date: item.date_created, page_size: item.sum_cv}}
      localStorage.setItem('processCv-user-id', payload.user_id)
      localStorage.setItem('processCv-date', payload.date)
      localStorage.setItem('processCv-page-size', payload.page_size)
      this.setProcessCv(payload)
      router.push({path: '/process-cv/detail'})
    },
    async onExportCSV (item) {
      let payload = {...{user_id: item.user_id, date_upload: item.date_created}}
      try {
        console.log('goi api')
        await this.exportCsv(payload)
        console.log('goi api thanh cong')
      } catch (e) {
        console.log('goi api that bai')
      } finally {
        console.log('goi api xong.')
      }
      console.log('export csv')
    }
    //   console.log('export csv')
    //   let selected = [...this.selected]
    //   console.log(selected)
    //   let selectedIds = selected.map((item) => {
    //     return item.id
    //   })item
    //   console.log(selectedIds)
    //   const payload = {...{},
    //     ...{
    //       list_id: selectedIds
    //     }}
    //
    //   try {
    //     console.log('goi api')
    //     const res = await this.exportCsv(payload)
    //     console.log('goi api thanh cong')
    //   } catch (e) {
    //     console.log('goi api that bai')
    //   } finally {
    //     console.log('goi api xong.')
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped>
@import '../../scss/pages/_process-cv.scss';
@import '../../scss/components/_btn.scss';
@import '@/scss/components/_box.scss';

</style>
