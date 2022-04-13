<template>
  <div class="form">
    <img
      src="http://www.androidpolice.com/wp-content/themes/ap2/ap_resize/ap_resize.php?src=http%3A%2F%2Fwww.androidpolice.com%2Fwp-content%2Fuploads%2F2015%2F10%2Fnexus2cee_Search-Thumb-150x150.png&w=150&h=150&zc=3"
    />

    <button @click="handleClickSignIn" v-if="!isAuthenticated">
      Ingresar con Google
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default {
  data() {
    return {
      isInit: false,
    };
  },
  methods: {
    ...mapActions(["setCurrentUser", "logOutCurrentUser"]),
    async handleClickSignIn() {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/calendar.readonly");
      provider.addScope("https://www.googleapis.com/auth/calendar");
      provider.addScope("https://www.googleapis.com/auth/calendar");
      provider.addScope("https://www.googleapis.com/auth/calendar.readonly");
      provider.addScope("https://www.googleapis.com/auth/calendar.events");
      provider.addScope("https://www.googleapis.com/auth/calendar.events.readonly");
      provider.addScope("https://www.googleapis.com/auth/calendar.settings.readonly");
      provider.addScope("https://www.googleapis.com/auth/calendar.addons.execute");
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          this.setCurrentUser({
            name: result.additionalUserInfo.profile.name,
            token: result.credential.accessToken,
            email: result.additionalUserInfo.profile.email,
          });
          /* axios
            .get(
              "https://www.googleapis.com/calendar/v3/users/me/calendarList",
              config
            )
            .then((response) => {
              console.log(response);
            }); */

          this.$router.push({ path: "/calendario" });
        });
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  background-color: #eeeeee;
}

img {
  display: block;
  width: 80px;
  margin: 30px auto;
  box-shadow: 0 5px 10px -7px #333333;
  border-radius: 50%;
}

.form {
  background-color: #ffffff;
  width: 500px;
  margin: 50px auto 10px auto;
  padding: 30px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px -3px #333;
  text-align: center;
}

input {
  border-radius: 100px;
  padding: 10px 15px;
  width: 50%;
  border: 1px solid #d9d9d9;
  outline: none;
  display: block;
  margin: 20px auto 20px auto;
}

button {
  border-radius: 100px;
  border: none;
  background: #719be6;
  width: 50%;
  padding: 10px;
  color: #ffffff;
  margin-top: 25px;
  box-shadow: 0 2px 10px -3px #719be6;
  display: block;
  margin: 55px auto 10px auto;
}

a {
  text-align: center;
  margin-top: 30px;
  color: #719be6;
  text-decoration: none;
  padding: 5px;
  display: inline-block;
}

a:hover {
  text-decoration: underline;
}
</style>
