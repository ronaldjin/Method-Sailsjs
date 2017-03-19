/**
 * Created by Doleksii on 22.04.17.
 */

var math = require('mathjs');
var matrixInverse = require('matrix-inverse');
module.exports = {

  jf : function (func , obj) {
    return {value : math.eval(func,obj) , name : "F(x,y,..)" };
  },

  jinverse : function (matrix) {
    return {value : matrixInverse(matrix) , name : "Inverse matrix" };
  },

  jmultiply : function (matrix1 , matrix2) {
    return {value : math.multiply(matrix1,matrix2) , name : "A1 * A2" };
  },

  jsubtract : function (matrix1 , matrix2) {
  return {value : math.subtract(matrix1,matrix2) , name : "A1 - A2" };
  },

  jnorma : function (v1 , v2) {
    var result = math.subtract(v1,v2);
    result = result.map(function (x) {
      return x*x;
    });
    var nor  = 0;
    for(var i = 0; i < result.length; ++i){
      nor += result[i];
    }

    return {value : nor , name : "Norma" };
  },

  jderivative : function (f , abc) {
    var f1p = [];
    for(var i = 0; i < abc.length; ++i){
      f1p.push(math.string(math.derivative(f, abc[i])));
    }

   return {value : f1p , name : "f'" };
  },

  jToMap : function (vector,abc) {
    var map = {};
    for(var i = 0; i < vector.length;++i){
      eval("map."+abc[i]+"="+vector[i]);
    }
    return map;
  },

  jeval : function (string,vector,abc) {
    var map = this.jToMap(vector,abc);
    return math.eval(string,map);
  },
  //jsplitDifference(['2 * x - 4','2 * (y - 1)'],[0,0],[1,1],['x','y'])
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

        matrix[i][j] = (c1 - c2)/(vector1[j] - vector2[j]);

      }
    }

    return {value : matrix , name : "Matrix" };

  }

}
