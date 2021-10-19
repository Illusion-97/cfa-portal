export const planning =  {
    state: {
        planning: [],
    },
    getters: {
        getPlanning: state => {
            return state.planning;
        }

    },
    mutations: {
        SET_PLANNING(state, data){
            state.planning = data;
        }

    },
    actions: {
        setPlanning({ commit }, data){
            commit('SET_PLANNING', data);
        }
    }
}
