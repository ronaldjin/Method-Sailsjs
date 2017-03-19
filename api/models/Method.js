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

    name: {
      type: 'string',
      required: true
    },

    url: {
      type: 'string'
    },

    nameFile: {
      type: 'string'
    },

    ownerID: {
      model: 'Register'
    },

    notes : {
      type: "text"
    }
  }
};
