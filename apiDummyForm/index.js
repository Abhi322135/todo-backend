module.exports = async function (context, req) {    
    context.log(req.body);        
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: req.body,
    };
}