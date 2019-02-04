const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const port = process.env.PORT || 3000;

let app = express();

app.use(bodyParser.json());

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


app.listen(port,() => {
    console.log(`Started on port ${port}`);
});




