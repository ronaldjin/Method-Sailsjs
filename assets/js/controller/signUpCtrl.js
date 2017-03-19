/**
 * Created by Doleksii on 16.03.17.
 */
app.controller('signUpCtrl', function ($scope, registerRepository) {

  $scope.register = {};

  $scope.create = function () {
    if (isValidCreateRegister()) {
      registerRepository.create($scope.register).then(function (data) {
        console.log(data);
      });
    }
  }

});



