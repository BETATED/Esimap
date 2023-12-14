// Fonction pour afficher l'indicateur de chargement
function showLoadingIndicator(LoadingId , hideSectionId) {
    document.getElementById(LoadingId).style.display = 'block';
    document.getElementById(hideSectionId).style.display = 'none';
}

// Fonction pour masquer l'indicateur de chargement et afficher les détails du groupe
function hideLoadingIndicator(LoadingId,hideSectionId) {
    document.getElementById(LoadingId).style.display = 'none';
    document.getElementById(hideSectionId).style.display = 'block';
}