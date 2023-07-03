const createMongoClient = require("../shared/mongo");
module.exports = async function (context, req) {
    const { db } = await createMongoClient();
    const findBy = req.query;
    var status = "null";
    let task = [];
    let getTask = [];
    if (findBy["status"] != "null") {
        if (findBy["status"] === "pending") status = "0";
        if(findBy["status"] === "complete") status = "1";
    }
    const findByUsername = {
        'username': findBy["username"],
        'todo.task': findBy["task"],
        'todo.title': findBy["title"],
        'status': status,
    };
    const find = {
        'username': findBy['username']
    }
    for (let x in findByUsername) {
        if (findByUsername[x] == "null" || findByUsername[x] == "" || findByUsername[x] == undefined || findByUsername[x] == null) delete findByUsername[x];
    }
    let users = await db.collection("todo").find(find).toArray();
    context.log(findByUsername)
    context.log(users[0])
    for (let x in findByUsername) {
        for (let y in users) {
            if (!(x.includes("."))) {
                if ((users[y][x].toLowerCase()).includes(findByUsername[x].toLowerCase())) {
                    getTask.push(users[y])
                }
            }
            else {
                let z = x.substring(0, x.indexOf("."));
                let z1 = x.substring(x.indexOf(".") + 1);
                if ((users[y][z][z1].toString().toLowerCase().trim()).includes(findByUsername[x].toString().toLowerCase().trim())) {
                    getTask.push(users[y])
                }
            }
        }
        users = getTask
        getTask = []
    }
    context.log(findBy["enddate"])
    if (findBy["enddate"] == undefined && findBy["startdate"] == undefined)
        task = users;
    else {
        for (let i in users) {
            if (findBy["enddate"] != undefined && findBy["startdate"] != undefined) {
                if (
                    new Date(users[i]["date"]) >= new Date(findBy["startdate"]) &&
                    new Date(users[i]["date"]) <= new Date(findBy["enddate"])
                )
                    task.push(users[i]);
            } else if (findBy["enddate"] == undefined && findBy["startdate"] != undefined) {
                if (new Date(users[i]["date"]) >= new Date(findBy["startdate"]))
                    task.push(users[i]);
            } else if (findBy["enddate"] != undefined && findBy["startdate"] == undefined) {
                if (new Date(users[i]["date"]) <= new Date(findBy["enddate"]))
                    task.push(users[i]);
            } else task.push(users[i]);
        }
    }

    context.res = {
        body: task,
    };
};
