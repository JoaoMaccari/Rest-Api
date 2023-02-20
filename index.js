const express = require('express');
const app = express();
const conexao = require('./database/db')

app.use(express.json())
app.use(express.urlencoded({ extended: true}));

app.get('/games', (req, res)=>{
    res.status = 200;
    conexao.query('SELECT * FROM jogos', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.send(results)
        }
    })
})

app.get('/game/:id', (req, res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{

        var id = parseInt(req.params.id)

        conexao.query('SELECT * FROM jogos WHERE id =?', [id], (error, result) =>{
            if(error){
                
                throw error;
                
            }else{
                res.send(result)
                
            }
        })
 
    }
});

app.post('/game', (req, res) =>{
    var {titulo, preco, ano} = req.body

    conexao.query('INSERT INTO jogos SET ?', {titulo: titulo, preco:preco, ano:ano}, (error, results) =>{
        if(error){
            res.send(error)
        }else{
            res.sendStatus(200)
        }
    })
});

app.delete('/game/:id', (req, res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        conexao.query('DELETE FROM jogos WHERE id =?', [id], (error, results)=>{
            if(error){
                throw error
            }else{
                res.sendStatus(200);
            }

           
        })
    }

})

app.put('/game/:id', (req, res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = req.body.id
        var {titulo, preco, ano} = req.body

        if(titulo != undefined){
            conexao.query('UPDATE jogos SET ? WHERE id =? '), {titulo: titulo}, [id], (error, result) =>{
                
            }
        }
       

        
 
    }

})

app.listen(8000, () =>{
    console.log('ap rodando');
})