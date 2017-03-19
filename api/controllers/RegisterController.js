/**
 * RegisterController
 *
 * @description :: Server-side logic for managing registers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passwordHash = require('password-hash');

module.exports = {

  //*****************views**************************
  "sign-up": function (req, res) {
    res.view('register/sign-up');
  },
  "sign-in": function (req, res) {
    res.view('register/sign-in');
  },
  "profile": function (req, res) {
    res.view('register/profile');
  },


  //*****************api*****************************
  "login": function (req, res) {
    //param : password
    //param : email

    var response = {
      hasError: true,
      code: 0,
      message: ''
    };

    var register = req.allParams();

    if(!register.email || !register.password){
      response.message = "Incorrect login or password";
      return res.ok(response);
    }

    Register.findOne({email: req.param('email')})
      .then(function (user) {
        if(!user){
          throw new Error("User not founded");
        }
        if (!passwordHash.verify(req.param('password'),user.password)) {
          throw new Error("Wrong password");
        }

        response.code = 200;
        response.hasError = false;

        req.session.User = user;
        req.session.authenticated = true;

        return res.ok(response);

      }, function (err) {
        throw new Error("Error find user " + err);
      })
      .catch(function (err) {
        response.message = err.message;
        return res.ok(response);
      });
  },
  "logout": function (req, res) {
    if(req.session.authenticated){
      req.session.authenticated = false;
      req.session.User = undefined;
    }
    return res.redirect('/register/sign-in');
  },
  "create": function (req, res) {
    var response = {
      hasError: true,
      code: 0,
      register: {},
      message: ''
    };

    var register = req.allParams();

    if(!register.password || register.password.length < 5 ){
      response.message = "Password is incorrect";
      return res.ok(response);
    }

    register.password =  passwordHash.generate(register.password);

    Register.create(register)
      .then(function (user) {

        response.code = 200;
        response.hasError = false;
        response.register = user;
        return res.ok(response);

      }, function (err) {
        throw new Error("Error create user" + err);
      })
      .catch(function (err) {
        response.code = 400;
        response.message = err.message;
        return res.ok(response);
      })
  },
  "getRegisterById" : function (req,res) {
    var response = {
      hasError: true,
      code: 0,
      register: {},
      message: ''
    };

    var id = req.param('id');

    Register.findOne({id:id})
      .then(function (register) {

        if(!register){
          throw new Error("User not founded");
        }

        response.code = 200;
        response.hasError = false;
        response.register = register;
        return res.ok(response);

      }, function (err) {
        throw new Error("Error create user" + err);
      })
      .catch(function (err) {
        response.code = 400;
        response.message = err.message;
        return res.ok(response);
      })

  }



};

