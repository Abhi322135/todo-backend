const createMongoClient = require('../shared/mongo');
module.exports = async function (context, req) {
    const { db } = await createMongoClient()
    const findBy = (req.query);
    console.log(findBy)
    let allUsers=await db.collection('todo').find(findBy).toArray()
    context.res = {
        body:allUsers
    };
}