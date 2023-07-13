let odds = require('odds-converter');
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
        return (x/y)*100;
    }

    const CalculateNewBalance = (e) => {
        let target = e.target

        if (!target.checkValidity()) {
            document.getElementById('demo').innerHTML = target.validationMessage;
          } else {
            document.getElementById('demo').innerHTML = '';
            if(calcBetAmount.value > 0 && target.name === 'calc-moneyline' && (target.value < -100 || target.value >= 100) ) {
                fractionVal.value = odds.american.toFractional(parseInt(target.value)).simplify().n+ '/' + odds.decimal.toFractional(parseInt(target.value)).simplify().d;
                decimalVal.value = odds.american.toDecimal(parseInt(target.value), calcBetAmount.value);
                impliedVal.value = calculatePercentage(calcBetAmount.value, target.value).toFixed(2) + ' %';
                winningVal.innerText = ((calcBetAmount.value * decimalVal.value) - calcBetAmount.value).toFixed(2);
                payoutVal.innerText = (calcBetAmount.value * decimalVal.value).toFixed(2);
            }
    
            if(calcBetAmount.value > 0 && target.name === 'calc-decimal' && target.value > 0 ) {
                fractionVal.value = odds.decimal.toFractional(parseFloat(target.value)).simplify().n + '/' + odds.decimal.toFractional(parseFloat(target.value)).simplify().d;
                moneyLineVal.value = odds.decimal.toAmerican(parseFloat(target.value));
                impliedVal.value = calculatePercentage(calcBetAmount.value, moneyLineVal.value).toFixed(2) + ' %';
                winningVal.innerText = ((calcBetAmount.value * decimalVal.value) - calcBetAmount.value).toFixed(2);
                payoutVal.innerText = (calcBetAmount.value * decimalVal.value).toFixed(2);
            }
    
            if(calcBetAmount.value > 0 && target.name === 'calc-fractional' ) {
                let fractionArr = fractionVal.value;
                let fractionArrVal = fractionArr.split("/"); 
    
                moneyLineVal.value = odds.fraction.toAmerican(parseInt(fractionArrVal[0]), parseInt(fractionArrVal[1]));
                decimalVal.value = odds.american.toDecimal(parseInt(moneyLineVal.value), calcBetAmount.value);
                impliedVal.value = calculatePercentage(calcBetAmount.value, moneyLineVal.value).toFixed(2) + ' %';            
                winningVal.innerText = ((calcBetAmount.value * decimalVal.value) - calcBetAmount.value).toFixed(2);
                payoutVal.innerText = (calcBetAmount.value * decimalVal.value).toFixed(2);
            }
          }
    }
    
    ['input','change'].forEach( evt => {
        inputs.forEach(input => input.addEventListener(evt, CalculateNewBalance, false))
    } );
});