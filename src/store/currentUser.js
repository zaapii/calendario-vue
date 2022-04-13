const state = {
  token: null,
  email: null,
  name: null,
  googleCalendarEvents: null,
};

const getters = {
  getCurrentUserEmail: (state) => state.email,
  getCurrentUserToken: (state) => state.token,
  getCurrentUserName: (state) => state.name,
  getGoogleCalendarEvents: (state) => state.googleCalendarEvents,
  isAuthenticated: (state) => !!state.token,
};

const actions = {
  setCurrentUser({ commit }, payload) {
    commit("setNewCurrentUser", payload);
  },
  logOutCurrentUser({ commit }) {
    commit("logOutCurrentUser");
  },
  setGoogleCalendarEvents({commit}, payload)
  {
    commit("setGoogleCalendarEvents", payload);
  }
};

const mutations = {
  setNewCurrentUser: (state, newCurrentUser) => {
    console.log(newCurrentUser);
    state.token = newCurrentUser.token;
    state.email = newCurrentUser.email;
    state.name = newCurrentUser.name;
  },
  setGoogleCalendarEvents(state, eventos)
  {
    state.googleCalendarEvents = eventos
  },
  logOutCurrentUser: (state) => {
    state.token = null;
    state.email = null;
    state.name = null;
    state.googleCalendarEvents = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
