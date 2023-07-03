const createMongoClient = require('../shared/mongo');
module.exports = async function (context, req) {    
    const { db } = await createMongoClient()
    const{username,phonenumber,city,state,postalcode}=req.body
    const findBy = JSON.parse(req.query.findBy);
    //console.log(username)
    const foundUser=await db.collection('users').find(findBy).toArray();
    const user = foundUser[0];
    if(username)
    user.username=username
    if(phonenumber) 
    user.phonenumber=phonenumber
    if(city)
     user.address.city=city
    if(state)
     user.address.state=state
    if(postalcode)
     user.address.postalcode=postalcode
    console.log(user)
     await db.collection('users').findOneAndUpdate(findBy,{$set:user})  
    const users=await db.collection('users').find(findBy).toArray() 
    context.res = {
        // status: 200, /* Defaults to 200 */
        body:users
    };
}