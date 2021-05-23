export default {
  async registerCoach(context, data) {
    const userId = context.rootState.userId;

    const coachData = {
      // id: context.rootState.userId, // UserId is stored in URL
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };
    const baseUrl =
      'https://find-a-coach-using-vue3-default-rtdb.europe-west1.firebasedatabase.app/';

    const response = await fetch(baseUrl + `coaches/${userId}.json`, {
      method: 'PUT',
      body: JSON.stringify(coachData),
    });

    if (!response.ok) {
      // error ..
    }

    context.commit('registerCoach', { ...coachData, id: userId });
  },
};
