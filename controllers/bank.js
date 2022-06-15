const MAX_CEILING = 1000;
const MIN_CEILING = 0;
const BEGIN_RANGE_MAIL_TO_SEND = 22;
const END_RANGE_MAIL_TO_SEND = 6;

const isAmountWantedInBankAccountAuthorized = (amount) => {
  return amount >= MIN_CEILING && amount <= MAX_CEILING
}

const isDebitAuthorized = (currentBankBalance, amountToDebit) => {
  if (
    currentBankBalance > MAX_CEILING ||
    currentBankBalance < MIN_CEILING ||
    amountToDebit <= 0
  )
    return false;
  if (currentBankBalance - amountToDebit >= MIN_CEILING) return true;
  return false;
};

const isCreditAuthorized = (currentBankBalance, amountToCredit) => {
  if (
    currentBankBalance > MAX_CEILING ||
    currentBankBalance < MIN_CEILING ||
    amountToCredit <= 0
  )
    return false;
  if (currentBankBalance + amountToCredit <= MAX_CEILING) return true;
  return false;
};

const isTimestampBetweenRangeHoursMailToSend = (timestampServerRequest) => {
  const hourRequest = timestampServerRequest.getHours();
  return (
    (hourRequest >= BEGIN_RANGE_MAIL_TO_SEND && hourRequest <= 23) ||
    (hourRequest >= 0 && hourRequest < END_RANGE_MAIL_TO_SEND)
  );
};

module.exports = {
  isDebitAuthorized,
  isCreditAuthorized,
  isTimestampBetweenRangeHoursMailToSend,
  isAmountWantedInBankAccountAuthorized,
};
