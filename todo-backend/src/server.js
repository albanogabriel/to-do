import http from "node:http";
import { json } from "./middleware/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

// Query Parameters: URL Stateful
// Route Parameters: Identificação de recurso
// Request body: Envio de informações de um formulário

// https://localhost:3333/users?userId=1

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  // Configurando CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permite todas as origens
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  ); // Permite os métodos necessários
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Permite cabeçalhos específicos

  // Verificando OPTIONS request (preflight)
  if (method === "OPTIONS") {
    return res.writeHead(204).end();
  }

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333, () => {
  console.log("Server is running on port 3333");
});
