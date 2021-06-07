import { Role } from "@/_helpers/role.js"
import store from "@/_helpers/store.js";

export const utilisateurService = {
    isAdmin,
    isCEF,
    isReferent,
    isFormateur,
    isEtudiant,
};

function isAdmin(){
    let roles = store.getters.getUtilisateur.role;

    if(!roles.length)
        return false;

    for(let i=0; i<roles.length; i++)
        if(roles[i] == Role.Admin) 
            return true;

    return false;
}

function isCEF(){
    let roles = store.getters.getUtilisateur.role

    if(!roles.length)
        return false;

    for(let i=0; i<roles.length; i++)
        if(roles[i] == Role.Admin)
            return true;
    
    return false;
}

function isReferent(){
    let roles = store.getters.getUtilisateur.role

    if(!roles.length)
        return false;

    for(let i=0; i<roles.length; i++)
        if(roles[i] == Role.Admin)
            return true;

    return false;
}

function isFormateur(){
    let roles = store.getters.getUtilisateur.role

    if(!roles.length)
        return false;

    for(let i=0; i<roles.length; i++)
        if(roles[i] == Role.Admin)
            return true;
    
    return false;
}

function isEtudiant(){

    console.log("store = " + store)
    console.log("store.getters.getUtilisateur = " , store.getters.getUtilisateur);
    console.log("store.getters.getUtilisateur.id = ", store.getters.getUtilisateur.id);
    console.log("store.getters.getUtilisateur.role = ", store.getters.getUtilisateur.role);
    console.log("store.getters.getUtilisateur.rolesDto = ", store.getters.getUtilisateur.rolesDto);

    let roles = store.getters.getUtilisateur.rolesDto;

    if(!roles.length)
        return false;

    for(let i=0; i<roles.length; i++)
        if(roles[i] == Role.Admin)
            return true;

    return false;
}