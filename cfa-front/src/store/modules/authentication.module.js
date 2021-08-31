export const authentication = {
    state:{
        token: null,
        isUserLoggedIn: false,
    },
    getters: {
        getToken: state => {
            return state.token;
            // console.log("localStorage.getItem('jwt') = ", localStorage.getItem('jwt'));
            // return localStorage.getItem('jwt')
        },
        isUserLoggedIn: state => {
            return state.isUserLoggedIn;
            // return localStorage.getItem('isUserLoggedIn')
        }
    },
    mutations: {
        login(state, data){
            state.token = data;
            state.isUserLoggedIn = true;

            // console.log("mutation = ", data);
            // localStorage.setItem('jwt', data);
            // localStorage.setItem('isUserLoggedIn', true);
            // console.log("login(data) = ", data);
            // console.log("localStorage.getItem('jwt') = ",localStorage.getItem('jwt'));
        },
        logout: state => {
          state.token = null // Only in my setup remove session token
          state.isUserLoggedIn = false // this will trigger the vue-persist-store plugin to set all state to empty on the location relaod  

        //   localStorage.setItem('jwt', null);
        //   localStorage.setItem('isUserLoggedIn', false);
        },
    },
    actions: {
        login({ commit }, data){
            // console.log("action data = ", data);
            commit('login',data);
        },
        logout ({ commit }) {    
          commit('logout') 
          location.reload()  
        }
    },
}