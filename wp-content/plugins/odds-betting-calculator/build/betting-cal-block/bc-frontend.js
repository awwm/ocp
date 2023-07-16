/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/fractional-arithmetic/fractional-arithmetic.js":
/*!*********************************************************************!*\
  !*** ./node_modules/fractional-arithmetic/fractional-arithmetic.js ***!
  \*********************************************************************/
/***/ ((module) => {

/**
 * fractional-arithmetic.js is a javascript library for doing fractional arithmetic
 * Author: Alexandros Georgiou <alex.georgiou@gmail.com>
 * 
 */

var isInteger = function(i) {
	return !isNaN( i ) && ( parseInt( i ) == parseFloat( i ) );
};

module.exports.isInteger = isInteger;

var gcd = function( a, b) {
    a = Math.abs( a );
    b = Math.abs( b );
    var temp;
    while ( b > 0 ) {
        temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};

module.exports.gcd = gcd;

var lcm = function( a, b ) {
    a = Math.abs( a );
    b = Math.abs( b );
    return a * ( b / gcd( a, b ) );
};
module.exports.lcm = lcm;

function NotAFractionError(message) {
    this.name = 'NotAFractionError';
    this.message = message || 'Not a Fraction';
}

NotAFractionError.prototype = new Error();
NotAFractionError.prototype.constructor = NotAFractionError;

function Fraction( n, d ) {
	
	if ( typeof(n) === 'undefined' )
		throw new NotAFractionError( 'You must specify a fraction' );
	
	// create without new keyword
	if ( ! ( this instanceof Fraction ) ) {
		return new Fraction( n, d );
	}
	
	// create from fraction
	if ( n instanceof Fraction && typeof(d) === 'undefined' ) {
		this.n = n.n;
		this.d = n.d;
		return;
	}
	
	//create from integers
	if ( isInteger(n) && isInteger(d)) {
		this.n = parseInt(n);
		this.d = parseInt(d);
		return;
	}
	
	//create from one integer
	if ( isInteger(n) && typeof(d) === 'undefined') {
		this.n = parseInt(n);
		this.d = 1;
		return;
	}
	
	
	if ( typeof(n) === 'number' ) {
		var ns = '' + n;
		var decimals = ns.length - ns.indexOf( '.' ) - 1;
		this.n = parseInt( ns.replace( '.', '' ) );
		this.d = Math.pow( 10, decimals );
		return;
	}
	
	throw new NotAFractionError(
		'Cannot instantiate Fraction(' + n + ( typeof(d) === 'undefined' ? '' : d ) + ')'
	);
}

Fraction.prototype.toString = Fraction.prototype.toS = Fraction.prototype.inspect = function() {
	return '(' + this.n + '/' + this.d + ')';
};

Fraction.prototype.toNumber = function () {
	return this.n / this.d;
};

Fraction.prototype.toLatex = function() {
	return '\\frac{' + this.n + '}{' + this.d + '}';
};

Fraction.prototype.toMathML = function() {
	return '<mfrac><mn>' + this.n + '</mn><mn>' + this.d + '</mfrac>';
};

Fraction.prototype.simplify = function() {
    if ( this.d < 0 ) {
        this.n *= -1;
        this.d *= -1;
    }
	var g = gcd( this.n, this.d );
	return g == 1 ? this : new Fraction( this.n / g, this.d / g);
};

Fraction.prototype.inverse = function() {
	return new Fraction( this.d, this.n );
};

Fraction.prototype.times = Fraction.prototype.multiply = function( n, d ) {
	
	if ( n instanceof Fraction && typeof(d) === 'undefined' ) {
		return new Fraction( this.n * n.n, this.d * n.d ).simplify();
	} else if ( isInteger(n) && isInteger(d) ) {
		return this.times( new Fraction( n, d ) );
	}
	throw new NotAFractionError('Cannot multiply ' + this + ' with n=' + n + ', d=' + d );
};

Fraction.prototype.dividedBy = Fraction.prototype.div = function( n, d ) {
	
	if ( n instanceof Fraction && typeof(d) === 'undefined' ) {
		return n.inverse().times( this );
	} else if ( isInteger(n) && isInteger(d) ) {
		return this.times( new Fraction( d, n ) );
	}
	throw new NotAFractionError('Cannot divide '+this+' by n='+n+', d='+d);
};

Fraction.prototype.plus = function( n, d ) {
	
	if ( n instanceof Fraction && typeof(d) === 'undefined') {
		var l = lcm( this.d, n.d );
		return new Fraction( this.n * l / this.d + n.n * l / n.d, l );
	} else if ( isInteger(n) && isInteger(d) ) {
		return this.plus( new Fraction(n,d) );
	}
	throw new NotAFractionError( 'Cannot add ' + this + ' to n=' + n + ', d=' + d );
};

Fraction.prototype.minus = function( n, d ) {
	
	if ( n instanceof Fraction && typeof(d) === 'undefined' ) {
		var l = lcm(this.d,n.d);
		return new Fraction( this.n * l / this.d - n.n * l / n.d, l);
	} else if (isInteger(n) && isInteger(d)) {
		return this.minus( new Fraction(n,d) );
	}
	throw new NotAFractionError( 'Cannot add ' + this + ' to n=' + n + ', d=' + d);
};

module.exports.Fraction = Fraction;


/***/ }),

/***/ "./node_modules/odds-converter/index.js":
/*!**********************************************!*\
  !*** ./node_modules/odds-converter/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Fraction = (__webpack_require__(/*! fractional-arithmetic */ "./node_modules/fractional-arithmetic/fractional-arithmetic.js").Fraction);
var OddsConverter = OddsConverter || {};

OddsConverter.decimal = {
    toAmerican: function(decimal){
        decimal < 2.0 ? moneyline = ( (-100)/(decimal - 1) ).toPrecision(5) : moneyline = ( (decimal - 1) * 100 ).toPrecision(5);
        return moneyline;
    },
    toFractional: function(decimal){
        fraction = new Fraction((decimal - 1));
        return fraction;
    }
}
OddsConverter.fraction = {
    toAmerican: function(n,d){
        n > d ? moneyline = ((n/d) * 100) : moneyline = (-100)/(n/d);
        return moneyline;
    },
    toDecimal: function(n,d){
        return decimal = (n/d) + 1;
    }
}

OddsConverter.american = {
    toDecimal: function(moneyline){
        moneyline > 0 ? decimal = (moneyline/100) + 1 : decimal = ((100/Math.abs(moneyline)) + 1).toPrecision(3);
        return decimal;
    },
    toFractional: function(moneyline){
        moneyline > 0 ? fraction = new Fraction(moneyline/100) : fraction = new Fraction(100/Math.abs(moneyline));
        return fraction;
    }
}

module.exports = OddsConverter;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************************************!*\
  !*** ./src/betting-cal-block/bc-frontend.js ***!
  \**********************************************/
let odds = __webpack_require__(/*! odds-converter */ "./node_modules/odds-converter/index.js");
document.addEventListener('DOMContentLoaded', () => {
  const winningVal = document.getElementById('winning');
  const payoutVal = document.getElementById('payout');
  const betForm = document.querySelector('.form-wrapper');
  const inputs = betForm.querySelectorAll('input');
  const calcBetAmount = betForm.querySelector('#calc-bet-amount');
  const moneyLineVal = betForm.querySelector('#calc-moneyline');
  const fractionVal = betForm.querySelector('#calc-fractional');
  const decimalVal = betForm.querySelector('#calc-decimal');
  const impliedVal = betForm.querySelector('#calc-implied');
  const calculatePercentage = (x, y) => {
    return x / y * 100;
  };
  const CalculateNewBalance = e => {
    let target = e.target;
    if (!target.checkValidity()) {
      document.getElementById('demo').innerHTML = target.validationMessage;
    } else {
      document.getElementById('demo').innerHTML = '';
      if (calcBetAmount.value > 0 && target.name === 'calc-moneyline' && (target.value < -100 || target.value >= 100)) {
        fractionVal.value = odds.american.toFractional(parseInt(target.value)).simplify().n + '/' + odds.decimal.toFractional(parseInt(target.value)).simplify().d;
        decimalVal.value = odds.american.toDecimal(parseInt(target.value), calcBetAmount.value);
        impliedVal.value = calculatePercentage(calcBetAmount.value, target.value).toFixed(2) + ' %';
        winningVal.innerText = (calcBetAmount.value * decimalVal.value - calcBetAmount.value).toFixed(2);
        payoutVal.innerText = (calcBetAmount.value * decimalVal.value).toFixed(2);
      }
      if (calcBetAmount.value > 0 && target.name === 'calc-decimal' && target.value > 0) {
        fractionVal.value = odds.decimal.toFractional(parseFloat(target.value)).simplify().n + '/' + odds.decimal.toFractional(parseFloat(target.value)).simplify().d;
        moneyLineVal.value = odds.decimal.toAmerican(parseFloat(target.value));
        impliedVal.value = calculatePercentage(calcBetAmount.value, moneyLineVal.value).toFixed(2) + ' %';
        winningVal.innerText = (calcBetAmount.value * decimalVal.value - calcBetAmount.value).toFixed(2);
        payoutVal.innerText = (calcBetAmount.value * decimalVal.value).toFixed(2);
      }
      if (calcBetAmount.value > 0 && target.name === 'calc-fractional') {
        let fractionArr = fractionVal.value;
        let fractionArrVal = fractionArr.split("/");
        moneyLineVal.value = odds.fraction.toAmerican(parseInt(fractionArrVal[0]), parseInt(fractionArrVal[1]));
        decimalVal.value = odds.american.toDecimal(parseInt(moneyLineVal.value), calcBetAmount.value);
        impliedVal.value = calculatePercentage(calcBetAmount.value, moneyLineVal.value).toFixed(2) + ' %';
        winningVal.innerText = (calcBetAmount.value * decimalVal.value - calcBetAmount.value).toFixed(2);
        payoutVal.innerText = (calcBetAmount.value * decimalVal.value).toFixed(2);
      }
    }
  };
  ['input', 'change'].forEach(evt => {
    inputs.forEach(input => input.addEventListener(evt, CalculateNewBalance, false));
  });
});
})();

/******/ })()
;
//# sourceMappingURL=bc-frontend.js.map