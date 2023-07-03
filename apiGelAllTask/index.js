const createMongoClient = require('../shared/mongo');
module.exports = async function (context, req) {    
    const { db } = await createMongoClient()
    const findBy = (req.query);
    console.log(findBy)
    const users=await db.collection('todo').find(findBy).toArray()     

    context.res = {
        // status: 200, /* Defaults to 200 */
        body:users
    };
}