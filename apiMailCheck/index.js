const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const url=require('url')
module.exports = async function (context, req) {
  // Retrieve the confirmation token from the request
  const user=req.body
  const token= jwt.sign({user}, "mysecretkey",{expiresIn:'300s'})
 // const decode=jwt.verify(token,"mysecretkey")
  context.log(token)
 // context.log(decode['user']['username'])
  context.log(req.body)
  // Create a Nodemailer transporter
  const urlbase=`http://localhost:4200`
  const queryParams = {
   param1: token,   
   
 };
 const urlWithParams = url.format({ 
   pathname:urlbase,
   query: queryParams,
   
 });
 context.log(urlWithParams)

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    service:'gmail',
    auth: {
        user: 'abhigyanmajumder07@gmail.com',
        pass: 'zjizyrhczidnbaxy'
        
    },
});
    let info = await transporter.sendMail({
    from: '"Fred Foo 👻" abhigyanmajumder07@gmail.com', // sender address
    to:user['email'] , // list of receivers
    subject: "Email Verification", // Subject line
    html:`Please click this email to confirm the email: <a href="${urlWithParams}">${urlWithParams}</a>`       
  });
  const jsonToken={
    'tokenid':token
  }
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: jsonToken,
};}