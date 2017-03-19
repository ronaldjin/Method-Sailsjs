/**
 * Created by Doleksii on 23.04.17.
 */



module.exports = {

  sendMessage: function (req, res,request,list) {

    sails.hooks.email.send('verification', {
        name : request.nameMethod,
        status : request.status
      }, {
        to: request.email,
        subject: "Verification from TestingMaths"
      },
      function (data) {
        if (data == null) {
          return res.ok({list :list});
        }
        console.log(data);
      });
  }

};
