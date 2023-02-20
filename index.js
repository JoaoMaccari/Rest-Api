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

        
        // if(game != undefined){
        //     res.json(game)
        // }else{
        //     res.sendStatus(404);
        // }
       

       
    }
})

app.listen(8000, () =>{
    console.log('ap rodando');
})