const state = {
  displayName: "",
  user: null
};

const getters = {
  isSignedIn: state => state.displayName !== "" && state.user !== null,
  getUser: state => state.user,
  getDisplayName: state => state.displayName
};

const mutations = {
  setUser(state, user) {
    state.displayName = user.displayName;
    state.user = user;
  },
  clearUser(state) {
    state.displayName = "";
    state.user = null;
  }
};

export default {
  state,
  mutations,
  getters
};
