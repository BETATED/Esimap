// Script JavaScript pour CRUD group  via AJAX 


// Fonction pour ajouter un groupe
function addGroup() {
    const type = document.getElementById('type').value;
    const num = document.getElementById('num').value;
    var selectedUsers = $('#searchUser').select2('data');
    var iduserselected = [];
    selectedUsers.forEach(element => {
        iduserselected.push(element.id);

    });
    var JSONpayload = JSON.stringify({ "type": type, "num": num, "users": iduserselected });
    console.log(JSONpayload);
    console.log(iduserselected);
    // Afficher une fenêtre de confirmation
    const isConfirmed = window.confirm(`Confirmez-vous l'ajout du groupe ${type} - ${num} ?`);

    if (isConfirmed) {
        // Faire une requête AJAX pour ajouter un groupe à l'API Platform
        fetch('/api/groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/ld+json',
            },
            body: JSONpayload,
        })
            .then(response => response.json())
            .then(() => {
                // Fermer la modal d'ajout
                document.getElementById('addGroupModal').classList.remove('show');
                document.body.classList.remove('modal-open');
                document.querySelector('.modal-backdrop').remove();

                // Vider les champs de la modal d'ajout
                document.getElementById('type').value = '';
                document.getElementById('num').value = '';


                // Actualiser le tableau après l'ajout
                updateGroupsTable();
            })
            .catch(error => console.error('Error adding group:', error));
    }
}

// Fonction pour actualiser les données des groupes
function updateGroupsTable() {
    // Faire une requête AJAX pour récupérer les données des groupes depuis l'API Platform
    fetch('/api/groups')
        .then(response => response.json())
        .then(groups => {
            // Effacer le contenu actuel du tableau
            document.getElementById('groups-table').getElementsByTagName('tbody')[0].innerHTML = '';

            // Ajouter les nouvelles données des groupes au tableau
            groups['hydra:member'].forEach(group => {
                const newRow = `<tr>
                        <td>${group.type}</td>
                        <td>${group.num}</td>
                        <td>
                            <button type="button" class="btn btn-info" onclick="viewGroup(${group.id})" data-toggle="modal" data-target="#viewGroupModal">View</button>
                            <button type="button" class="btn btn-danger" onclick="deleteGroup(${group.id})" data-toggle="modal" data-target="#deleteGroupModal">Delete</button>
                        </td>
                    </tr>`;

                document.getElementById('groups-table').getElementsByTagName('tbody')[0].innerHTML += newRow;
            });
        })
        .catch(error => console.error('Error fetching groups:', error));
}

function getGroupInfoById(groupId) {
    document.getElementById('ModalSingleGroupId').value = groupId;
    fetch('/api/groups/' + groupId)
        .then(response => response.json())
        .then(group => {
            console.log(group);
            // Effacer le contenu actuel du tableau
            document.getElementById('groupe-table-by-id').getElementsByTagName('tbody')[0].innerHTML = '';

            //Indique l'id dans l'input hidden
            
            //Ajoute les informations du groupe 
            document.getElementById('modalGroupType').value = group.type;
            document.getElementById('modalGroupNum').value = group.num;
            // Ajouter les nouvelles données des groupes au tableau
            group.users.forEach(user => {
                fetch(user)
                    .then(response => response.json())
                    .then(userinfo => {
                        
                        console.log("userinfo");
                        console.log(userinfo);

                        const newRow = `<tr>
                        <td>${userinfo.firstname + " " + userinfo.lastname}</td>
                        
                        <td>
                            <button class="btnDeleteUserFromSingleGroup btn btn-danger" type="button" disabled >X</button>
                        </td>
                    </tr>`;

                        document.getElementById('viewGroupMembersTable').innerHTML += newRow;
                    })
            });
        }).finally( ()=>{
            hideLoadingIndicator("loadingIndicatorSingleGroup","groupSingleDetails");
        }
        )
        .catch(error => console.error('Error fetching groups:', error));
}

// Fonction pour voir un groupe
function viewGroup(groupId) {
    showLoadingIndicator("loadingIndicatorSingleGroup","groupSingleDetails");
    document.getElementById('addUserToSingleGroup').style.display = "none";
    getGroupInfoById(groupId);
    // Implémenter la logique pour voir un groupe
    // Tu peux mettre à jour la modal correspondante ici si nécessaire
    console.log('View Group:', groupId);


}

// Fonction pour éditer un groupe
function editGroup() {
    
    document.getElementById('modalGroupType').disabled = "";
    document.getElementById('viewGroupNum').disabled = "";
    document.getElementById('addUserToSingleGroup').style.display = "block";
const matches = document.getElementsByClassName("btnDeleteUserFromSingleGroup");

for (let i = 0; i < matches.length; i++) {
  matches[i].disabled = "";
}
    
    
}

// Fonction pour supprimer un groupe
function deleteGroup(groupId) {
    // Implémenter la logique pour supprimer un groupe
    // Tu peux mettre à jour la modal correspondante ici si nécessaire
    console.log('Delete Group:', groupId);
}

// Appeler la fonction pour la première fois au chargement de la page
updateGroupsTable();

// Actualiser les données toutes les X secondes (par exemple, toutes les 10 secondes)
//setInterval(updateGroupsTable, 10000);
