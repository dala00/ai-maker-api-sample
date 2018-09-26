export const state = () => ({
  user: null,
  loingAIId: null
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setLoginAIId(state, id) {
    state.loginAIId = id;
  }
};
