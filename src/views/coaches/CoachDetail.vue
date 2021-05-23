<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ coach.hourlyRate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach our now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in coach.areas"
          :key="area"
          :area="area"
        ></base-badge>
        <p>{{ coach.description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CoachDetail',

  props: ['id'],

  data() {
    return {
      coach: null,
    };
  },

  computed: {
    fullName() {
      return this.coach.firstName + ' ' + this.coach.lastName;
    },
    contactLink() {
      return this.$route.path + '/contact';
    },
    ...mapGetters('coaches', ['getCoach']),
  },

  created() {
    this.coach = this.getCoach(this.id);
  },
};
</script>

<style scoped></style>
