$(document).ready(function () {

  /* Connecting to the API server */
  let createTask = function() {
    $.ajax({
      type: 'POST',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=140',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#input-task').val()
        }
      }),
      success: function (response, textStatus) {
        console.log(response);
      },
      error: function(request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

 $('#input-form').on('submit', function(e) {
    e.preventDefault();
    createTask();
  });

});
