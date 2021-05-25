export default {
  setUser(state, payload) {
    state.token = payload.idToken;
    state.userId = payload.localId;
  },
};
