<template>
  <v-app-bar app>
    <!-- -->
    <v-chip outlined label v-if="isAuthenticated">
      Bienvenido {{ getCurrentUserName }} - {{ getCurrentUserEmail }}
    </v-chip>
    <v-divider></v-divider>
    <v-switch
    style="margin-top: 20px;"
      v-model="$vuetify.theme.dark"
      inset
      label="Modo Oscuro"
      persistent-hint
    ></v-switch>
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