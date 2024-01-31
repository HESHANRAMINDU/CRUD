const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host : "localhost",
    user : 'root',
    password : '',
    database : "userdetails"
});

app.get('/users',(req,res)=>{
    const sql = "SELECT * FROM users";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post('/register',(req,res)=>{
    const sql = "INSERT INTO users (`Name`,`Email`,`Phone`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
    ]

    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.put('/update/:id',(req,res)=>{
    const sql = "UPDATE users SET Name = ?, Email = ?, Phone = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
    ]

    const id = req.params.id;

    db.query(sql,[...values,id],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.delete('/delete/:id',(req,res)=>{
    const sql = "DELETE FROM users WHERE id = ?";

    const id = req.params.id;

    db.query(sql,[id],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.get('/getuser/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql,[id],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.listen(8082,()=>{
    console.log("Listening");
});
