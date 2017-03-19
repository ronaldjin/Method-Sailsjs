/**
 * Created by Doleksii on 20.03.17.
 */


function isValidCreateRegister() {
  var contentText = '';

  var password = $.trim($("#password").val());

  $("#password").css('background-color', 'white');
  if (password.length <= 5) {
    $("#password").css('background-color', 'rgb(255, 242, 239)');
    contentText += '<li class="error-li">Password must be at least 6 characters</li>';
  }

  var firstName = $.trim($("#firstName").val());

  if(firstName.length <= 1){
    $("#firstName").css('background-color', 'rgb(255, 242, 239)');
    contentText += '<li class="error-li">FirstName must be at least 2 characters</li>';
  }

  var lastName = $.trim($("#lastName").val());

  if(lastName.length <= 1){
    $("#lastName").css('background-color', 'rgb(255, 242, 239)');
    contentText += '<li class="error-li">LastName must be at least 2 characters</li>';
  }



  var confirmPassword = $.trim($("#confirmPassword").val());

  if(password !== confirmPassword){
    $("#confirmPassword").css('background-color', 'rgb(255, 242, 239)');
    contentText += '<li class="error-li">The passwords do not match</li>';
  }

  var email = $.trim($("#email").val());

  $("#email").css('background-color','white');

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(email))
  {
    $("#email").css('background-color','rgb(255, 242, 239)');
    contentText += '<li class="error-li"> Email incorrect</li>';
  }


  if (contentText !== '') {
    $('button[data-toggle="popover"]').attr('data-content', contentText).popover('show').focusout(function () {
      $('button[data-toggle="popover"]').popover('destroy');
    });
    return false;
  } else {
    $('button[data-toggle="popover"]').popover('destroy');

  }
  return true;
}



function isValidCreateMethod(arrayFile){

  var contentText = '';

  if (arrayFile.length !== 1) {
    contentText += '<li class="error-li">You must upload file with your Method</li>';
  }

  var name = $.trim($("#name").val());

  $("#name").css('background-color', 'white');
  if (name.length <= 2) {
    $("#name").css('background-color', 'rgb(255, 242, 239)');
    contentText += '<li class="error-li">Name must be at least 2 characters</li>';
  }

  if (contentText !== '') {
    $('button[data-toggle="popover"]').attr('data-content', contentText).popover('show').focusout(function () {
      $('button[data-toggle="popover"]').popover('destroy');
    });
    return false;
  } else {
    $('button[data-toggle="popover"]').popover('destroy');

  }
  return true;

}




