function initGroupModal(actiontype) {

    switch (actiontype) {
        case "add":
            console.log("initmodal Add");
            clearModalGroup();
            hideLoadingIndicator("loadingIndicatorSingleGroup","groupSingleDetails");
            document.getElementById('modalGroupType').disabled = "";
            document.getElementById('modalGroupNum').disabled = "";
            document.getElementById('addUserToSingleGroup').style.display = "block";
            document.getElementById('btnModifySingleGroup').style.display = "none";
            break;
    
        case "view":
            clearModalGroup();
            document.getElementById('btnModifySingleGroup').style.display = "block";
            document.getElementById('addUserToSingleGroup').style.display = "none";
            document.getElementById('modalGroupType').disabled = "disabled";
            document.getElementById('modalGroupNum').disabled = "disabled";
            console.log("initmodal view");
        break;
    
        default:
            break;
    }
    
}

function clearModalGroup() {
    
    // Vider les champs de la modal
    document.getElementById('modalGroupType').value = '';
    document.getElementById('modalGroupNum').value = '';
    // Effacer le contenu actuel du tableau
    document.getElementById('groupe-table-by-id').getElementsByTagName('tbody')[0].innerHTML = '';

}