export default {
  requests(state, getters, rootState) {
    const coachId = rootState.userId;
    return state.requests.filter((request) => request.coachId === coachId);
  },
  hasRequests(state, getters) {
    return getters.requests && getters.requests.length > 0;
  },
};
