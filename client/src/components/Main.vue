<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="3">
            <v-sheet rounded="lg" min-height="400">
              <GetSecret/>
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="9">
            <v-sheet min-height="42.5vh" rounded="lg">
              <AddSecret/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import GetSecret from './GetSecret'
import AddSecret from './AddSecret'

export default {
  components: {
    GetSecret,
    AddSecret,
  }
}
</script>