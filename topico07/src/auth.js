import jsonwebtoken from "jsonwebtoken";

export const PRIVATE_KEY = '1010FFF'
export const user = {
  name: 'Zezinho silva',
  email: 'zezinho@example.com'
}

export function tokenValited(
  req,
  res,
  next
) {
    //Primeiro pegamos o token enviado por meio do header authorization e se ele não existir retornamos uma mensagem para o cliente.
  const [, token] = req.headers.authorization?.split(' ') || [' ', ' '];

  if(!token) return res.status(401).send('Acesso negado. Nenhum token fornecido.');

    //Se existir o token chegou a hora de fazer a validação do mesmo. Para isso o jsonwebtoken nos fornece a função verify, ela recebe o token e a nossa secret key para para podermos decodificar o token. Se tudo ocorrer bem, nos é retornado as informações que codificamos na criação do token, no caso, as informações do usuário que aqui setamos na constante payload.
  try {
    const payload = jsonwebtoken.verify(token, PRIVATE_KEY);
    const userIdFromToken = typeof payload !== 'string' && payload.user;

    //Se o payload estiver vazio ou não tiver o usuário, o token é invalido e retornamos para o cliente o código 401
    if(!user && !userIdFromToken) {
      return res.send(401).json({ message: 'Token inválido' });
    }

    //Com as informações contidas no token decodificadas, colocamos elas em um header customizado, chamado user. É importante notar que o retorno é a next(), isso indica que podemos prosseguir com o fluxo do cliente enviando ele para a rota que ele solicitou já com o header atualizado com a informação que continha o token.
    req.headers['user'] = payload.user;

    return next();
  } catch(error) {
    console.log(error);
    return res.status(401).json({ message: 'Token inválido' });
  }
}

// GET http://localhost:45678/


// GET http://localhost:45678/login
// Authorization: Basic user:password


// GET http://localhost:45678/private
// Authorization: Bearer token

// import jsonwebtoken from "jsonwebtoken";
// import dotenv from  "dotenv";

// dotenv.config();

// export const PRIVATE_KEY = process.env.PRIVATE_KEY;