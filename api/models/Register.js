/**
 * Register.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var uuid = require("node-uuid");
module.exports = {
  connection: 'worldMongo',

  attributes: {
    id: {
      type: 'string',
      required: true,
      unique: true,
      primaryKey: true,
      defaultsTo: function () {
        return uuid.v4();
      }
    },

    email: {
      type: 'string',
      required: true,
      unique: true
    },

    firstName: {
      type: 'string',
    },

    lastName: {
      type: 'string',
    },

    password : {
      type: 'string',
    },

    role: {
      type: 'string',
      defaultsTo: function () {
        return 'user';
      }
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }

  }
};

