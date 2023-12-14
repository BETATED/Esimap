// Appelle initSelect2 lorsque le document est prêt
$(document).ready(function () {
    initSelect2SearchUser();
});

// Fonction pour initialiser Select2 sur le champ de recherche d'utilisateur
function initSelect2SearchUser() {
    var select2elements = document.getElementsByClassName('searchUserSelector');
    //for (let i = 0; i < select2elements.length; i++) {
    
      
    $("#searchUser2").select2({
        minimumInputLength: 3 ,
        
        ajax: {
            url: function (params) {
                return '/api/users?lastname=' + params.term;
            },
            dataType: 'json',
            processResults: function (data) {

                // Formatage des données pour Select2
                var users = data['hydra:member'].map(function (user) {
                    return {
                        id: "/api/users/" + user.id,
                        text: user.firstname + ' ' + user.lastname
                    };
                });

                return {
                    results: users
                };
            },
            cache: true
        }
        //placeholder: 'Rechercher un utilisateur',
        // Ajouter d'autres options selon les besoins
    });
}//}
