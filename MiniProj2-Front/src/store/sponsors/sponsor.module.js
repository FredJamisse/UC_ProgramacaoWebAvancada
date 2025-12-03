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
  getSponsorById: state => id => state.sponsors.find(s => s._id === id),
  getMessage: state => state.message
};

const actions = {

  async [FETCH_SPONSORS]({ commit, rootState }) {
    const res = await sponsorService.getSponsors(rootState.auth.token);
    commit(SET_SPONSORS, res.body); 
    return res.body;
  },

  async [ADD_SPONSOR]({ commit, rootState }, payload) {
    const res = await sponsorService.addSponsor(rootState.auth.token, payload);
    commit(SET_MESSAGE, `O sponsor ${res.body.nome} foi adicionado com sucesso!`);
    return res.body;
  },

  async [EDIT_SPONSOR]({ commit, rootState }, payload) {
    const res = await sponsorService.editSponsor(rootState.auth.token, payload);
    commit(SET_MESSAGE, `O sponsor ${res.body.nome} foi atualizado com sucesso!`);
    return res.body;
  },

  async [REMOVE_SPONSOR]({ commit, rootState }, id) {
    await sponsorService.removeSponsor(rootState.auth.token, id);
    commit(SET_MESSAGE, "O sponsor foi removido com sucesso!");
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
