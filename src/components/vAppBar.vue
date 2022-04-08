<template>
  <v-app-bar app>
    <!-- -->
    <v-chip color="green" style="color: white;" outlined label v-if="isAuthenticated">
      Bienvenido {{ getCurrentUserName }} - {{ getCurrentUserEmail }}
    </v-chip>
    <v-divider></v-divider>
    <v-switch
    style="margin-top: 20px;"
      v-model="$vuetify.theme.dark"
      inset
      persistent-hint
    ></v-switch>
    <v-icon v-if="$vuetify.theme.dark">
      mdi-weather-night
    </v-icon>
    <v-icon v-if="!$vuetify.theme.dark">
      mdi-white-balance-sunny
    </v-icon>
  </v-app-bar>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters(['getCurrentUserName', 'getCurrentUserEmail', 'isAuthenticated'])
    }
};
</script>

<style>
</style>