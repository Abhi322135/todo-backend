const createMongoClient = require('../shared/mongo');
module.exports = async function (context, req) {    
    const { db } = await createMongoClient()
    const users=await db.collection('image').find({}).toArray()     

    context.res = {
        // status: 200, /* Defaults to 200 */
        body:users
    };
}