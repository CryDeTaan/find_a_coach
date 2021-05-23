<template>
  <base-dialog :show="!!error" title="An error occurred." @close="error = null">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="!isLoading && hasRequests">
        <request-item
          v-for="request in requests"
          :key="request.id"
          :request="request"
        >
        </request-item>
      </ul>
      <h3 v-else>You haven't received any requests yet!</h3>
    </base-card>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import RequestItem from '@/components/requests/RequestItem';

export default {
  name: 'RequestsReceived',

  components: { RequestItem },

  data() {
    return {
      isLoading: false,
      error: null,
    };
  },

  computed: {
    ...mapGetters('requests', ['hasRequests', 'requests']),
  },
  created() {
    this.loadRequests();
  },
  methods: {
    ...mapActions('requests', ['fetchRequests']),

    async loadRequests() {
      this.isLoading = true;

      try {
        await this.fetchRequests();
        // this.coaches = this.filteredCoaches(this.activeFilters);
      } catch (error) {
        this.error =
          error.message ||
          'Something went wrong and we failed to fetch the requests!';
      }

      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
