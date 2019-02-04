const {MongoClient,ObjectID} = require("mongodb");
const conUrl = "mongodb://127.0.0.1:27017";

MongoClient.connect(conUrl,{useNewUrlParser:true},(err,client) => {
    if(err){
        return console.log("Connect Failed");
    }
    console.log("Succesfully Connected");
    let db = client.db('TodoApp');

    db.collection('Todos').findOneAndUpdate({
            completed: true
        },{
        $set: {
            completed: false
        }
    },{
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    }).then((err)=>{
        if(err){
            return console.log("Update error");
        }
    });

    client.close();
});