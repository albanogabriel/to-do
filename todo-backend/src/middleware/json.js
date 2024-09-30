// Middlware
// É um interceptador
// Dentro do node a nível técnico: é uma função que vai interceptar a nossa requisição(req, res)
// sempre vão receber (req, res), que serão tratados lá dentro do Middleware

export async function json(req, res) {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  res.setHeader("Content-type", "application/json");
}
