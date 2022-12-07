const Sequelize = require("sequelize");

//Configuração de conexão com o Banco de Dados
//Cria-se um novo objeto Sequelize

/*
1º - O nome do Banco de Dados - guiaperguntas
2º - O usuário - root
3º - A senha - 123456
*/
const connection = new Sequelize('guiaperguntas', 'root', '123456', {
    host: 'localhost',// o host do banco - nesse caso o host é o meu prórpio computador por isso localhost
    dialect: 'mysql'//dialect - tipo do banco de dados
});


module.exports = connection;
