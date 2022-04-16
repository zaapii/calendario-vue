<template>
  <v-navigation-drawer v-if="!this.$vuetify.breakpoint.mobile" app>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
               <img
                src="https://www.seekpng.com/png/full/246-2467553_your-logo-here-png.png"
                alt=""
                style="max-width:50%;"
              /> 
            </v-list-item-title>
            <v-list-item-subtitle> Calendar </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <!-- ESTO ES UN ASCO PERO ANDA -->
        <v-list dense nav>
          <v-list-item v-if="!isAuthenticated">
            <v-list-item-content>
              <router-link to="/login">
                <v-btn block elevation="2" outlined>
                  <v-list-item-icon>
                    <v-icon>mdi-login</v-icon>
                  </v-list-item-icon>
                  &nbsp;&nbsp;Ingresar&nbsp;&nbsp;&nbsp;</v-btn
                ></router-link
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <router-link to="/calendario">
                <v-btn block elevation="2" outlined>
                  <v-list-item-icon>
                    <v-icon>mdi-calendar</v-icon>
                  </v-list-item-icon>
                  Calendario</v-btn
                ></router-link
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="isAuthenticated">
            <v-list-item-content>
              
              <v-btn @click="handleClickSignOut" block elevation="2" outlined
                ><v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>Salir</v-btn
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default {
  created()
  {
    this.$root.$refs.V = this;
  },
computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    ...mapActions(["logOutCurrentUser"]),
    async handleClickSignOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Successfully signed out.");
        });
      this.logOutCurrentUser();
      this.$router.push({ path: "/login" });
    },
  },
}
</script>

<style>

</style>