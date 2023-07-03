const createMongoClient = require('../shared/mongo');
const {v4 : uuidv4} = require('uuid')
module.exports = async function (context, req) {
    
    context.log(req.body); 
       
    const user = req.body
    const userWithId={...user,id:uuidv4()}
    
    //console.log(userWithId);
    const { db } = await createMongoClient()
     await db.collection('todo').insertOne(userWithId)     
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: userWithId,
    };
}