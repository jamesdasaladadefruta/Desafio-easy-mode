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
        nome varchar(100) NOT NULL,
        img TEXT NOT NULL,
        valor FLOAT NOT NULL,
        descricao TEXT NOT NULL,
        classificacao TEXT NOT NULL
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS login(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome varchar(100) NOT NULL,
        email varchar(100) NOT NULL,
        senha varchar(30) NOT NULL
    )`)
})


app.get("/home", (req, res) => {

})

app.get("/jogos", (req, res) => {
    db.all(`SELECT * FROM jogos `, [], (err, rows) => {
        res.json(rows)
    })
})

app.post("/jogo", (req, res) => {

    const { nome, img, valor, descricao, classificacao } = req.body

    db.run(`INSERT INTO jogos(nome,img,valor,descricao,classificacao) VALUES(?,?,?,?,?)`, [nome, img, valor, descricao, classificacao])
})







app.post("/userc", (req, res) => {

    const { nome, email, senha } = req.body

    db.run(`INSERT INTO login(nome,email,senha) VALUES(?,?,?)`, [nome, email, senha])

})

app.get("/userl", (req, res) => {
    db.all(`SELECT * FROM login `, [], (err, rows) => {
        res.json(rows)
    })
})



app.post('/validacao', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    db.get(`SELECT * FROM login WHERE email = ? AND senha = ?`, [email, senha], (err, row) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao acessar o banco de dados" });
        }

        if (row) {
            res.status(200).json({ mensagem: "Login válido", usuario: row });
        } else {
            res.status(401).json({ mensagem: "Email ou senha incorretos" });
        }
    });
});


app.listen(8080, () => {
    console.log("Servidor aberto na porta 8080")
})