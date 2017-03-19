/**
 * Created by Doleksii on 22.04.17.
 */


var wkhtmltopdf = require('wkhtmltopdf');
var fs = require('fs');
var EmailController = require('./EmailController');
module.exports = {

  "create" : function (req, res) {
    var verification  = req.param("verification");
    var html = req.param("html");

    verification.ownerID = req.session.User.id;

      Verification.create(verification).exec(function (err, virif) {
        if(err){
          console.log("Error(Created verification)");
          return;
        }

        Verification.find({ownerID: req.session.User.id}).exec(function (err, records) {
            if(err){
              console.log("Error(List verification)");
              return;
            }

          wkhtmltopdf("<h1>"+req.session.User.firstName+" "+req.session.User.lastName+" / "+verification.nameMethod+"</h1><p style='font-size: 30px'>"+html+"</p>").pipe(fs.createWriteStream("assets/images/pdf/"+virif.id+".pdf"));

          return res.ok(records);

        });
    });

  },
  "list" : function (req,res) {

    Verification.find({ownerID: req.session.User.id}).exec(function (err, records) {
      if (err) {
        console.log("Error(List verification)");
        return;
      }

      return res.ok(records);

    });
  },
  "status-list" : function (req,res) {
    var status  = req.param("status");

    Verification.find({status: status}).populate("ownerID").exec(function (err, records) {
      if (err) {
        console.log("Error(List verification)");
        return;
      }

      return res.ok({list :records});

    });

  },
  "change-status" : function (req,res) {
    var status = req.param("status");
    var id = req.param("id");

    Verification.update({id: id},{status: status}).exec(function afterwards(err, updated){

      if (err) {
        // handle error here- e.g. `res.serverError(err);`
        return;
      }

      Register.findOne({id : updated[0].ownerID}).exec(function (err, register) {
        Verification.find().populate("ownerID").exec(function (err, records) {
          if (err) {
            console.log("Error(List verification)");
            return;
          }

          var list = { pending : [],approved : [], denied : []};

          records.forEach(function (pdf) {
            switch(pdf.status){
              case 'pending' : {
                list.pending.push(pdf);
                break;
              }
              case 'approved' : {
                list.approved.push(pdf);
                break;
              }
              case 'denied' : {
                list.denied.push(pdf);
                break;
              }
            }
          });

         return EmailController.sendMessage(req,res,{
            email : register.email,
            nameMethod : updated[0].nameMethod,
            status : updated[0].status
          },list);

        });
      });

    });


  }

};
