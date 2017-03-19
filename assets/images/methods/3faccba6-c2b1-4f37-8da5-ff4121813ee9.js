/**
 * Register.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var math = require('mathjs');
var matrixInverse = require('matrix-inverse');

module.exports = {

  norma : function (v1,v2) {
    var result = math.subtract(v1,v2);
    result = result.map(function (x) {
      return x*x;
    });
    var nor  = 0;
    for(var i = 0; i < result.length; ++i){
      nor += result[i];
    }
    return nor;
  },

  derivative :function (f1p,abc,map) {
    var f1pxyz = [];
    for(var i = 0; i < abc.length; ++i){
      f1pxyz.push(math.eval(f1p[i],map));
    }
    return f1pxyz;
  },

  hesse : function (f1p,abc,map) {
    var f2result = [];

    for(var i=0; i < abc.length; i++) {
      f2result[i] = [];
      for(var j=0; j < abc.length; j++) {
        f2result[i][j] = math.eval(math.string(math.derivative(f1p[i], abc[j])),map);
      }
    }
    return f2result;
  },

  toMap : function (vector,abc) {
    var map = {};
    for(var i = 0; i < vector.length;++i){
      eval("map."+abc[i]+"="+vector[i]);
    }
    return map;
  },

  newton : function(f,vector,abc){
    // vector = [];
    // abc = [];
    // f - String

    var func = f;
    var length = vector.length;


    var f1p = [];

    for(var i = 0; i < abc.length; ++i){
      f1p.push(math.string(math.derivative(func, abc[i])));
    }

    var f2p = [];

    for(var i=0; i < length; i++) {
      f2p[i] = [];
      for(var j=0; j < length; j++) {
        f2p[i][j] = math.string(math.derivative(f1p[i], abc[j]));
      }
    }

    var xk = [] ,derivative = [], hesse = [],inverse = [];

    xk.push({value : vector , name : "x0"});
    var obj = [];

    var k = 0;
    do{
      var map = this.toMap(xk[k].value,abc);

      hesse.push({value : this.hesse(f1p,abc,map) , name : "Hesse("+k+")"});
      inverse.push({value : matrixInverse(hesse[k].value) , name :  "Inverse Hesse("+k+")" });
      derivative.push({value : this.derivative(f1p,abc,map)});
      obj.push({
        hesse : hesse[k],
        inverse : inverse[k],
        xk : xk[k]
      });
      xk.push({value : math.subtract(xk[k].value,math.multiply(inverse[k].value,derivative[k].value)) , name : "x"+(k+1)});

      k+=1;
    }while(this.norma(xk[k-1].value,xk[k].value) > 0.01);



    xk[k].name = "Result";

    return {
      f1 : {value : f1p , name : "F'"} ,
      f2 : {value : f2p , name : "Hesse"},
      obj : {value : obj , name : "Iteration"},
      result : xk[k]
    };
  }
};
