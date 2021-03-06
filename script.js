$(document).ready(function () {

  /* display task */
  
  let displayTask = function() {
    $.ajax({
      type: 'GET',
      url:'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=140',
      dataType:'json',
      success: function (response, textStatus) {
        $('#todo-list').empty();

        response.tasks.forEach(function (task) {
          
  console.log(response);
          $('#todo-list').append('<div class="row"><p class="col-9" id="new-todo">' + task.content +
          '</p><button class="btn btn-danger delete btn-sm" data-id="' + task.id +
           '"><i class="fas fa-minus"></i></button><input type="checkbox" id="check-complete" class="mark-complete ml-2" data-id="'
           + task.id + '"' + (task.completed ? 'checked' : '') + '>');
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
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=140',
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

  /* delete a task */
  let deleteTask = function (id) {
    $.ajax({
    type:'DELETE',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=140',
    success: function(response, textStatus) {
      displayTask();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  })
}

$(document).on('click', '.delete', function () {
  deleteTask($(this).data('id'))
});

/* Mark Complete */
 let markComplete = function (id) {
   $.ajax({
    type:'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id +'/mark_complete?api_key=140',
    dataType: 'json',
    success: function (response, textStatus) {
      displayTask();
    },
    error: function(request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  })
}




/* Mark Active */
let activeTask = function(id) {
  $.ajax({
    type:'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id +'/mark_active?api_key=140',
    dataType: 'json',
    success: function(response, textStatus) {
      displayTask();
    },
    error: function (request, textStatus, errorMessage){
      console.log(errorMessage);
    }
  })
}

$(document).on('change', '.mark-complete', function() {
  if (this.checked) {
    markComplete($(this).data('id'));
  } else {
    activeTask($(this).data('id'));
  }
})


/* Filter Tasks */


$(document).on('change', '#active-btn', function() {
  if (this.checked) {
    $(".mark-complete:checked").parent().hide();
  } else {
    $(".mark-complete:checked").parent().show();
  }
});

$(document).on('change', '#complete-btn', function() {
  if (this.checked) {
    $(".mark-complete:not(:checked)").parent().hide();
  } else {
    $(".mark-complete:not(:checked)").parent().show();
  }
});

});

  

