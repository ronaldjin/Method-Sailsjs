/**
 * Created by Doleksii on 19.03.17.
 */

app.factory('registerRepository', function ($http) {
  return {

    create: function(register) {
      return $http.post('/register/create', register).then(function (response) {
        return response.data;
      });
    },

    getRegisterById: function (id) {
      return $http.post('/register/getRegisterById',{id:id}).then(function (response) {
        return response.data;
      });
    },

    login : function (register) {
      return $http.post('/register/login',register).then(function (response) {
        return response.data;
      });
    }

  }
});
