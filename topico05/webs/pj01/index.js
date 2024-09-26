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

app.post("/game", (req,res)=>{
    const {id,title,price,year} = req.body;

    DB.games.push({
        id,
        title,
        price,
        year
    });

    res.sendStatus(200);
});

app.get("/games",(req,res) =>{
    res.statusCode = 200;
    res.json(DB.games);
});


app.listen(45678, () => {
    console.log("Aplicação rodando nao porta 45678");
});


