const createMongoClient = require('../shared/mongo');
module.exports = async function (context, req) {    
    const { db } = await createMongoClient()
    // const findBy = require('url').parse(req.url,true).query;
    const findBy = JSON.parse(req.query.findBy);
    let allUsers=await db.collection('users').find({}).toArray()
    let dummy=[]
    c=0
    for(let x in findBy){
        for(let y in allUsers){
            if(! (x.includes("."))){
              if((allUsers[y][x].toLowerCase()).includes(findBy[x].toLowerCase())){
              dummy.push(allUsers[y]) 
            }
         }
         else
         {
            let z=x.substring(0,x.indexOf("."));
            let z1=x.substring(x.indexOf(".")+1);
            if((allUsers[y][z][z1].toString().toLowerCase()).includes(findBy[x].toString().toLowerCase())){
                dummy.push(allUsers[y])   
         }}}
         allUsers=dummy
         dummy=[]
    }
   // const users=await db.collection('list').find(findBy).toArray()
   // console.log(users)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body:allUsers
    };
}