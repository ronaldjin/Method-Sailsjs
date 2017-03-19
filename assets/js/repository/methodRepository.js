/**
 * Created by Doleksii on 18.04.17.
 */


app.factory('methodRepository', function ($http) {
  return {
    create: function(method) {
      return $http.post('/method/create', method, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      });
    },

    ownerList : function () {
      return $http.get('/method/ownerList');
    },

    remove : function (id) {
      return $http.post('/method/remove',{id : id});
    },

    allAdminMethods : function () {
      return $http.get('/method/allAdminMethods');
    },

    updateNotesByMethodId : function (methodId,notes) {
      return $http.post('/method/updateNotesByMethodId',{id : methodId,notes : notes});
    },

    run : function (nameFile,text) {
      return $http.post('/method/run',{nameFile : nameFile, text : text});
    },

    createPdf : function (html) {
      return $http.post('/method/create-pdf',{html : html});
    },

    update : function (method) {
      return $http.post('/method/update',{method : method});
    }
  }
});

