const express = require('express');
const app = express();
const conexao = require("./database/db")
const cors = require('cors')


app.use(cors())
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
        var id = req.params.id;
        var titulo = req.body.titulo;
        var preco = req.body.preco;
        var ano = req.body.ano;

        if(titulo != undefined){
            conexao.query('UPDATE jogos SET titulo=? WHERE id = ? ', [titulo, id], (error, result)=>{
                if(error){
                    console.log(result)
                    throw error
                }else{
                    res.sendStatus(200)
                }
            })

        }
        
        if(preco != undefined){
            conexao.query('UPDATE jogos SET preco=? WHERE id = ? ', [preco, id], (error, result)=>{
                if(error){
                    console.log(result)
                    throw error
                }else{
                    res.sendStatus(200)
                }
            });

        }

        if(ano != undefined){
            conexao.query('UPDATE jogos SET ano=? WHERE id = ? ', [ano, id], (error, result)=>{
                if(error){
                    console.log(result)
                    throw error
                }else{
                    res.sendStatus(200)
                }
            })

        }

    
        
        
    }

})

app.listen(8000, () =>{
    console.log('ap rodando');
})