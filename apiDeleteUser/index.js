const createMongoClient = require('../shared/mongo');
module.exports = async function (context, req) {    
    const { db } = await createMongoClient()
    const id = req.params.id
    console.log(id)
    await db.collection('users').deleteOne({'id': id})    
    const users=await db.collection('users').find({}).toArray()  

    context.res = {
        // status: 200, /* Defaults to 200 */
        body:users
    };
}