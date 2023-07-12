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

    function CalculateNewBalance(e) {
        let target = e.target

        if(calcBetAmount.value > 0 && target.name === 'calc-moneyline' && (target.value < -100 || target.value >= 100) ) {
            fractionVal.value = odds.american.toFractional(parseInt(target.value)).simplify().n+ '/' + odds.decimal.toFractional(parseInt(target.value)).simplify().d;
            decimalVal.value = odds.american.toDecimal(parseInt(target.value), calcBetAmount.value);
            impliedVal.value = (100 / ((parseInt(target.value)) + 100)).toFixed(4)*100;
            winningVal.innerText = ((calcBetAmount.value * decimalVal.value) - calcBetAmount.value).toFixed(2);
            payoutVal.innerText = (calcBetAmount.value * decimalVal.value).toFixed(2);
        }

        if(calcBetAmount.value > 0 && target.name === 'calc-decimal' && target.value > 0 ) {
            fractionVal.value = odds.decimal.toFractional(parseFloat(target.value)).simplify().n + '/' + odds.decimal.toFractional(parseFloat(target.value)).simplify().d;
            moneyLineVal.value = odds.decimal.toAmerican(parseFloat(target.value));
            impliedVal.value = (100 / ((parseInt(moneyLineVal.value)) + 100)).toFixed(4)*100;
            impliedVal.value = (100 / (parseInt(moneyLineVal.value) + 100)).toFixed(4)*100;
            winningVal.innerText = ((calcBetAmount.value * decimalVal.value) - calcBetAmount.value).toFixed(2);
            payoutVal.innerText = (calcBetAmount.value * decimalVal.value).toFixed(2);
        }
    }
    
    ['input','change'].forEach( evt => {
        inputs.forEach(input => input.addEventListener(evt, CalculateNewBalance, false))
    } );
});