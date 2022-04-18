<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="getCurrentUserPicture"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ getCurrentUserName }}</v-list-item-title>
              <v-list-item-subtitle>{{
                getCurrentUserEmail
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-btn
                :loading="loading"
                :disabled="getGoogleCalendarEvents !== null"
                outlined
                small
                :color="
                  $vuetify.theme.dark ? 'amber lighten-5' : 'grey darken-4'
                "
                class="white--text"
                @click="fetchGoogleEvents"
              >
                Eventos
                <v-icon right color="amber darken-4"> mdi-google </v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-title>{{btnText}}
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="getGoogleCalendarEvents !== null">
            <v-list-item-action>
              <v-switch
                v-model="mostrarGoogle"
                @change="mostrarOcultarGoogle"
                inset
                color="orange darken-3"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-title>Mostrar Eventos de Google</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn outlined color="red-darken-3" text @click="menu = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from 'axios'
export default {
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
    mostrarGoogle: false,
    loading: false,
  }),
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
      } else return "Importar desde Google";
    },
  },
  methods: {
      ...mapActions(["setGoogleCalendarEvents"]),
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
};
</script>

<style></style>
