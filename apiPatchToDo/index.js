const createMongoClient = require('../shared/mongo');
module.exports = async function (context, req) {    
    const { db } = await createMongoClient()
    const{id,status,title,task,username,date,starttime,endtime,prevdate}=req.body
    const findBy = {
        'id':id
    };
    const findByUsername={
        'username':username,
        'status':"0",
        'date':date
    }
    const findByPrevDate={
        'username':username,
        'status':"0",
        'date':prevdate
    }
    //console.log(username)
    const foundUser=await db.collection('todo').find(findBy).toArray();
    console.log(foundUser)
    const user = foundUser[0];
    if(status){
    if(status==="0") 
    user.status="1"
    if(status==="1")
    user.status="0"
    }
    if(task)
    user.todo.task=task;
    if(title)
    user.todo.title=title;
    if(date)
    user.date=date
    if(starttime)
    user.starttime=starttime
    if(endtime)
    user.endtime=endtime
     await db.collection('todo').findOneAndUpdate(findBy,{$set:user})
     if(prevdate)
     var users=await db.collection('todo').find(findByPrevDate).toArray()
     else
     var users=await db.collection('todo').find(findByUsername).toArray() 
     context.res = {
         // status: 200, /* Defaults to 200 */
         body:users
     };  
    
}