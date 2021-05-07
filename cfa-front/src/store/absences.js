import axios from "axios";

class AbsencesStore {
    constructor() {
        this.state = {
            absence: {},
        };
    }

    getAbsencebyId1() {
        axios
            .get("http://localhost:8080/AppliCFABack/absences/1")
            .then((response) => response.data)
            .catch((err) => console.error(err));
    }
}

let absencesStore = new AbsencesStore();
export default absencesStore;