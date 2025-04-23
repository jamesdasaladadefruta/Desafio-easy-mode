import express from "express"
import sqlite3 from "sqlite3"
import cors from "cors"
import bodyParser from "body-parser"

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cors())


const db = new sqlite3.Database("./db.sqlite")

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS jogos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome varchar(100),
        img TEXT,
        valor FLOAT,
        descricao TEXT,
        classificacao TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS login(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome varchar(100),
        email varchar(100),
        senha varchar(30)
    )`);
})


app.get("/home", (req, res) => {

})

app.get("/jogos", (req, res) => {
    db.all(`SELECT * FROM jogos `, [], (err, rows) => {
        res.json(rows)
    })
})

app.post("/jogo/:id", (req, res) => {

    const { nome, img, valor, descricao, classificacao } = req.body

    db.run(`INSERT INTO jogos(nome,img,valor,descricao,classificacao) VALUES(?,?,?,?,?)`, [nome, img, valor, descricao, classificacao])
})


app.post("/userc/:id", (req, res) => {

    const { nome, email, senha } = req.body

    db.run(`INSERT INTO login(nome,email,senha) VALUES(?,?,?)`, [nome, email, senha])

})

app.get("/userl", (req, res) => {
    db.all(`SELECT * FROM login `, [], (err, rows) => {
        res.json(rows)
    })

})


app.listen(8080, () => {
    console.log("Servidor aberto na porta 8080")
})