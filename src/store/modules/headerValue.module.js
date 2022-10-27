export const headerValue = {
    state: {
        display: "",
    },
    getters: {
        getHeaderValue: state => {
            return state.display;
        }
    },
    mutations: {
        setDisplay(state, data){
            state.display = data;
        }
    },
    actions: {
        setDisplay ({commit}, data) {
            commit("setDisplay", data);
        }
    }
}