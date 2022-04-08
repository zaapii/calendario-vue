<template>
  <v-theme-provider root>
    <v-app>
      
      <v-navigation-drawer />
      <vAppBar />
      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>

      <v-footer app>
        <!-- NADA POR AQUí POR AHORA -->
      </v-footer>
    </v-app>
  </v-theme-provider>
</template>

<script>
import vAppBar from "./components/vAppBar";
import vNavigationDrawer from "./components/vNavigationDrawer";
export default {
  components: {
    vAppBar,
    vNavigationDrawer
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
