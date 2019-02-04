const {MongoClient,ObjectID} = require("mongodb");
const conUrl = "mongodb://127.0.0.1:27017";

MongoClient.connect(conUrl,{useNewUrlParser : true},(err,client) => {
    if(err){
        return console.log("Connect failed",err);
    }
    console.log("Succesfully Connected");

    let db = client.db("TodoApp");

    db.collection("Todos").find({completed: false}).toArray().then((docs) => {
        console.log(JSON.stringify(docs,undefined,2));
    },(err) => {
        if(err){
            return console.log(" Retrieve Error");
        }
    });

    client.close();
    
});