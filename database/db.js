const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'meuservidor',
    database: 'lojaGames'
})

conexao.connect((error)=>{
    if(error){
        console.log('erro de conexão com banco de dados: '  + error);
        return
    }else{
        console.log('banco conectado')
    }
})

module.exports = conexao;