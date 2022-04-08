<template>
  <v-theme-provider root>
    <v-app>
      <v-navigation-drawer app>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              <img
                v-if="$vuetify.theme.dark"
                src="https://legalim.netlify.app/img/logomark.c9fe0c97.png"
                alt=""
                style="width: 90%"
              />
              <img
                v-else
                src="https://legalim.netlify.app/img/logomark.c9fe0c97.png"
                style="width: 175%; transform: translateX(3rem)"
                alt=""
              />
            </v-list-item-title>
            <v-list-item-subtitle> Calendario </v-list-item-subtitle>
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

      <vAppBar />
      <!-- Sizes your content based upon application components -->
      <v-main>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
      </v-main>

      <v-footer app>
        <!-- -->
      </v-footer>
    </v-app>
  </v-theme-provider>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vAppBar from "./components/vAppBar";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default {
  components: {
    vAppBar,
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
};
</script>


<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 10px;
}

a{
  text-decoration: none;
  color: white;
}
</style>
