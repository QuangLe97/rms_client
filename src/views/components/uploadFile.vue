<template>
  <div class="uploadfile">
    <v-row class="uploadfile__box ma-0">
      <v-col
        cols="6"
        class="uploadfile__input">
        <input
          ref="files"
          multiple
          type="file"
          class="uploadfile__input__main"
          @change="selectFile" >
        <div class="uploadfile__input__sub">
          <div class="text-center ">
            <p>{{ $t('process.upload.note') }}</p>
            <p>{{ $t('process.upload.or') }}</p>
            <v-btn class="btn btn--primary">{{ $t('process.upload.btnBrowse') }}</v-btn>
          </div>
          <div class="upload-notice">
            <v-icon color="green">mdi-information-outline</v-icon>
            <div class="ml-3">
              <p>{{ $t('process.home.tipAllow') }}</p>
              <ul class="list-style:none">
                <li>pdf</li>
                <li>word</li>
                <li>{{ $t('process.home.tipImg') }}</li>
              </ul>
              <p class="font-italic">{{ $t('process.home.tipFileSize') }} &#60;&#61; 10MB</p>
            </div>
          </div>
        </div>
      </v-col>
      <v-col
        cols="6"
        class="uploadfile__list">
        <v-list
          v-if="files.length > 0"
          class="uploadfile__list__files"
        >
          <v-list-item
            v-for="(file, index) in files"
            :key="index">
            <v-list-item-content>
              <!-- File container -->
              <div
                class="mx-1 file">

                <!-- Delete icon -->
                <i
                  class="fa fa-times file__icon-delete"
                  aria-hidden="true"
                  @click.prevent="files.splice(index, 1)"/>

                <!-- File icon -->
                <i
                  :class="'fa'+ fileExtToIcon(file.type) + ' fa-2x' + ' file__icon-main'"
                  aria-hidden="true"
                />

                <!-- File info -->
                <div
                  class="align-self-center file__info">
                  <v-list-item-title>
                    <p
                      class="file__info__name">
                      <b>{{ file.name }}</b>
                    </p>
                    <p
                      class="file__info__size">{{ Math.ceil(file.size / 1024) }}KB</p>
                    <p
                      class="file__info__msg">{{ file.msg }}</p>

                  </v-list-item-title>
                </div>
                <div class="file__progress">
                  <v-progress-linear
                    v-if="true"
                    value="100"
                  />
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div class="uploadfile__list__btn">
          <v-btn
            v-if="files.length > 0"
            :loading="uploadProgress"
            :disabled="uploadProgress"
            class="btn btn--primary"
            @click="sendFiles">
            {{ $t('process.upload.btnUpload') }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <div class="uploadfile__status">
      <p>
        {{ this.message }}
      </p>
      <v-btn
        :disabled="!isAdjusting"
        class="uploadfile__status__btn btn btn--primary"
        @click="viewResultList"
      >{{ $t('process.upload.btnResult') }}</v-btn>
    </div>

  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import router from '../../router'
export default {
  name: 'UploadZone',
  data: () => ({
    uploadFiles: [],
    error: false,
    uploading: false,
    isAdjusting: false
  }),
  computed: {
    ...mapState('upload', [
      'uploadProgress',
      'files',
      'uploadedFiles',
      'message'
    ]),
    disabled () {
      return this.uploadProgress
    }
  },
  methods: {
    ...mapActions('upload', ['uploadCV']),
    ...mapActions('candidate', ['setProcessCv']),
    ...mapMutations('upload', ['setUploadProgress', 'setFiles', 'setMessage']),

    validateFile (file) {
      const MAX_SIZE = 10485760
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/gif',
        'application/msword',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]

      if (file.size > MAX_SIZE || !allowedTypes.includes(file.type)) {
        return true
      }
      return false
    },

    fileExtToIcon (ext) {
      console.log(ext)
      switch (ext) {
        case 'image/jpeg':
        case 'image/png':
        case 'image/jpg':
        case 'image/gif':
          return ' fa-file-image-o'
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          return ' fa-file-word-o'
        case 'application/pdf': return ' fa-file-pdf-o'
        default: return ' fa-exclamation-triangle file__icon-main--red'
      }
    },

    selectFile () {
      const files = this.$refs.files.files
      // this.uploadFiles = [...this.uploadFiles, ...files]
      // this.files = [
      //   ...this.files,
      //   ..._.map(files, file => ({
      //     name: file.name,
      //     size: file.size,
      //     type: file.type,
      //     invalidMessage: this.validateFile(file),
      //     status: 0
      //   }))
      // ]
      console.log(files)
      this.setFiles([...this.files, ...files])
    },

    async sendFiles () {
      let payload = []
      this.files.forEach(file => {
        if (!this.validateFile(file)) {
          payload.push(file)
        }
      })
      await this.uploadCV(payload)
      this.isAdjusting = true
    },

    viewResultList () {
      let date = new Date().toJSON().slice(0, 10)
      let payload = {...{user_id: 1, date: date}}
      this.setProcessCv(payload)
      router.push({path: '/process-cv/detail'})
    }
  }
}

// const numberWithCommas = x => {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
// }
// const normalizeFileSize = size => (
//   numberWithCommas(Math.ceil(size / 1024))
// )
</script>
<style lang="scss">
@import '../../scss/pages/_uploadfile.scss';

</style>
