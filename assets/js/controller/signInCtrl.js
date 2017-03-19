/**
 * Created by Doleksii on 19.03.17.
 */
/**
 * Created by Doleksii on 16.03.17.
 */
app.controller('signInCtrl', function ($scope, registerRepository) {

  $scope.register = {};
  $scope.valid = "";

  $scope.login = function () {

    registerRepository.login($scope.register).then(function (data) {
      if(data.code == 200){
        window.location.href = '/';
      }else{
        $scope.valid = data.message;
      }
    });

  }

});



