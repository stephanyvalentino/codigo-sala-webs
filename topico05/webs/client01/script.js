async function getAllGames(){
    const response = await fetch('http://localhost:45678/games');
    const data = await response.json();
    console.log(data);
}


async function getGameId(id){
    const response = await fetch(`http://localhost:45678/game/${id}`);
    const data = await response.json();
    console.log(data);
}

getAllGames();

getGameId(23);