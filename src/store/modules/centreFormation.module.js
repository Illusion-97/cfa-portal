import { centreFormationApi } from "@/_api/centreFormation.api.js";

// const state = {
//     centreFormation: [],

// }

// const mutations = {
//     // SET_LOCATIONS: (state, data) => (state.centreFormation = data),
//     // ADD_NEW_LOCATION: (state, payload) => state.locations.push(payload),
//     // EDIT_LOCATION: (state, payload) => {
//     //   let index = state.locations.findIndex((l) => l.id === payload.id);
//     //   if (index !== -1) state.locations.splice(index, 1, payload);
//     // },
//     // REMOVE_LOCATION: (state, payload) => {
//     //   let index = state.locations.findIndex((l) => l.id === payload);
//     //   if (index !== -1) state.locations.splice(index, 1);
//     // },
//     // SET_ITEM_COUNT: (state, data) => (state.totalItemCount = data),
//   };
  

const actions = {
    /**
   * This method is calling the http call to fetch locations from the webservice Wdg2 (create or update depending if the location exists or not)
   *
   * @param  {Vuex} {dispatch} necessary if call dispatch inside the method
   * @param  {Object - LogInUser} logInUser user dg2
   * @returns {} it is returning nothing. The database is updated directly in the Back-End when the method is called.
   */
  async fetchCentreFormationDG2({ logInUser }) {
    await centreFormationApi.fetchAllCentreDeFormationsDG2Http(logInUser)
      .then((response) => {
        if (response.status === 202) {
        //   dispatch("loadLocations");
        //   dispatch(
        //     "notificationModule/showNotification",
        //     {
        //       messageAlert: i18n.t("messageStores.locationAllSuccess"),
        //       typeAlert: "success",
        //     },
        //     { root: true }
        //   );
        centreFormationApi.getAllByPage;
        
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
export default {
  namespaced: true,
  //state,
  //mutations,
  actions,
};
