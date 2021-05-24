export default {
  coaches(state) {
    return state.coaches;
  },

  filteredCoaches: (state, getters) => (activeFilters) => {
    return getters.coaches.filter((coach) => {
      if (activeFilters.frontend && coach.areas.includes('frontend')) {
        return true;
      }
      if (activeFilters.backend && coach.areas.includes('backend')) {
        return true;
      }
      if (activeFilters.career && coach.areas.includes('career')) {
        return true;
      }
      return false;
    });
  },

  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },

  getCoach: (state) => (id) => {
    return state.coaches.find((coach) => coach.id === id);
  },

  isCoach(state, getters, rootState, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters['auth/userId'];

    return coaches.some((coach) => coach.id === userId);
  },

  shouldUpdate(state) {
    const lastFetched = state.lastFetch;
    if (!lastFetched) {
      return true;
    }
    const currentTimestamp = new Date().getTime();

    return (currentTimestamp - lastFetched) / 1000 > 60;
  },
};
