const createMongoClient = require('../shared/mongo');
module.exports = async function (context, req) {    
    const{id,type,model,year}=req.body
    const findBy = {
        'id':id
    };
    const { db } = await createMongoClient()
    const foundUser=await db.collection('jsonform').find(findBy).toArray();
    console.log(id)
    if(type)
    foundUser[0].type=type;
    if(model)
    foundUser[0].model=model;
    if(year)
    foundUser[0].year=year;
    console.log(foundUser[0])
    await db.collection('jsonform').findOneAndUpdate(findBy,{$set:foundUser[0]})
   }
