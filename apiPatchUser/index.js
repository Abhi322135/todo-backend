const createMongoClient = require('../shared/mongo');
module.exports = async function (context, req) {    
    const { db } = await createMongoClient()
    const{username,password}=req.body
    const findByUsername={
        'username':username,
    }
    //console.log(username)
    const foundUser=await db.collection('userlist').find(findByUsername).toArray();
    console.log(foundUser)
    const user = foundUser[0];
    user.password=password
     await db.collection('userlist').findOneAndUpdate(findByUsername,{$set:user})
    //  const users=await db.collection('user').find(findByUsername).toArray()
    //  context.res = {
    //      // status: 200, /* Defaults to 200 */
    //      body:users
    //  };  
    
}