const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const port = process.env.PORT || 3000;

let app = express();
app.set('view engine','hbs');
app.use(express.static("./../public"));

app.use(bodyParser.json());

app.get('/',(req,res) => {
   res.render('./../public/about.hbs');
})

app.post('/todos',(req,res) => {

    // console.log(req.body);

    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(400).send(err);
    });

});

// get.todos
app.get('/todos',(req,res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        });
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// get/todos/id
app.get('/todos/:id',(req,res) => {
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        console.log("FAil");
         res.status(404).send("Id Invalid");
    }

    Todo.findById(id).then((todo) => {
        res.send({todo});
    },(err) => {
        res.status(404).send();
    }
    ).catch((err) => {
        res.status(400).send(err);
    });
});

//DELETE //delete
app.delete('/todos/:id',(req,res) => {
    let idD = req.params.id;
    if(!ObjectID.isValid(idD)){
        console.log("FAil");
         res.status(404).send("Id Invalid");
    }

    Todo.findOneAndDelete(idD).then((todo) => {
        res.send({todo});
    },(err) => {
        res.status(404).send();
    }
    ).catch((err) => {
        res.status(400).send(err);
    });
});

//update
app.patch('/todos/:id',(req,res) => {

    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send("Invalid id");
    }

    let body = _.pick(req.body, ['text','completed']);

    //if completed then set completedAt time
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }
    else{
        body.completedAt = null;
        body.completed = false;
    }

    Todo.findOneAndUpdate(id,{$set : body},{new: true}).then((result) => {
        if(!result){
            return res.status(404).send("Not found");
        }
        res.send({result});
    }).catch((err) => {
        return res.status(400).send(err);
    });;

});

//add users
app.post('/users',(req,res) => {
    let body = _.pick(req.body,['email','password']);

    console.log("Yes");

    let users = new User(body);

    users.save().then((result) => {
        // console.log(res);
        res.send(result);
    }).catch((err)=> {
         res.status(400).send(err);
    })

});

app.listen(port,() => {
    console.log(`Started on port ${port}`);
});




