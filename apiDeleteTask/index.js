const createMongoClient = require('../shared/mongo');
module.exports = async function (context, req) {    
    const { db } = await createMongoClient()
    const name = req.query
    const form={
        'username':name.username,
        'date':name.date
    }
    await db.collection('todo').deleteOne(name)    
    const users=await db.collection('todo').find(form).toArray()  

    context.res = {
        // status: 200, /* Defaults to 200 */
        body:users
    };
}