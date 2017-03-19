/**
 * Created by Doleksii on 22.04.17.
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

    nameMethod: {
      type: 'string'
    },

    ownerID: {
      model: 'Register'
    },

    status : {
      type: 'string',
      enum: ['pending', 'approved', 'denied'],
      defaultsTo: function () {
        return "pending";
      }
    },

    date : {
      type : 'date',
      defaultsTo: function () {
        return new Date();
      }
    }


  }

};
