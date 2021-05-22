<template>
  <section>FILTER</section>
  <section>LIST OF COACHES</section>
  {{ coaches }}
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'CoachesList',

  computed: {
    ...mapGetters('coaches', ['coaches']),
  },
};
</script>

<style scoped></style>
