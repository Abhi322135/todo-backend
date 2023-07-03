const createMongoClient = require('../shared/mongo');
module.exports = async function (context, req) {    
    const { db } = await createMongoClient()
    const id = req.query
    await db.collection('jsonform').deleteOne(id)    
}