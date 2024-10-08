const client_id = "c0a98aceeab8444fbf75a11d9a610a23";
const clientSecret = "6d31390b5759444ba6b40c1910f099b2";

const getToken = async () => {
    const result = await fetch ("https://accounts.spotify.com/api/token",{
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${btoa(`${client_id}:${clientSecret}`)}`
        },
        body: "grant_type=client_credentials"
    });

    const data = await result.json();
    return data.access_token;
};


(async () => {

    const token = await getToken();
    console.log(token);

})();

const getGenres = async (token) =>{

    const result = await fetch("https://api.spotify.com/v1/browse/categories?locale=pt_BR",{
        method:'GET',
        headers:{
            Authorization: "Bearer " + token,
        }
    });

    const data = await result.json();
    return data.categories.items;
}

(async () => {

    const token = await getToken();
    const genres = await getGenres(token);

    console.log(token);
    console.log(genres);

})();

const getPlaylistByGenre = async (token, genreId) => {
    const limit = 10;
  
    const result = await fetch(
      `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
  
    const data = await result.json();
    return data.playlists.items;
  };

  const getTracks = async (token, tracksEndPoint) => {
    const limit = 10;
  
    const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
  
    const data = await result.json();
    return data.items;
  };

  const getTrack = async (token, trackEndPoint) => {
    const result = await fetch(`${trackEndPoint}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
  
    const data = await result.json();
    return data;
  };

  //Utilizando a api https://develop.battle.net/documentation liste as cartas do jogo heartstone