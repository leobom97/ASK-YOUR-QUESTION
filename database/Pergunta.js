const Sequelize = require("sequelize");
const connection = require("./database");

/*
Models para criação de Tabelas no sql
Models são recursos do Node utilizados para criação de tabelas sql,
utilizando linguagem javascript ao invés de linguagem SQL
*/

/* Método define, nos permite definir uma tabela, 
e esse método aceita dois parâmetros: O nome da tabela e as configuraçõs dos campos
*/
const Pergunta = connection.define('pergunta',{
    //Coluna Título
    titulo:{
        type: Sequelize.STRING,//Tipo da coluna - O string equivale ao VARCHAR do SQL
        allowNull: false//allowNull- configuração para definir se a coluna aceita valores nulos ou não
    },
    //Coluna Descrição
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

/* Método sync {sincronizar em inglês} pode ser utilizado para criar uma condição: 
se já houver uma tabela com o nome de 'pergunta', então o sync não irá criar 
outra tabela com o mesmo nome*/ 
Pergunta.sync({force: false}).then(()=>{})

module.exports = Pergunta