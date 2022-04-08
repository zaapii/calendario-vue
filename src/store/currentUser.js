const state = {
  token: null,
  email: null,
  name: null,
};

const getters = {
  getCurrentUserEmail: (state) => state.email,
  getCurrentUserToken: (state) => state.token,
  getCurrentUserName: (state) => state.name,
  isAuthenticated: (state) => !!state.token,
};

const actions = {
  setCurrentUser({ commit }, payload) {
    commit("setNewCurrentUser", payload);
  },
  logOutCurrentUser({ commit }) {
    commit("logOutCurrentUser");
  },
};

const mutations = {
  setNewCurrentUser: (state, newCurrentUser) => {
    console.log(newCurrentUser);
    state.token = newCurrentUser.token;
    state.email = newCurrentUser.email;
    state.name = newCurrentUser.name;
  },

  logOutCurrentUser: (state) => {
    state.token = null;
    state.email = null;
    state.name = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
