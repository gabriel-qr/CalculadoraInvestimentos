import { validateAmount, validateTimeHorizon } from './validation.js';

function converToMonthlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
}

function generateReturnsArray(
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = 'monthly',
  monthlyContribuition = 0,
  returnRate = 0,
  returnTimeframe = 'monthly',
) {
  validateAmount('Investimento inicial', startingAmount);
  validateAmount('Aporte adicional', monthlyContribuition);
  validateTimeHorizon(timeHorizon);
  validateAmount('Rentabilidade', returnRate);

  const finalReturnRate =
    returnTimeframe === 'monthly'
      ? 1 + returnRate / 100
      : converToMonthlyReturnRate(1 + returnRate / 100);

  const finalTimeHorizon =
    timePeriod === 'monthly' ? timeHorizon : timeHorizon * 12;

  const referenceInvestmentObject = {
    investedAmount: startingAmount,
    interestReturns: 0,
    totalInterestReturns: 0,
    monthCounter: 0,
    totalAmount: startingAmount,
  };
  const returnsArray = [referenceInvestmentObject];

  for (
    let timeReference = 1;
    timeReference <= finalTimeHorizon;
    timeReference++
  ) {
    const investedAmount =
      returnsArray[timeReference - 1].investedAmount +
      monthlyContribuition * timeReference;

    const interestReturns =
      returnsArray[timeReference - 1].totalAmount * (finalReturnRate - 1);

    const totalInterestReturns =
      returnsArray[timeReference - 1].totalInterestReturns + interestReturns;

    const totalAmount =
      returnsArray[timeReference - 1].totalAmount * finalReturnRate +
      monthlyContribuition;

    returnsArray.push({
      investedAmount,
      interestReturns,
      totalInterestReturns,
      monthCounter: timeReference,
      totalAmount,
    });
  }

  return returnsArray;
}

console.log(generateReturnsArray(100, 4, 'monthly', 0, 10, 'monthly'));
