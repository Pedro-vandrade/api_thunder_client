import express from 'express'
const app = express()

const PORT = 3000

app.use(express.json())


const loja = ('Projeto API - Loja Online')


app.get('/loja', (req, res) => {
    res.send(`Seja bem vindo a ${loja}`)
})

app.get('/produtos', (req, res) => {
    return res.json(produtos)
})

app.post('/produtos', (req, res) => {
    const { nome, preco, categoria } = req.body

    if(!nome || !preco || !categoria) {
        return res.status(400).json(({ message : "Todos os campos são obrigatórios."}))
    }
    const novoProduto = {
        id: produtos.length + 1,
        nome,
        preco,
        categoria
    }
    produtos.push(novoProduto)
    return res.status(201).json(novoProduto)
})

app.put('/produtos/:id', (req, res)  =>{
    const { id } = req.params
    const{nome, preco, categoria} = req.body

    const produtoIndex = produtos.findIndex(prod => prod.id === Number(id))

    if(produtoIndex === -1) {
        return res.status(404).json({mensagem : " Produto não existe."})
    }
    
    if(!nome || !preco || !categoria) {
        return res.status(400).json({mensagem : "Todos os campos são obrigatórios"})
    }
    produtos[produtoIndex] = {
        id: Number(id),
        nome,
        preco,
        categoria
    }

    return res.json({mensagem: "Produto atualizado com sucesso.", produto: produtos[produtoIndex]})
})


app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params
    const produtoIndex = produtos.findIndex(prod => prod.id === Number(id))

    if(produtoIndex === -1){
        return res.status(404).json({mensagem: "Produto não encontrado."})
    }
    const produtoRemovido = produtos.splice(produtoIndex, 1)

    return res.json({
        mensagem: " produto removido com sucesso.",
        produto: produtoRemovido[0]
    })
})

app.listen(3000 , () => console.log(`Servidor rodando na porta ${PORT}`))

export default app