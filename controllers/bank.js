const MAX_CEILING = 1000
const MIN_CEILING = 0
const BEGIN_RANGE_MAIL_TO_SEND = 22
const END_RANGE_MAIL_TO_SEND = 6

const isDebitAuthorized = (currentBankBalance, amountToDebit) => {
    if (currentBankBalance - amountToDebit >= MIN_CEILING)
        return true
    return false
}

const isCreditAuthorized = (currentBankBalance, amountToDebit) => {
    if (currentBankBalance + amountToDebit <= MAX_CEILING)
        return true
    return false
}

const isTimestampBetweenRangeHoursMailToSend = (timestampServerRequest) => {
    const hourRequest = timestampServerRequest.getHours()
    return (hourRequest >= BEGIN_RANGE_MAIL_TO_SEND && hourRequest <= 23) || (hourRequest >= 0 && hourRequest < 6)
}

module.exports = {
    isDebitAuthorized, isCreditAuthorized, isTimestampBetweenRangeHoursMailToSend
}

