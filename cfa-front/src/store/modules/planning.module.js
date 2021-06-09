export default {
    state: () => ([]),
    getters: {
        getPlanning: state => {
            return state;
        }
    },
    mutations: {
        SET_PLANNING(state, data){
            state = data;
        }
    },
    actions: {
        setPlanning({ commit }, data){
            commit('SET_PLANNING', data);
        }
    }
}
