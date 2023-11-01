module.exports = {
    middleAction: ((req, res, next) => {
        var date = new Date()
        var month = date.getMonth();
        var day = date.getDate();
        var year = date.getFullYear();
        
        req.requestTime = `${month + 1}/${day}/${year}`;

        next();
    })
}