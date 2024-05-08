// store/modules/mqttData.js

const state = {
  TDS: 0,
  PH: 0,
  TEMP: 0
};

const mutations = {
  SET_TDS(state, value) {
    state.TDS = value;
  },
  SET_PH(state, value) {
    state.PH = value;
  },
  SET_TEMP(state, value) {
    state.TEMP = value;
  }
};

const actions = {
  updateTDS({ commit }, value) {
    commit('SET_TDS', value);
  },
  updatePH({ commit }, value) {
    commit('SET_PH', value);
  },
  updateTEMP({ commit }, value) {
    commit('SET_TEMP', value);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
