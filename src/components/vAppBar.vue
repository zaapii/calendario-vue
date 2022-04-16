<template>
  <v-app-bar app>
    <mobile-menu v-if="isAuthenticated && $vuetify.breakpoint.mobile"/>
    <div v-if="isAuthenticated && !$vuetify.breakpoint.mobile" class="container">
      <v-chip
        :color="$vuetify.theme.dark ? 'amber lighten-5' : 'grey darken-4'"
        outlined
        label
      >
        Bienvenido {{ getCurrentUserName }} - {{ getCurrentUserEmail }}
        <v-avatar class="ml-4">
      <img
        :src="getCurrentUserPicture"
      >
    </v-avatar>
      </v-chip>

      <v-btn
        :loading="loading"
        :disabled="getGoogleCalendarEvents !== null"
        outlined
        small
        :color="$vuetify.theme.dark ? 'amber lighten-5' : 'grey darken-4'"
        class="ml-4 ma-2 white--text"
        @click="fetchGoogleEvents"
      >
        {{ btnText }}
        <v-icon right color="amber darken-4"> mdi-google </v-icon>
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
    </div>
    <v-switch
      style="display:flex; margin-top: 20px"
      v-model="$vuetify.theme.dark"
      inset
      persistent-hint
    ></v-switch>
    <v-icon v-if="$vuetify.theme.dark"> mdi-weather-night </v-icon>
    <v-icon v-if="!$vuetify.theme.dark"> mdi-white-balance-sunny </v-icon>
    <v-btn v-if="isAuthenticated" @click="signOut" outlined color="red" class="ml-4"><v-icon>mdi-logout</v-icon>Salir</v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import mobileMenu from "@/components/mobileMenu"
import axios from "axios";
export default {
  components:{
    mobileMenu
  },
  data() {
    return {
      loading: false,
      mostrarGoogle: false,
    };
  },
  methods: {
    ...mapActions(["setGoogleCalendarEvents"]),
    signOut()
    {
      this.$root.$refs.V.handleClickSignOut();
    },
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

    mostrarOcultarGoogle() {
      if (this.mostrarGoogle) {
        this.$root.$refs.C.getEvents();
      } else {
        this.$root.$refs.C.ocultarGoogle();
      }
    },
  },
  computed: {
    ...mapGetters([
      "getCurrentUserName",
      "getCurrentUserToken",
      "getCurrentUserEmail",
      "isAuthenticated",
      "getGoogleCalendarEvents",
      "getCurrentUserPicture"
    ]),
    btnText() {
      if (this.getGoogleCalendarEvents !== null) {
        return "¡Eventos Importados!";
      } else return "Importar Eventos de Google";
    },
  },
};
</script>

<style scoped>
.container{
  display:grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
}

@media(max-width: 1700px)
{
  .container{
    grid-template-columns: 2fr 2fr 1fr 1fr;
  }
}

@media(max-width: 1500px)
{
  .container{
    grid-template-columns: 3fr 3fr 1fr 1fr;
  }
}

@media(max-width: 1300px)
{
  .container{
    grid-template-columns: 4fr 4fr 1fr 1fr;
  }
}

</style>
