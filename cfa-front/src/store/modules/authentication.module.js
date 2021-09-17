import store from '../store.js'

export const authentication = {
    state:{
        token: null,
        isUserLoggedIn: false,
    },
    getters: {
        getToken: state => {
            return state.token;
        },
        isUserLoggedIn: state => {
            return state.isUserLoggedIn;
        }
    },
    mutations: {
        login(state, data){
            state.token = data;
            state.isUserLoggedIn = true;

        },
        logout: state => {
            state.token = null // Only in my setup remove session token
            state.isUserLoggedIn = false // this will trigger the vue-persist-store plugin to set all state to empty on the location relaod    
            store.dispatch('setPlanning',{});
            store.dispatch('setUtilisateur',{});

            //Ne marche pas 
            // store.dispatch('setPlanning',null);
            // store.dispatch('setUtilisateur',null);
        },
    },
    actions: {
        login({ commit }, data){
            commit('login',data);
        },
        logout ({ commit }) {    
          commit('logout') 
          location.reload()  
        }
    },
}