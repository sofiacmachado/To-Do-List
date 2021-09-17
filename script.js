/* Connecting to the API server */

$.ajax({
  type: 'GET',
  url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=140',
  dataType: 'json',
  success: function (response, textStatus) {
    console.log(response);
  },
  error: function(request, textStatus, errorMessage) {
    console.log(errorMessage);
  }
});
