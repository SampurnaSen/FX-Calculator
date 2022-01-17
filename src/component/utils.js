
const currencyChart = {
    "AUDUSD": 0.8371,
    "CADUSD": 0.8711,
    "USDCNY": 6.1715,
    "EURUSD": 1.2315,
    "GBPUSD": 1.5683,
    "NZDUSD": 0.7750,
    "USDJPY": 119.95,
    "EURCZK": 27.6028,
    "EURDKK": 7.4405,
    "EURNOK": 8.6651
}

const currencyMatrix = [
  [1, 'USD', 'USD', 'USD', 'USD', 'USD', 'USD', 'USD', 'USD', 'USD', 'D'],
  ['USD', 1, 'USD', 'USD', 'USD', 'USD', 'USD', 'USD', 'USD', 'USD', 'D'],
  ['USD', 'USD', 1, 'USD', 'USD', 'USD', 'USD', 'USD', 'USD', 'USD', 'D'],
  ['USD', 'USD', 'USD', 1, 'EUR', 'INV', 'USD', 'USD', 'EUR', 'USD', 'EUR'],
  ['USD', 'USD', 'USD', 'EUR', 1, 'INV', 'USD', 'USD', 'EUR', 'USD', 'EUR'],
  ['USD', 'USD', 'USD', 'D', 'D', 1, 'USD', 'USD', 'D', 'USD', 'D'],
  ['USD', 'USD', 'USD', 'USD', 'USD', 'USD', 1, 'USD', 'USD', 'USD', 'D'],
  ['USD', 'USD', 'USD', 'USD', 'USD', 'USD', 'USD', 1, 'USD', 'USD', 'INV'],
  ['USD', 'USD', 'USD', 'EUR', 'EUR', 'INV', 'USD', 'USD', 1, 'USD', 'EUR'],
  ['USD', 'USD', 'USD', 'USD', 'USD', 'USD', 'USD', 'USD', 'USD', 1, 'D'],
  ['INV', 'INV', 'INV', 'EUR', 'EUR', 'INV', 'INV', 'D', 'EUR', 'INV', 1]
]

const currencyOrder = [
  'AUD',
  'CAD',
  'CNY',
  'CZK',
  'DKK',
  'EUR',
  'GBP',
  'JPY',
  'NOK',
  'NZD',
  'USD'
]

const getConvertion = (givenBase, givenTerm, amount) => {
  let finalAmount = 0;
  let tempRate1 = 1, tempRate2 = 1;

  if (currencyOrder.includes(givenBase) && currencyOrder.includes(givenTerm)) {
    for(let i = 0; i < currencyMatrix.length; i++) {
      for(let j = 0; j < currencyMatrix[i].length; j++) {
          if (currencyOrder.indexOf(givenBase) == i && currencyOrder.indexOf(givenTerm) == j) {
            let finalValue = currencyMatrix[i][j];
            if (finalValue == 1) {
              finalAmount = amount;
            } else {
              if (currencyMatrix[currencyOrder.indexOf(givenBase)][currencyOrder.indexOf(givenTerm)] == 'D') {
                tempRate1 = getRate(givenBase, givenTerm, 'D');
                finalAmount = amount * tempRate1;
              } else {
                if (currencyMatrix[currencyOrder.indexOf(givenBase)][currencyOrder.indexOf(finalValue)] != 'D') {
                  let tempTerm = currencyMatrix[currencyOrder.indexOf(givenBase)][currencyOrder.indexOf(finalValue)];
                  tempRate1 = getRate(givenBase, finalValue, tempTerm);
                } else {
                  tempRate1 = getRate(givenBase, finalValue, 'D');
                }
                if (currencyMatrix[currencyOrder.indexOf(finalValue)][currencyOrder.indexOf(givenTerm)] != 'D') {
                  let tempTerm = currencyMatrix[currencyOrder.indexOf(finalValue)][currencyOrder.indexOf(givenTerm)];
                  tempRate2 = getRate(finalValue, givenTerm, tempTerm);
                } else {
                  tempRate2 = getRate(finalValue, givenTerm, 'D');
                }
                finalAmount = amount * tempRate1 * tempRate2;
              }
              
            }
          }
      }
   }
   
   if (givenTerm == 'JPY') {
    return parseFloat(finalAmount).toFixed();
   } else {
    return parseFloat(finalAmount).toFixed(2);
   }
   
  } else {
    return 'Unable to find rates.';
  }
};

const getRate = (givenBase, givenTerm, type) => {
  let crossFlag = 0, cross1, cross2;
  for (var key in currencyChart) {
    let [base, term] = key.match(/.{1,3}/g);

    if (type == 'D') {
      if (base == givenBase && term == givenTerm) {
        return currencyChart[key];
      }
    } else if (type == 'INV') {
      if (base == givenTerm && term == givenBase) {
        return (1/currencyChart[key]);
      }
    } else {
      if (base == givenBase && term == type) {
        cross1 = currencyChart[key];
      } else if (base == type && term == givenBase) {
        cross1 = 1/currencyChart[key];
      }
      if (base == type && term == givenTerm) {
        cross2 = currencyChart[key];
      } else if (base == givenTerm && term == type) {
        cross2 = 1/currencyChart[key];
      }
      crossFlag = 1;
    }
  }
  if (crossFlag) {
    return cross1 * cross2;
  }
}

module.exports = { currencyChart, currencyMatrix, currencyOrder, getConvertion, getRate }