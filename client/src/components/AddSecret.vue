<template>
  <v-form ref="form">
   <p class="display-1 text--primary">
     Create a new secret 🤫
   </p>
    <v-text-field
      v-model="secret"
      label="Your secret"
      :rules="secretRules"
      required
    ></v-text-field>
    <v-text-field
      v-model="expireAfterViews"
      label="Set the view expire"
      :rules="expireAfterViewsRules"
      type="number"
      required
    ></v-text-field>
    <v-text-field
      v-model="expireAfter"
      type="number"
      label="Set the expiration minute, if you set it to 0 it will never expire!"
      :rules="expireAfterRules"
      required
    ></v-text-field>
    <Dialog 
        inputType="field"
        v-bind:valid="isDisable"
        v-bind:value="hash"
        btnTitle="Add secret!"
        class="myclass"
        :eventClick="submit"
        headline="Your hash:"
        color="#42A5F5"
      />
    <v-btn 
      @click="clear"
      color="#F44336"
      class="float-sm-left"
    >
      Clear fields
    </v-btn>
  </v-form>
</template>

<script>
import Dialog from './Dialog'
import axios from 'axios'

export default {
  components: {
    Dialog
  },
  data: () => ({
    secret: null,
    expireAfterViews: null,
    expireAfter: null,
    dialog: false,
    hash: '',
    secretRules: [
      v => !!v || 'Name is required'
    ],
    expireAfterViewsRules: [
      v => (v && v >= 1) || 'This field required and must bigger than 1'
    ],
    expireAfterRules: [
      v => (v && v >= 0) || 'This field required and must bigger or equal than 0'
    ],
  }),
  computed: {
    isDisable() {
      if(this.secret != '' && this.expireAfterViews != '' && this.expireAfter != '')
        return true
      else
        return false;
    },
  },
  methods: {
    submit () {
      axios.post(location.protocol+'//'+location.hostname+':'+process.env.VUE_APP_SERVER_PORT+process.env.VUE_APP_API_PATH_POST,{
        secret: this.secret,
        expireAfterViews: this.expireAfterViews,
        expireAfter: this.expireAfter
      }).then((response) => {
        this.hash = response.data.hash
        this.dialog = true
        this.clear();
      }).catch(function (error) {
        console.log(error);
      });
    },
    clear () {
      this.$refs.form.reset()
    },
  },
}

</script>
<style scoped>
 form {
    padding: 20px;
 }
 .myclass {
    top: 14px;
    float: right;
    position: relative;
 }
</style>