export default {
  setUser(state, payload) {
    state.token = payload.responseData.idToken;
    state.userId = payload.responseData.localId;
    state.tokenExpiration = payload.responseData.expiresIn;
  },
};
