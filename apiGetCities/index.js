const createMongoClient = require('../shared/mongo');
module.exports = async function (context, req) {    
    const { db } = await createMongoClient()
    const findBy = JSON.parse(req.query.findBy);

    const users=await db.collection('cities').find(findBy).toArray()     

    context.res = {
        // status: 200, /* Defaults to 200 */
        body:users
    };
}