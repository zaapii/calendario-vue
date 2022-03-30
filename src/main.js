import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueTextAreaAutosize from 'vue-textarea-autosize'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

Vue.use(VueTextAreaAutosize)

firebase.initializeApp({
  apiKey: "AIzaSyC7rMsoQWYfTWXOdg7qUpBMZcjhKkOW1rU",
  authDomain: "vue-calendario-b6dab.firebaseapp.com",
  databaseURL: "https://vue-calendario-b6dab-default-rtdb.firebaseio.com",
  projectId: "vue-calendario-b6dab",
  storageBucket: "vue-calendario-b6dab.appspot.com",
  messagingSenderId: "1070446541548",
  appId: "1:1070446541548:web:ed0161dd965e0d6674c3c9"
})

export const db = firebase.firestore();

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
