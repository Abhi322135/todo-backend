const jwt = require('jsonwebtoken');
module.exports = async function (context, req) {
  // Retrieve the confirmation token from the request
  const token= req.query
  console.log(token['token'])
  const decode=jwt.verify(token['token'],"mysecretkey")
  context.log(decode['user'])    
  context.res = {
    body: decode['user'],
};}