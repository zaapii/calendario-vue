<template>
  <v-app>
    <v-main>
      <LegalimCalendario />
    </v-main>
  </v-app>
</template>

<script>
import LegalimCalendario from './components/LegalimCalendario';

export default {
  name: 'App',

  components: {
    LegalimCalendario
  },
};
</script>
