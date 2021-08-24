export const planning =  {
    state: {
        planning: [],
    },
    getters: {
        getPlanning: state => {
            return state.planning;
            // return JSON.parse(localStorage.getItem('planning'))
        }
    },
    mutations: {
        SET_PLANNING(state, data){
            state.planning = data;
            // localStorage.setItem('planning', JSON.stringify(data))
        }
    },
    actions: {
        setPlanning({ commit }, data){
            commit('SET_PLANNING', data);
        }
    }
}
