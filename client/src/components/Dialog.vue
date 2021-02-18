<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" :disabled="!valid" :color="color" :class="btnClass" @click="eventClick">
          {{btnTitle}}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{headline}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="15" sm="7" md="12">
                <div v-if="inputType == 'field'">
                  <v-text-field 
                    :value="value"
                    disabled
                    ref="textToCopy">
                  </v-text-field>
                </div>
                <div v-else>
                  <v-textarea solo auto-grow :value="value" disabled>{{value}}</v-textarea>
                  <div v-if="!invalid">
                    <div v-if="mindiff != null">
                      <v-alert type="info">
                        You can see this secret for another {{mindiff}} minutes
                      </v-alert>
                    </div>
                    <v-alert type="warning">
                      You can see this secret {{remainingViews}} more times!
                    </v-alert>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
  props: {
    inputType: String,
    valid: Boolean,
    validate: Function,
    value: String,
    btnTitle: String,
    btnClass: String,
    eventClick: Function,
    headline: String,
    color: String,
    remainingViews: Number,
    invalid: Boolean,
    mindiff: Number
  },
  data: () => ({
    dialog: false,
  }),
}

</script>
<style scoped>
  .tobottom {
    top: 37px;
  }
</style>