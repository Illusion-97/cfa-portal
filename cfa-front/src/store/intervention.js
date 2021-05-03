import axios from "axios";

class InterventionStore {
  constructor() {
    this.state = {
      interventions: [],
    };
  }

  getAllIntervention() {
    axios
      .get("http://localhost:8080/AppliCFABack/interventions/")
      .then((response) => response.data)
      .catch((err) => console.error(err));
  }
}

let interventionStore = new InterventionStore();
export default interventionStore;
