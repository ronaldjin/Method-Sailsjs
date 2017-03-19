/**
 * Created by Doleksii on 22.03.17.
 */

app.controller('profileCtrl', function ($scope,$http,methodRepository,verificationRepository,FileUploader) {

  $scope.methodName = "";
  $scope.notes = "";
  $scope.method = {};

  $scope.pendingList = [];
  $scope.approvedList =[];
  $scope.deniedList = [];

  $scope.linkValue = location.search.split('link=')[1];

  $('.nav-tabs a[href="#' + $scope.linkValue + '"]').tab('show')

  var uploader = $scope.uploader = new FileUploader();
  uploader.filters.push({
    name: 'imageFilter',
    fn: function (item /*{File|FileLikeObject}*/, options) {
      var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
      return true;
    }
  });

  $scope.create = function () {

    if(isValidCreateMethod(uploader.queue)){

      indicatorstart("Saving....");
      var formData = new FormData();
      formData.append('methodName',$scope.methodName);
      formData.append('file', uploader.queue[0]._file);
      methodRepository.create(formData).success(function (data) {
        methodRepository.updateNotesByMethodId(data.id,$scope.notes).success(function () {
          indicatorstop();
        });
      });
    }

  };

  $scope.ownerList = [];

  methodRepository.ownerList().success(function (data) {
    $scope.ownerList = data.methods;
  });

  verificationRepository.statusList("pending").success(function (data) {
    $scope.pendingList = data.list;
  });

  verificationRepository.statusList("approved").success(function (data) {
    $scope.approvedList = data.list;
  });

  verificationRepository.statusList("denied").success(function (data) {
    $scope.deniedList = data.list;
  });


  $scope.remove = function (id) {
    methodRepository.remove(id).success(function (data) {
      $scope.ownerList = data.methods;
    });
  }

  $scope.setUpdateValue = function (method) {
    $scope.method.name  = method.name;
    $scope.method.notes = method.notes;
    $scope.method.id = method.id;
  };

  $scope.editMethod = function () {
    methodRepository.update($scope.method).success(function (data) {
      $scope.ownerList = data.methods;
    });
  }

  $scope.changeStatus = function (status , id) {
    indicatorstart("Updating...");
    verificationRepository.changeStatus(status,id).success(function (data) {
      $scope.pendingList = data.list.pending;
      $scope.approvedList = data.list.approved;
      $scope.deniedList = data.list.denied;
      indicatorstop();
    });
  }


});
