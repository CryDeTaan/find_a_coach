<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm';
export default {
  name: 'CoachRegistration',

  components: {
    CoachForm,
  },

  methods: {
    saveData(formData) {
      this.$store.dispatch('coaches/registerCoach', formData);
      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped></style>
