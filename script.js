$(document).ready(function () {

  /* display task */
  
  let displayTask = function() {
    $.ajax({
      type: 'GET',
      url:'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=1',
      dataType:'json',
      success: function (response, textStatus) {
        $('#todo-list').empty();
        response.tasks.forEach(function (task) {
          $('#todo-list').append('<p>' + task.content + '</p>');
        })
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    })
  }

  /* create task */
  let createTask = function() {
    $.ajax({
      type: 'POST',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=1',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#input-task').val()
        }
      }),
      success: function (response, textStatus) {
        $('#input-task').val('');
        displayTask();
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

  displayTask();
  
});
