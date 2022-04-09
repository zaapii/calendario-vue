<template>
  <v-navigation-drawer app permanent :mini-variant.sync="mini">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
<!--               <img
                v-if="$vuetify.theme.dark"
                src="https://legalim.netlify.app/img/logomark.c9fe0c97.png"
                alt=""
                style="width: 90%"
              /> -->
<!--               <img
                v-else
                src="https://legalim.netlify.app/img/logomark.c9fe0c97.png"
                style="width: 175%; transform: translateX(3rem)"
                alt=""
              /> -->
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
computed: {
    ...mapGetters(["isAuthenticated"]),
    mini() {
        if(this.$vuetify.breakpoint.name < 1000)
        return true;
        else return false
    }
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