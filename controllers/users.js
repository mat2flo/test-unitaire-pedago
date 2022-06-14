const accounts = (req, res) => {
    return res.send("ok")
} 

const debit = (req, res) => {
    const payload = req.body
    const idUser = req.params.id
    if (checkIfDebitAuthorized) {
        //TODO:debit in db 
        return res.send("ok")
    }
    
} 

const credit = (req, res) => {
    const payload = req.body
    const idUser = req.params.id
    //TODO:credit in db 
    return res.send("ok")
} 

module.exports = {
    accounts, debit, credit
}