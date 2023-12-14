




$(document).ready(function () {
    //var company_datatable_var = new DataTable('#company_datatable');

    $('#company_datatable').DataTable({
        "ajax": {
           "url": "http://localhost:8000/api/companies", // Remplace par le chemin de ton endpoint API Platform
           "dataSrc": "hydra:member"
        },
        "columns": [
           {"data": "name"},
           {"data": "address"},
           {"data": "city"},
           {"data": "country"},
           {"data": "website"},
        ]
     });

     
  });
