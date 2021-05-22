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
};
