const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");// Importar Model(tabela) para perguntas
const Resposta = require("./database/Resposta")

//Autenticação com a conexão com o Banco de Dados
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão com o Banco de Dados realizada com Sucesso!!!")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })

//Estou dizendo para o Express usar o EJS como View Engine
app.set('view engine', 'ejs')
app.use(express.static('public'));

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));// Permite que capture dados do formulário e transforme em linguagem Javasacript
app.use(bodyParser.json())// Permite que a gente leia dados de formulários enviados vi JSON

//Rotas
app.get("/", (req, res) => {
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']// ASC=> CRESCENTE || DESC => DESCRESCENTE
    ]}).then(perguntas =>{
        res.render("index", {
            perguntas: perguntas
        });
    })
});

app.get("/perguntar",(req,res) =>{
    res.render("perguntar");
})
//Rota para receber dados do formulário
//Metodo POST do formulário
app.post("/salvarpergunta", (req, res) => {
    //Armazenando os valores inserirdos nos INPUTs no Formulário
    var receberTitulo = req.body.titulo;
    var receberDescricao = req.body.descricao
    //Inserir valores capturados do formulário na tabela SQL
    Pergunta.create({
        titulo: receberTitulo,
        descricao: receberDescricao
    }).then(()=>{
        res.redirect("/");
    })
});

app.get("/pergunta/:id",(req, res) =>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){// Pergunta Encontrada
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else{// Pergunta não Encontrada
            res.redirect("/");
        }
    });
})

app.post("/responder", (req, res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=> {
        res.redirect("/pergunta/"+perguntaId)
    })
});


//Setar a porta do servidor
app.listen(8080,()=>{
    console.log("App rodando!!!")
})
