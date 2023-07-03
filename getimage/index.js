const createMongoClient = require('../shared/mongo');
//const cors=require('cors')
module.exports = async function (context, req) {
    const { db } = await createMongoClient()
    // const findBy = require('url').parse(req.url,true).query;
    const findBy = (req.query);
    
    let allUsers=await db.collection('image').find(findBy).toArray()
      // const users=await db.collection('list').find(findBy).toArray()
   // console.log(users)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body:allUsers
    };
}