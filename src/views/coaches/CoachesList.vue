<template>
  <section>
    <coach-filter @change-filters="setFilters"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button @click="loadCoaches" mode="outline">Refresh</base-button>
        <base-button v-if="!isCoach" link to="/register"
          >Register as Coach
        </base-button>
      </div>
      <ul v-if="hasCoaches">
        <coach-item
          v-for="coach in coaches"
          :key="coach.id"
          :coach="coach"
        ></coach-item>
      </ul>
      <h3 v-else>No Coaches Found.</h3>
    </base-card>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CoachItem from '@/components/coaches/CoachItem';
import CoachFilter from '@/components/coaches/CoachFilter';

export default {
  name: 'CoachesList',

  components: {
    CoachFilter,
    CoachItem,
  },

  data() {
    return {
      coaches: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },

  created() {
    this.loadCoaches();
  },

  computed: {
    ...mapGetters('coaches', ['hasCoaches', 'filteredCoaches', 'isCoach']),
  },

  watch: {
    activeFilters() {
      this.coaches = this.filteredCoaches(this.activeFilters);
    },
  },

  methods: {
    ...mapActions('coaches', ['fetchCoaches']),

    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches() {
      await this.fetchCoaches();
      this.coaches = this.filteredCoaches(this.activeFilters);
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
