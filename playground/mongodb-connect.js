const MongoClient = require("mongodb").MongoClient;
const conUrl = "mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb";
console.log("Started");


MongoClient.connect(conUrl,{ useNewUrlParser: true },(err,client) => {

    if(err){
        return console.log("Couldnt connect to db");
    }
    console.log("Connected Succesfully");
    let db = client.db('TodoApp');
    

    // db.collection("Todos").insertOne({
    //     text: "Some work to do",
    //     completed: false
    // },(err,result) => {
    //     if(err){
    //         return  console.log("Couldnt connect to collection");
    //     }

    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    db.collection("Users").insertOne({
        name : "Ashish",
        age : 21 ,
        location : 'India'
    },(err,res) => {
        if(err){
             return  console.log("Couldnt connect to collection");
        }
        
        console.log(JSON.stringify(res.ops,undefined,2));
    });


    client.close();
})