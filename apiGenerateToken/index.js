const jwt = require('jsonwebtoken');
module.exports = async function (context, req) {
  const user=req.body
  const token= jwt.sign({user}, "mysecretkey",{expiresIn:'300s'})
  context.log(token)
  context.res = {
    body: token,
};}