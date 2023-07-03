const createMongoClient = require('../shared/mongo');
const {v4 : uuidv4} = require('uuid')
module.exports = async function (context, req) {    
    const user=req.body
    const userWithId={...user,id:uuidv4()}    
    const { db } = await createMongoClient()
     db.collection('jsonform').insertOne(userWithId)     
    context.res = {
        body: req.body,
    };
}