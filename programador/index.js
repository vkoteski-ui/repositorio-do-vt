/ npm init -y
// npm i express mysql2 bcrypt jsonwebtoken dotenv cors

require("dotenv").config()
const express = require("express")
const app = express()
const port = 3000
app.use(express.json())
const port = process.env.PORT || 3000

// npm i mysql2
const db = require("./db")

// npm i bcrypt
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const { criar_tabelas } = require("./migration")

app.use(express.json())
app.use(cors())

// ===================== ROTAS =====================

// POST /cliente  → Cadastro
app.post("/cliente", async (req, res) => {
    try {
        const cliente = req.body
        const senhaCript = bcrypt.hashSync(cliente.senha, 10)
        cliente.senha = senhaCript

        // envio para o BD
        const resultado = await db.pool.query(
            `INSERT INTO cliente (
                nome, cpf, celular, email, senha
            ) VALUES ( ?, ?, ?, ?, ? )`,
            [cliente.nome, cliente.cpf, cliente.celular,
             cliente.email, cliente.senha]
            `INSERT INTO cliente (nome, cpf, celular, email, senha)
             VALUES (?, ?, ?, ?, ?)`,
            [cliente.nome, cliente.cpf, cliente.celular, cliente.email, cliente.senha]
        )

        res.status(201).json({
            mensagem: "Cliente cadastrado, ID = " + resultado[0].insertId
            msg: "Cliente cadastrado com sucesso! ID = " + resultado[0].insertId
        })
    } catch (error) {
        res.status(500).json({erro: error.message})
        res.status(500).json({ erro: error.message })
    }
})

app.get("/cliente", async (req, res) => {
// POST /login
app.post("/login", async (req, res) => {
    try {
        const user = req.body

        const resultado = await db.pool.query(
            `SELECT id, nome, cpf, celular, email
             FROM cliente`
            "SELECT id, nome, email, senha FROM cliente WHERE email = ?",
            [user.email]
        )

        res.status(200).json(resultado[0])

    } catch (error) {
        res.status(500).json({
            erro: error.message
        })
    }
})
        const dados_bd = resultado[0][0]

app.get("/cliente/:id", async (req, res) => {
    try {
        if (!dados_bd) {
            return res.status(401).json({ msg: "Email não cadastrado!" })
        }

        const id = req.params.id
        const senha_valida = await bcrypt.compare(user.senha, dados_bd.senha)

        const resultado = await db.pool.query(
            `SELECT id, nome, cpf, celular, email
             FROM cliente
             WHERE id = ?`,
            [id]
        )
        if (!senha_valida) {
            return res.status(401).json({ msg: "Credenciais inválidas!" })
        }

        if (resultado[0].length === 0) {
            return res.status(404).json({
                mensagem: "Cliente não encontrado"
            })
        const payload = {
            id: dados_bd.id,
            email: dados_bd.email
        }

        res.status(200).json(resultado[0][0])
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" })

    } catch (error) {
        res.status(500).json({
            erro: error.message
        return res.status(200).json({
            nome: dados_bd.nome,
            token: token
        })

    } catch (error) {
        res.status(500).json({ erro: error.message })
    }
})

app.put("/cliente/:id", async (req, res) => {
    try {
// Middleware de autenticação JWT
function autenticar(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

        const id = req.params.id
        const cliente = req.body
    if (!token) {
        return res.status(401).json({
            erro: "Token não enviado. Use: Authorization Bearer <token>"
        })
    }

        const resultado = await db.pool.query(
            `UPDATE cliente
             SET nome = ?,
                 cpf = ?,
                 celular = ?,
                 email = ?
             WHERE id = ?`,
            [
                cliente.nome,
                cliente.cpf,
                cliente.celular,
                cliente.email,
                id
            ]
    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if (err) {
            return res.status(403).json({ erro: "Token inválido ou expirado" })
        }
        req.usuario = usuario
        next()
    })
}

// GET /cliente/perfil  → Rota protegida
app.get("/cliente/perfil", autenticar, async (req, res) => {
    try {
        const id = req.usuario.id
        const result = await db.pool.query(
            "SELECT id, nome, cpf, celular, email FROM cliente WHERE id = ?",
            [id]
        )

        if (resultado[0].affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Cliente não encontrado"
            })
        }
        const perfil = result[0][0]

        res.status(200).json({
            mensagem: "Cliente alterado com sucesso"
        })
        if (!perfil) {
            return res.status(404).json({ erro: "Cliente não encontrado" })
        }

    } catch (error) {
        res.status(500).json({
            erro: error.message
        })
        res.status(200).json(perfil)
    } catch (err) {
        res.status(500).json({ erro: "Erro interno do servidor" })
    }
})

app.delete("/cliente/:id", async (req, res) => {
    try {

        const id = req.params.id

        const resultado = await db.pool.query(
            `DELETE FROM cliente
             WHERE id = ?`,
            [id]
        )
// ===================== INICIAR SERVIDOR =====================

        if (resultado[0].affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Cliente não encontrado"
            })
        }
async function iniciar() {
    try {
        console.log("🔄 Executando migration...")
        await criar_tabelas()          // ← Automação da migration
        console.log("✅ Migration concluída!")

        res.status(200).json({
            mensagem: "Cliente excluído com sucesso"
        app.listen(port, () => {
            console.log(`🚀 API rodando na porta ${port}`)
        })

    } catch (error) {
        res.status(500).json({
            erro: error.message
        })
        console.error("❌ Erro ao iniciar a API:", error.message)
        process.exit(1)
    }
})

}

app.listen(port, () => {
    console.log("API rodando na porta " + port)
})
iniciar()