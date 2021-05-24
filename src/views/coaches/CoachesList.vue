<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred."
      @close="error = null"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filters="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button @click="loadCoaches(true)" mode="outline"
            >Refresh
          </base-button>
          <base-button v-if="!isAuthenticated" link to="/auth"
            >Login
          </base-button>
          <base-button
            v-if="isAuthenticated && !isLoading && !isCoach"
            link
            to="/register"
            >Register as Coach
          </base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="!isLoading && hasCoaches">
          <coach-item
            v-for="coach in coaches"
            :key="coach.id"
            :coach="coach"
          ></coach-item>
        </ul>
        <h3 v-else>No Coaches Found.</h3>
      </base-card>
    </section>
  </div>
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
      isLoading: false,
      error: null,
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
    ...mapGetters('auth', ['isAuthenticated']),
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
    async loadCoaches(forceRefresh = false) {
      this.isLoading = true;

      try {
        await this.fetchCoaches({ forceRefresh: forceRefresh });
        this.coaches = this.filteredCoaches(this.activeFilters);
      } catch (error) {
        this.error =
          error.message ||
          'Something went wrong and we failed to fetch coaches!';
      }

      this.isLoading = false;
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
