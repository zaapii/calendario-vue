<template>
  <v-app-bar app>
    <!-- -->
    <template v-if="isAuthenticated">
    <v-chip
      :color="$vuetify.theme.dark ? 'amber lighten-5' : 'grey darken-4' "
      outlined
      label

    >
      Bienvenido {{ getCurrentUserName }} - {{ getCurrentUserEmail }}
      <v-icon right color="amber darken-4"> mdi-account </v-icon>
    </v-chip>

    <v-btn
      :loading="loading"
      :disabled="getGoogleCalendarEvents !== null"
      outlined
      small
      :color="$vuetify.theme.dark ? 'amber lighten-5' : 'grey darken-4' "
      class="ml-4 ma-2 white--text"
      @click="fetchGoogleEvents"
    >
      {{btnText}}
      <v-icon right color='amber darken-4'> mdi-google </v-icon>
    </v-btn>

    <v-switch
      v-if="getGoogleCalendarEvents !== null"
      v-model="mostrarGoogle"
      @change="mostrarOcultarGoogle"
      inset
      class="ml-4 mt-5 mr-4"
      color="orange darken-3"
      label="Mostrar Eventos de Google"
    ></v-switch>
    </template>
    <v-divider></v-divider>
    <v-switch
      style="margin-top: 20px"
      v-model="$vuetify.theme.dark"
      inset
      persistent-hint
    ></v-switch>
    <v-icon v-if="$vuetify.theme.dark"> mdi-weather-night </v-icon>
    <v-icon v-if="!$vuetify.theme.dark"> mdi-white-balance-sunny </v-icon>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      mostrarGoogle: false,
    };
  },
  methods: {
    ...mapActions(['setGoogleCalendarEvents']),
    fetchGoogleEvents() {
      this.loading = true;
      const config = {
        headers: {
          Authorization: `Bearer ${this.getCurrentUserToken}`,
        },
      };
      axios
        .get(
          `https://www.googleapis.com/calendar/v3/calendars/${this.getCurrentUserEmail}/events`,
          config
        )
        .then((response) => {
          this.setGoogleCalendarEvents(response.data.items);
          this.mostrarGoogle = true;
          this.loading = false;
          this.$root.$refs.C.getEvents();
        });
    },

    mostrarOcultarGoogle(){
      if(this.mostrarGoogle){
        this.$root.$refs.C.getEvents();
      }
      else {
        this.$root.$refs.C.ocultarGoogle();
      }
    }
  },
  computed: {
    ...mapGetters([
      "getCurrentUserName",
      "getCurrentUserToken",
      "getCurrentUserEmail",
      "isAuthenticated",
      "getGoogleCalendarEvents"
    ]),
    btnText() {
      if(this.getGoogleCalendarEvents !== null)
      {
        return '¡Eventos Importados!'
      }
      else return 'Importar Eventos de Google'
    }
  },
};
</script>

<style>
</style>