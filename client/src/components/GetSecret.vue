<template>
   <v-form ref="form" v-model="valid" lazy-validation>
   <p class="display-1 text--primary">
     Already have a secret?
   </p>
   <p>Paste in the field your hash to see your secret!</p>
    <v-text-field v-model="hash" :rules="hashRules" label="Hash" required></v-text-field>
     <Dialog 
        v-bind:valid="valid"
        v-bind:validate="validate"
        v-bind:value="value"
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
    valid: false,
    hash: '',
    hashRules: [
      v => !!v || 'Hash is required'
    ],
    value: ''
  }),
  methods: {
    validate () {
      this.$refs.form.validate()
      axios.get(location.protocol+'//'+location.hostname+':'+process.env.VUE_APP_SERVER_PORT+process.env.VUE_APP_API_PATH_GET+this.hash)
        .then((response) => {
          if(typeof response.data != "undefined") {
            this.value = response.data.secretText;
          } else {
            this.value = response.data.message
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
}
</script>
<style scoped>

form {
   padding: 30px;
}

</style>