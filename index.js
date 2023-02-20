const express = require('express');
const app = express();
const conexao = require('./database/db')

app.use(express.json())
app.use(express.urlencoded({ extended: true}));

app.get('/games', (req, res)=>{
    conexao.query('SELECT * FROM jogos', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.send(results)
        }
    })
})

app.listen(8000, () =>{
    console.log('ap rodando');
})