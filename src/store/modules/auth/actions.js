import router from '@/router/index';
export default {
  login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    const APIKey = 'AIzaSyA0iUxUnSP8scI4wfoWA2wBW1zZmiPXozg';
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
      APIKey;
    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        APIKey;
    }

    const response = await fetch(url, {
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

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    context.commit('setUser', { ...responseData });
  },
  logout(context) {
    context.commit('setUser', {
      responseData: {
        idToken: null,
        localId: null,
        expiresIn: null,
      },
    });
    router.replace('/coaches');
  },
};
