/**
 * Created by Doleksii on 26.04.17.
 */


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

  jeval : function (string,vector,abc) {
    var map = this.toMap(vector,abc);
    return math.eval(string,map);
  },


  jsplitDifference : function (vectorDerivative,vector1 , vector2,abc) {
    var matrix = [];
    for(var i =0 ; i< vector1.length; ++i){
      matrix[i] = [];
      for(var j = 0; j < vector2.length;++j){
        var v1 = [];
        var v2 = [];

        var c1 = 0;
        var c2 = 0;

        for(var m = 0; m < j+1;++m){
          v1.push(vector1[m]);
        }

        for(var k = j+1 ; k < vector2.length; ++k){
          v1.push(vector2[k]);
        }

        c1 = this.jeval(vectorDerivative[i],v1,abc);

        for(var m = 0; m < j;++m){
          v2.push(vector1[m]);
        }

        for(var k = j ; k < vector2.length; ++k){
          v2.push(vector2[k]);
        }

        c2 = this.jeval(vectorDerivative[i],v2,abc);
        var znam =  vector1[j] - vector2[j];
        if(znam == 0){
          znam +=0.2;
         }


        matrix[i][j] = (c1 - c2)/znam;

      }
    }

    return  matrix;

  },

  toMap : function (vector,abc) {
    var map = {};
    for(var i = 0; i < vector.length;++i){
      eval("map."+abc[i]+"="+vector[i]);
    }
    return map;
  },
//jsplitDifference : function (vectorDerivative,vector1 , vector2,abc)
  hord : function(f,vector,abc){
    // vector = [];
    // abc = [];
    // f - String

    var func = f;
    var length = vector.length;

    var f1p = [];
    var tv = [];
    for(var i = 0; i < abc.length; ++i){
      f1p.push(math.string(math.derivative(func, abc[i])));
      tv.push(vector[i]+0.2);
    }


    var xk = [] ,derivative = [], matrix = [],inverse = [];

    xk.push({value : vector , name : "x0"});
    xk.push({value : tv , name : "x0"});

    var obj = [];

    var k = 0;
    do{
      var map = this.toMap(xk[k].value,abc);
      console.log(k);
      matrix.push({value : this.jsplitDifference(f1p,xk[k].value,xk[k+1].value,abc) , name : "Hesse("+k+")"});
      inverse.push({value : matrixInverse(matrix[k].value) , name :  "Inverse Hesse("+k+")" });
      derivative.push({value : this.derivative(f1p,abc,map)});

      obj.push({
        matrix : matrix[k],
        inverse : inverse[k],
        xk : xk[k]
      });
      xk.push({value : math.subtract(xk[k].value,math.multiply(inverse[k].value,derivative[k].value)) , name : "x"+(k+1)});

      k+=1;
    }while(this.norma(xk[k-1].value,xk[k].value) > 0.01 || k > 10);



    xk[k].name = "Result";

    return {
      f1 : {value : f1p , name : "F'"} ,
      f2 : {value : f2p , name : "Hesse"},
      obj : {value : obj , name : "Iteration"},
      result : xk[k]
    };
  }
};


