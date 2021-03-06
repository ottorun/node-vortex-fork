
/*

  PrismTech licenses this file to You under the Apache License, Version 2.0
  (the "License"); you may not use this file except in compliance with the
  License and with the PrismTech Vortex product. You may obtain a copy of the
  License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
  License and README for the specific language governing permissions and
  limitations under the License.
 */

(function() {
  var CFail, CFailure, CSome, CSuccess, None, ematch, match, omatch, root;

  root = {};


  /**
  Define the coffez library. It includes a few useful functional abstractions such as Option and Try types.
  @namespace
   */

  root.coffez = {};


  /**
  @memberof coffez
  @class
  @classdesc this class, used with the CSome class defines the Option
  (Maybe) Monad. This monad is used throughout the API to deal with
  operations that may not return a valid result.
   */

  None = {};


  /**
    returns None whatever the function to apply.
       @param {function} f - the function to apply
       @returns {None} - None object
       @memberof! coffez.None#
       @function map
   */

  None.map = function(f) {
    return None;
  };


  /**
    returns None whatever the function to apply.
       @param {function} f - the function to apply
       @returns {None} - None object
       @memberof! coffez.None#
       @function flatMap
   */

  None.flatMap = function(f) {
    return None;
  };


  /**
    returns the Option's value.
       @returns {undefined} - undefined type
       @memberof! coffez.None#
       @function get
   */

  None.get = function() {
    return void 0;
  };


  /**
    returns the Option's value if the option is non empty, otherwise return the result of evaluating `f`
       @param {function} f - the default value
       @returns {*} - `f` result
       @memberof! coffez.None#
       @function getOrElse
   */

  None.getOrElse = function(f) {
    return f();
  };


  /**
    returns this Option if it is non empty, otherwise return the result of evaluating `f`.
       @param {function} f - the default value
       @returns {*} - the result of evaluating f
       @memberof! coffez.None#
       @function orElse
   */

  None.orElse = function(f) {
    return f();
  };


  /**
    returns true if the Option is empty.
       @returns {boolean} - true
       @memberof! coffez.None#
       @function isEmpty
   */

  None.isEmpty = function() {
    return true;
  };


  /**
  @memberof coffez
  @class
  @classdesc this class, used with the None class defines the Option
  (Maybe) Monad. This monad is used throughout the API to deal with
  operations that may not return a valid result.
   */

  CSome = (function() {
    function CSome(value1) {
      this.value = value1;

      /**
      returns a Some containing the result of applying `f` to this Option value.
         @param {function} f - the function to apply
         @returns {CSome} - CSome object
         @memberof! coffez.CSome#
         @function map
       */
    }

    CSome.prototype.map = function(f) {
      return new CSome(f(this.value));
    };


    /**
    returns the result of applying `f` to this Option value.
       @param {function} f - the function to apply
       @returns {*} - f result
       @memberof! coffez.CSome#
       @function flatMap
     */

    CSome.prototype.flatMap = function(f) {
      return f(this.value);
    };


    /**
    returns the Option's value.
       @returns {*} - option's value
       @memberof! coffez.CSome#
       @function get
     */

    CSome.prototype.get = function() {
      return this.value;
    };


    /**
    returns the Option's value if the option is non empty, otherwise return the result of evaluating `f`
       @param {function} f - the default value
       @returns {*} - f result
       @memberof! coffez.CSome#
       @function getOrElse
     */

    CSome.prototype.getOrElse = function(f) {
      return this.value;
    };


    /**
    returns this Option if it is non empty, otherwise return the result of evaluating `f`.
       @param {function} f - the default value
       @returns {Some} - this Option
       @memberof! coffez.CSome#
       @function orElse
     */

    CSome.prototype.orElse = function(f) {
      return this;
    };


    /**
    returns true if the Option is empty.
       @returns {boolean} - false
       @memberof! coffez.CSome#
       @function isEmpty
     */

    CSome.prototype.isEmpty = function() {
      return false;
    };

    return CSome;

  })();

  CFail = (function() {
    function CFail(what1) {
      this.what = what1;
    }

    CFail.prototype.map = function(f) {
      throw this.what;
    };

    CFail.prototype.flatMap = function(f) {
      throw this.what;
    };

    CFail.prototype.get = function() {
      throw this.what;
    };

    CFail.prototype.getOrElse = function(f) {
      throw this.what;
    };

    CFail.prototype.orElse = function(f) {
      throw this.what;
    };

    CFail.prototype.isEmpty = function() {
      throw this.what;
    };

    return CFail;

  })();

  CSuccess = (function() {
    function CSuccess(value1) {
      this.value = value1;
    }

    CSuccess.prototype.map = function(f) {
      return f(this.value);
    };

    CSuccess.prototype.get = function() {
      return this.value;
    };

    CSuccess.prototype.getOrElse = function(f) {
      return this.value;
    };

    CSuccess.prototype.orElse = function(f) {
      return this;
    };

    CSuccess.prototype.isFailure = function() {
      return false;
    };

    CSuccess.prototype.isSuccess = function() {
      return true;
    };

    CSuccess.prototype.toOption = function() {
      return new CSome(this.value);
    };

    CSuccess.prototype.recover = function(f) {
      return this;
    };

    return CSuccess;

  })();

  CFailure = (function() {
    function CFailure(exception) {
      this.exception = exception;
    }

    CFailure.prototype.map = function(f) {
      return None;
    };

    CFailure.prototype.get = function() {
      return this.exception;
    };

    CFailure.prototype.getOrElse = function(f) {
      return f();
    };

    CFailure.prototype.orElse = function(f) {
      return f();
    };

    CFailure.prototype.isFailure = function() {
      return true;
    };

    CFailure.prototype.isSuccess = function() {
      return false;
    };

    CFailure.prototype.toOption = function() {
      return None;
    };

    CFailure.prototype.recover = function(f) {
      return f(this.exception);
    };

    return CFailure;

  })();

  ematch = function(x, y) {
    if (y === void 0) {
      return true;
    } else {
      return x === y;
    }
  };

  omatch = function(a, b) {
    var e, k, m, v;
    m = true;
    for (k in a) {
      v = a[k];
      e = match(v, b[k]);
      m = m && e;
    }
    return m;
  };

  match = function(a, b) {
    switch (typeof a) {
      case 'object':
        switch (typeof b) {
          case 'object':
            return omatch(a, b);
          default:
            return false;
        }
        break;
      case 'function':
        return false;
      case 'undefined':
        return false;
      default:
        switch (typeof b) {
          case 'object':
            return false;
          case 'function':
            return false;
          case 'undefined':
            return true;
          default:
            return ematch(a, b);
        }
    }
  };

  root.coffez.None = None;


  /**
  Utility function to create a `CSome` object
   @memberof coffez#
   @function Some
   @param {*} value - a given optional value
   @returns {CSome} - a `CSome` object
   @see coffez.CSome
   */

  root.coffez.Some = function(value) {
    return new CSome(value);
  };

  root.coffez.Fail = function(what) {
    return new CFail(what);
  };

  root.coffez.Success = function(value) {
    return new CSuccess(value);
  };

  root.coffez.Failure = function(ex) {
    return new CFailure(ex);
  };

  root.coffez.match = match;

  module.exports = root.coffez;

}).call(this);
