<template>
   <v-form ref="form">
   <p class="display-1 text--primary">
     Already have a secret?
   </p>
   <p>Paste in the field your hash to see your secret!</p>
    <v-text-field v-model="hash" :rules="hashRules" label="Hash" required></v-text-field>
     <Dialog 
        v-bind:valid="isDisable"
        v-bind:validate="validate"
        v-bind:value="secret"
        v-bind:remainingViews="remainingViews"
        v-bind:invalid="invalid"
        v-bind:mindiff="mindiff"
        btnTitle="Get My secret!"
        btnClass="tobottom"
        :eventClick="validate"
        headline="Your secret:"
        color="success"
      />
  </v-form>
</template>

<script>

import Dialog from './Dialog'
import axios from 'axios';

export default {
  components: {
    Dialog,
  },
  data: () => ({
    hash: '',
    hashRules: [
      v => !!v || 'Hash is required'
    ],
    secret: '',
    remainingViews: 0,
    mindiff: 0,
    invalid: false
  }),
  computed: {
      isDisable() {
        if(this.hash)
          return true
        else
          return false;
     },
    },
  methods: {
    validate () {
      axios.get(location.protocol+'//'+location.hostname+':'+process.env.VUE_APP_SERVER_PORT+process.env.VUE_APP_API_PATH_GET+this.hash)
        .then((response) => {
          if(typeof response.data != "undefined" && typeof response.data.message == 'undefined') {
            this.secret = response.data.secretText;
            this.remainingViews = response.data.remainingViews;
            this.mindiff = response.data.expiresAt == 0 ? null : this.calculateMinDiff(response.data.expiresAt - new Date().getTime())
            this.invalid = false;
          } else {
            this.secret = response.data.message,
            this.invalid = true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    calculateMinDiff (difference) {
      let minutesDifference = Math.floor(difference / 1000 / 60);
      difference -= minutesDifference * 1000 * 60
      return minutesDifference;
    },
  },
}
</script>
<style scoped>

form {
   padding: 30px;
}

</style>