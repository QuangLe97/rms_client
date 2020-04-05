<template>
  <v-dialog
    v-model="this.certDialog"
    width="700px"
    persistent
  >
    <v-card>
      <v-card-text>
        <v-text-field
          v-model="newCert.cert_name"
          label="Certification name"/>
        <v-text-field
          v-model="newCert.cert_description"
          label="Description"/>
        Expire time:
        <v-checkbox
          v-model="newCert.isNoExpiration"
          label="No expiration date"/>
        <v-date-picker
          v-if="!newCert.isNoExpiration"
          v-model="newCert.expire_time"/>
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
    certType: {
      type: Number,
      default: -1
    },
    id: {
      type: Number,
      default: -1
    }
  },
  data: () => ({
    certProto: {
      expire_time: null,
      cert_name: null,
      cert_description: null,
      isNoExpiration: false
    },
    newCert: {}
  }),
  computed: {
    ...mapState('utils', ['certDialog']),
    ...mapState('candidate_draft', ['draftCandidates'])
  },
  methods: {
    ...mapMutations('utils', ['setCertDialog']),
    ...mapMutations('candidate_draft', ['addCert']),
    close () {
      Object.assign(this.newCert, this.certProto)
      this.setCertDialog(false)
    },
    save () {
      let payload = {
        cert_name: this.newCert.cert_name,
        cert_description: this.newCert.cert_description,
        expire_time: this.newCert.expire_time
      }
      if (this.newCert.isNoExpiration === true) {
        payload['expire_time'] = null
      }
      this.addCert(payload)
      console.log(payload)
      this.close()
    }
  }
}
</script>
