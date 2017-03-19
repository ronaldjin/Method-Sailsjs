/**
 * Created by Doleksii on 19.03.17.
 */

app.factory('verificationRepository', function ($http) {
  return {

    create: function(verification,html) {
      return $http.post('/verification/create', {verification : verification ,html : html});
    },

    list: function () {
      return $http.get('/verification/list');
    },

    statusList: function (status) {
      return $http.post('/verification/status-list',{status : status});
    },

    changeStatus : function (status,id) {
      return $http.post('/verification/change-status',{status : status,id : id});
    }

  }
});
