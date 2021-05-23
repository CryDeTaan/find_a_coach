export default {
  async contactCoach(context, data) {
    const newRequest = {
      // id: new Date().toISOString(), // Firebase will generate ID for us.
      // coachId: data.coachId, // The URI contains the coach ID, so no need in payload
      userEmail: data.email,
      message: data.message,
    };
    const baseUrl =
      'https://find-a-coach-using-vue3-default-rtdb.europe-west1.firebasedatabase.app/';
    const response = await fetch(baseUrl + `requests/${data.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.message ||
          'Failed to contact the coach at this time, please try again later.'
      );
    }

    newRequest.id = responseData.name;
    newRequest.coachId = data.coachId;

    context.commit('addRequest', newRequest);
    // context.commit('registerCoach', { ...coachData, id: userId });
  },
  async fetchRequests(context) {
    const coachId = context.rootState.userId;

    const baseUrl =
      'https://find-a-coach-using-vue3-default-rtdb.europe-west1.firebasedatabase.app';

    const response = await fetch(`${baseUrl}/requests/${coachId}.json`);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Failed to get coach's requests");
    }
    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key, // UserId is stored in URL
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }

    context.commit('setRequests', requests);
  },
};
