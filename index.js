import express from "express"
import sqlite3 from "sqlite3"
import cors from "cors"
import bodyParser from "body-parser"




const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cors())

const db = new sqlite3.Database("./db.sqlite")


db.serialize(()=>{
   db.run(`CREATE TABLE IF NOT EXISTS tabela(
        id PRIMARY KEY AUTOINCREMENT,
        nome varchar(100)
    )`)
})


app.get("/home",(req,res)=>{
   db.all(`SELECT * FROM tabela `,[],(err,rows)=>{
     res.json(rows)
   })
})

app.post("/produtos/:id",(req,res)=>{
    db.run(`INSERT INTO tabela(nome) VALUES(?)`,[req.params.id])
})


app.listen(8080,()=>{
    console.log("Servidor aberto na porta 8080")
})