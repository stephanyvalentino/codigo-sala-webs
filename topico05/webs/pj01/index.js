const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

var DB = {
    games: [
        {
            id: 23,
            title: "The last of us part II",
            year: 2020,
            price: 130
        },
        {
            id: 65,
            title: "The legend of Zelda: breath of the wild",
            year: 2017,
            price: 150
        },
        {
            id: 2,
            title: "Grand Theft Auto IV",
            year: 2008,
            price: 20
        }
    ]
}

//lista todos os registros
app.get("/",() => {

});

//lista todos os jogos
app.get("/games",(req,res) =>{
    res.statusCode = 200;
    res.json(DB.games);
});

//busca game por id
app.get("/game/:id", (req,res)=>{
    
    if(isNaN(req.params.id)){
        res.sendStatus = 400
        res.send("Isto não é um número!")
    }else{
        const id = parseInt(req.params.id)

        const game = DB.games.find(g => g.id == id);

        if(game != undefined){
            res.statusCode = 200
            res.json(game)
        }else{
            res.sendStatus(404)
        }
    }
});

//envia dados no corpo da requisição
app.post("/game", (req,res)=>{
    const {id, title, price, year} = req.body;

    DB.games.push({
        id,
        title,
        price,
        year
    });

    res.sendStatus(200);
});

//para deletar uma infromação
app.delete("/game/:id",(req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);

        if(index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index,1);
            res.sendStatus(200);
        }
    }
});

//para atualizar uma informação
app.put("/game/:id",(req, res) => {

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{

        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);

        if(game != undefined){

            var {title, price, year} = req.body;


            if(title != undefined){
                game.title = title;
            }

            if(price != undefined){
                game.price = price;
            }

            if(year != undefined){
                game.year = year;
            }

            res.sendStatus(200);

        }else{
            res.sendStatus(404);
        }
    }

});

//servidor rodando
app.listen(45678, () => {
    console.log("Aplicação rodando nao porta 45678");
});


