/* Comment créer une API REST simple avec Node.js et PostgreSQL
https://morioh.com/a/9c3ded27b058/comment-creer-une-api-rest-simple-avec-nodejs-et-postgresql
https://expressjs.com/fr/api.html (pour la partie req.body)
*/

const host = '127.0.0.1';
const port = 3000;

const client = require('./connection.cjs');
const express = require('express');
const app = express();

/* Ne fonctionne pas avec la commande : curl -XPUT http://127.0.0.1:3000/users --data "{id: '1', firstname: 'ruru', lastname: 'rudy', location: 'nancy'}"
//const bodyParser = require("body-parser");
//app.use(bodyParser.json());
*/

/* Fonctionne en mode application/x-www-form-urlencoded */
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// curl -XGET http://127.0.0.1:3000/admin/users
app.get('/admin/users', (req, res)=> {
    client.query(`SELECT EXISTS (SELECT FROM pg_tables WHERE tablename='users')`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
});

// curl -XPUT http://127.0.0.1:3000/admin/users
app.put('/admin/users', (req, res)=> {
    let updateQuery = `create table users (
                       id SERIAL,
                       firstname VARCHAR(30) NOT NULL,
                       lastname VARCHAR(30) NOT NULL,
                       location VARCHAR(30) NOT NULL)`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Create table users was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
});

// curl -XDELETE http://127.0.0.1:3000/admin/users
app.delete('/admin/users', (req, res)=> {
    let insertQuery = `drop table if exists users`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Drop table users was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
});

// curl -XGET http://127.0.0.1:3000/users
app.get('/users', (req, res)=>{
    client.query(`select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
});

// curl -XGET http://127.0.0.1:3000/users/1
app.get('/users/:id', (req, res)=>{
    client.query(`select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
});

// curl -XPUT http://127.0.0.1:3000/users --data "id=1&firstname=ruru&lastname=rudy&location=nancy"
app.put('/users', (req, res)=> {
    let user = req.body;
    console.log(user);
    let insertQuery = `insert into users(id, firstname, lastname, location) 
                       values(${user.id}, '${user.firstname}', '${user.lastname}', '${user.location}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
});

// curl -XPOST http://127.0.0.1:3000/users/1 --data "firstname=tutu&lastname=rudy&location=nancy"
app.post('/users/:id', (req, res)=> {
    let user = req.body;
    console.log(user);
    let updateQuery = `update users
                       set firstname = '${user.firstname}',
                       lastname = '${user.lastname}',
                       location = '${user.location}'
                       where id = ${req.params.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
});

// curl -XDELETE http://127.0.0.1:3000/users/1
app.delete('/users/:id', (req, res)=> {
    let insertQuery = `delete from users where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
});

app.listen(port, host, ()=>{
    console.log("Sever is now listening at port 3000");
})

client.connect();
