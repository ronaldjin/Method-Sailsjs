/**
 * Created by Doleksii on 19.04.17.
 */

app.controller('homeCtrl', function ($scope,$http,methodRepository,verificationRepository) {

  $scope.adminListMethods = [];
  $scope.myListMethods = [];
  $scope.selectedMethod = undefined;
  $scope.selectedMyMethod = undefined;
  $scope.myPdfFiles = [];
  $scope.size = 4;

  methodRepository.allAdminMethods().success(function(data){
    $scope.adminListMethods = data.methods;
    $scope.selectedMethod = $scope.adminListMethods[0];
  });

  methodRepository.ownerList().success(function (data) {
    $scope.myListMethods = data.methods;
    $scope.selectedMyMethod = $scope.myListMethods[0];
  });

  verificationRepository.list().success(function (data) {
    $scope.myPdfFiles = data;
  });

  $scope.text = "";
  $scope.myText = "";

  $scope.result = "";
  $scope.myResult = "";

  $scope.userRule = function () {
    $scope.myResult += "<span class='title-orange'>Function: "+$scope.myText + "</span><br/>";

    methodRepository.run($scope.selectedMyMethod.nameFile,$scope.myText).success(function (data) {
    if(data.code !== 401){
      for(var key in data) {
        var obj = data[key];
        $scope.myResult +="<span class='text-red'>@home:~$  "+obj.name+"</span><br/>";
        if(Array.isArray(obj.value)){
          for(var i=0; i< obj.value.length; ++i){
            if(!Array.isArray(obj.value[i]) && typeof obj.value[i] === "object"){
              for(var key1 in obj.value[i]) {
                var obj1 = obj.value[i][key1];
                $scope.myResult +="<span class='text-red'>$ = "+obj1 .name+"</span><br/>";

                if(Array.isArray(obj1.value[0])){

                  for(var k=0; k < obj1.value.length; k++) {
                    var cm ="<span class='text-green text-retreat'>";
                    for(var m=0; m < obj1.value.length; m++) {
                      cm += " | " + obj1.value[k][m] + " | ";
                    }
                    $scope.myResult +=cm + "<span><br/>";
                  }

                }else{
                  $scope.myResult +="<span class='text-green text-retreat'>["+obj1.value.toString()+ "]<span><br/>";
                }
              }
            }else{
              if(typeof obj.value[i] == 'string' || typeof obj.value[i] == 'number'){
                if(i == 0){
                  $scope.myResult +="<span class='text-green text-retreat'>["+obj.value.toString()+ "]<span><br/>"
                }
              }
              if(Array.isArray(obj.value[i])){
                if(i == 0){

                  for(var k=0; k < obj.value.length; k++) {
                    var cm ="<span class='text-green text-retreat'>";
                    for(var m=0; m < obj.value.length; m++) {
                      cm += " | " + obj.value[k][m] + " | ";
                    }
                    $scope.myResult +=cm + "<span><br/>";
                  }

                }
              }
            }
          }


        }else{
          $scope.myResult +="<span class='text-green text-retreat'>"+ obj.value+ "<span><br/>";
        }


      }
      $scope.myResult +="" +
        "<span class='text-green'>" +
        "------------------" +
        "------------------" +
        "------------------" +
        "<span><br/>";
      $scope.myText = "";

      }else{
        $scope.myResult += "<span class='title-orange'>Error: "+data.message + "</span><br/>";
      }
    });
  };

  $scope.adminRule = function () {
    $scope.result += "<span class='title-orange'>Function: "+$scope.text + "</span><br/>"
    methodRepository.run($scope.selectedMethod.nameFile,$scope.text).success(function (data) {
      if(data.code !== 401) {
        for (var key in data) {
          var obj = data[key];
          $scope.result += "<span class='text-red'>@home:~$ " + obj.name + "</span><br/>";
          if (Array.isArray(obj.value)) {
            for (var i = 0; i < obj.value.length; ++i) {
              if (!Array.isArray(obj.value[i]) && typeof obj.value[i] === "object") {
                for (var key1 in obj.value[i]) {
                  var obj1 = obj.value[i][key1];
                  $scope.result += "<span class='text-red'>$ = " + obj1.name + "</span><br/>";

                  if (Array.isArray(obj1.value[0])) {

                    for (var k = 0; k < obj1.value.length; k++) {
                      var cm = "<span class='text-green text-retreat'>";
                      for (var m = 0; m < obj1.value.length; m++) {
                        cm += " | " + obj1.value[k][m] + " | ";
                      }
                      $scope.result += cm + "<span><br/>";
                    }

                  } else {
                    $scope.result += "<span class='text-green text-retreat'>[" + obj1.value.toString() + "]<span><br/>";
                  }
                }
              } else {
                if (typeof obj.value[i] == 'string' || typeof obj.value[i] == 'number') {
                  if (i == 0) {
                    $scope.result += "<span class='text-green text-retreat'>[" + obj.value.toString() + "]<span><br/>"
                  }
                }
                if (Array.isArray(obj.value[i])) {
                  if (i == 0) {

                    for (var k = 0; k < obj.value.length; k++) {
                      var cm = "<span class='text-green text-retreat'>";
                      for (var m = 0; m < obj.value.length; m++) {
                        cm += " | " + obj.value[k][m] + " | ";
                      }
                      $scope.result += cm + "<span><br/>";
                    }

                  }
                }
              }
            }


          } else {
            $scope.result +="<span class='text-green text-retreat'>"+ obj.value+ "<span><br/>";
          }


        }
        $scope.result += "" +
          "<span class='text-green'>" +
          "------------------" +
          "------------------" +
          "------------------" +
          "<span><br/>";
        $scope.text = "";
      }else{
        $scope.result += "<span class='title-orange'>Error: "+data.message + "</span><br/>";
      }
    });
  };

  $scope.createPdf = function () {
      indicatorstart("Creating...");
    var verification = {};
    var html = $scope.myResult;

    verification.nameMethod = $scope.selectedMyMethod.name;

    verificationRepository.create(verification,html).success(function (data) {
      $scope.myPdfFiles = data;
      setTimeout(function(){
        indicatorstop();
      }, 4000);
    });
  };

  $scope.clearTerminalMyResult = function () {
    $scope.myResult = "";
  };

  $scope.clearTerminalAdminResult = function () {
    $scope.result = "";
  };



});
