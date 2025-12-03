import sponsorService from "@/api/sponsor.service";

import {
  FETCH_SPONSORS,
  ADD_SPONSOR,
  EDIT_SPONSOR,
  REMOVE_SPONSOR,
  SET_SPONSORS,
  SET_MESSAGE
} from "./sponsor.constants";

const state = {
  sponsors: [],
  message: ""
};

const getters = {
  getSponsors: state => state.sponsors,
  getSponsorsById: state => id => state.sponsors.find(s => s._id === id),
  getMessage: state => state.message
};

const actions = {

  async [FETCH_SPONSORS]({ commit, rootState }) {
    try {
      const res = await sponsorService.getSponsors(rootState.auth.token);
      commit(SET_SPONSORS, res);
      return res;
    } catch (err) {
      commit(SET_MESSAGE, err.message);
      throw err;
    }
  },

  async [ADD_SPONSOR]({ commit, rootState }, payload) {
    try {
      const res = await sponsorService.addSponsor(rootState.auth.token, payload);
      commit(SET_MESSAGE, `O sponsor ${res.name} foi adicionado com sucesso!`);
      return res;
    } catch (err) {
      commit(SET_MESSAGE, err.message);
      throw err;
    }
  },

  async [EDIT_SPONSOR]({ commit, rootState }, payload) {
    try {
      const res = await sponsorService.editSponsor(rootState.auth.token, payload);
      commit(SET_MESSAGE, `O sponsor ${res.name} foi atualizado com sucesso!`);
      return res;
    } catch (err) {
      commit(SET_MESSAGE, err.message);
      throw err;
    }
  },

  async [REMOVE_SPONSOR]({ commit, rootState }, id) {
    try {
      const res = await sponsorService.removeSponsor(rootState.auth.token, id);
      commit(SET_MESSAGE, "O sponsor foi removido com sucesso!");
      return res;
    } catch (err) {
      commit(SET_MESSAGE, err.message);
      throw err;
    }
  }
};


export const mutations = {
  [SET_SPONSORS](state, sponsors) {
    state.sponsors = sponsors;
  },

  [SET_MESSAGE](state, message) {
    state.message = message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
