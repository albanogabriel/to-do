//?search=Gabriel

// query -> ?search=Gabriel&page=2
// query.substr(1) -> search=Gabriel&page=2
// query.substr(1).split('&') -> [ 'search=Gabriel', 'page=2' ]
// query.substr(1).split('&').reduce(() => {} ,{}) -> // reduce() é um método JavaScript para percorrer o array e transformalo em outra coisa(nesse caso em um objeto)

// reduce(queryParams, param)
// 1º Arg(QueryParams) - É a estrutura de dados do final do array que vamos adicionando os valores: {}
// 2º Arg(param) - é a própria query(o item, o parametro)
// const [key, value] = param.split('=') -> ['search', '2'] , ['page', '2']

export function extractQueryParams(query) {
  return query
    .substr(1)
    .split("&")
    .reduce((queryParams, param) => {
      const [key, value] = param.split("=");
      queryParams[key] = decodeURIComponent(value); // Decodifica o valor do parâmetro

      return queryParams;
    }, {});
}
