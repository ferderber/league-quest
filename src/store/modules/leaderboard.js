import * as types from '../mutation-types';
import auth from '../../api/auth';

types.UPDATE_PAGINATION = 'UPDATE_PAGINATION';
types.SORT_STATS = 'SORT_STATS';

const state = {
  stats: [],
  filteredStats: [],
  page: 1,
  size: 5,
  sortDirection: 'desc',
  sortProperty: 'points'
};

const getters = {
  stats: state => state.stats,
  length: state => state.stats.length,
  filteredStats: state => state.filteredStats,
  page: state => state.page,
  size: state => state.size,
  sortDirection: state => state.sortDirection
};
const actions = {
  getStats ({ commit, state }) {
    if (localStorage.getItem('token')) {
      return auth.getStats()
      .then((res) => {
        commit(types.UPDATE_STATS, res);
      }).catch(err => commit(types.SHOW_NOTIFICATION, err));
    } else { commit(types.REDIRECT_LOGIN); }
  },
  page ({ commit, state }, data) {
    commit(types.UPDATE_PAGINATION, data);
  },
  sort ({ commit, state }, data) {
    commit(types.SORT_STATS, data);
  }
};

const mutations = {
  [types.UPDATE_STATS] (state, stats) {
    state.stats = stats;
    state.filteredStats = sliceToPage(stats.concat().sort(getComparsion(state)), state);
  },
  [types.UPDATE_PAGINATION] (state, data) {
    state.page = data.page;
    state.size = data.size;
    state.filteredStats = sliceToPage(state.stats.concat().sort(getComparsion(state)), state);
  },
  [types.SORT_STATS] (state, data) {
    state.sortDirection = data.type;
    state.sortProperty = data.name;
    state.filteredStats = sliceToPage(state.stats.concat().sort(getComparsion(state)), state);
  }
};
function sliceToPage (arr, state) {
  return arr.slice((state.page - 1) * state.size, (state.page - 1) * state.size + state.size);
}
function getComparsion (state) {
  if (state.sortProperty === 'points') {
    return (item1, item2) => comparePoints(item1[state.sortProperty], item2[state.sortProperty], state);
  } else {
    return (item1, item2) => compareStrings(item1[state.sortProperty], item2[state.sortProperty], state);
  }
}
function compareStrings (item1, item2, state) {
  return (state.sortDirection === 'asc' ? item1.toLowerCase().localeCompare(item2.toLowerCase()) : item2.toLowerCase().localeCompare(item1.toLowerCase()));
}
function comparePoints (item1, item2, state) {
  return (state.sortDirection === 'asc' ? item1 - item2 : item2 - item1);
}
export default {
  state,
  getters,
  actions,
  mutations
};
