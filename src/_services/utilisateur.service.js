import store from "@/store/store.js";

export const utilisateurService = {
    isAdmin,
    isCEF,
    isReferent,
    isFormateur,
    isEtudiant,
};


function isAdmin(){
    let roles = store.getters.getUtilisateur.rolesDto;

    if(!roles.length)
        return false;

    for(let i=0; i<roles.length; i++)
        if(roles[i].intitule == "ADMIN") 
            return true;

    return false;
}

function isCEF(){
    let roles = store.getters.getUtilisateur.rolesDto

    if(!roles.length)
        return false;

    for(let i=0; i<roles.length; i++)
        if(roles[i].intitule == "CEF")
            return true;
    
    return false;
}

function isReferent(){
    let roles = store.getters.getUtilisateur.rolesDto

    if(!roles.length)
        return false;

    for(let i=0; i<roles.length; i++)
        if(roles[i].intitule == "REFERENT")
            return true;

    return false;
}

function isFormateur(){
    let roles = store.getters.getUtilisateur.rolesDto

    if(!roles.length)
        return false;

    for(let i=0; i<roles.length; i++)
        if(roles[i].intitule == "FORMATEUR")
            return true;
    
    return false;
}

function isEtudiant(){
    let roles = store.getters.getUtilisateur.rolesDto;
    if(!roles.length)
        return false;

    for(let i=0; i<roles.length; i++)
        if(roles[i].intitule == "ETUDIANT")
            return true;

    return false;
    
}