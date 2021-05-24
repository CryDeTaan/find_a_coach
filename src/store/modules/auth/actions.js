export default {
  login() {},
  async signup(context, payload) {
    const APIKey = 'AIzaSyA0iUxUnSP8scI4wfoWA2wBW1zZmiPXozg';
    const authUrl =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + APIKey;

    const response = await fetch(authUrl, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData);
      throw new Error(responseData.message || 'Failed to authenticate.');
    }

    context.commit('setUser', { responseData });
  },
};
