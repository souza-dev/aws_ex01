# Trabalho Prático 1 - Implementação de API

Aluno: Thiago Augusto de Souza.

Primeiro trabalho prático da disciplina APIS e WebServices do Curso de Pós Graduação em Engenharia de Software da PUC Minas.

## Instalação dos pacotes

```bash
npm install
```

ou

```bash
yarn
```

## Iniciando o servidor

```bash
node index.js
```

## Rodando os testes

```bash
npm test
```

ou

```bash
yarn test
```

## Consultando o resources Pessoas

Enviando o request com a etag retornada no request anterior no header If-None-Match, a API retorna código de Status 304 (lembrando de conferir a etag na responde do request feito).

### Request

`GET /pessoas/`

    curl -i -H 'Accept: application/json' http://localhost:3000/pessoas/

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 75
    ETag: W/"4b-zyJn4kBQTxnI5Ba3nVko4HnsIqc"
    Date: Sat, 21 Oct 2023 22:34:38 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    [{"id":1,"nome":"Marcelo"},{"id":2,"nome":"João"},{"id":3,"nome":"Maria"}]

### Request com etag

`GET /pessoas/`

    curl -i -H 'Accept: application/json' -H 'If-None-Match: W/"4b-zyJn4kBQTxnI5Ba3nVko4HnsIqc"' http://localhost:3000/pessoas/

### Response

    HTTP/1.1 304 Not Modified
    X-Powered-By: Express
    ETag: W/"4b-zyJn4kBQTxnI5Ba3nVko4HnsIqc"
    Date: Sat, 21 Oct 2023 22:45:36 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

## Consultando uma Pessoa com id específico

Utilizando a rota /pessoas/:id, é possível obter uma pessoa com o id específico. Caso o id não seja encontrado a api retorna código de status 404.

### Request

`GET /pessoas/1`

    curl -i -H 'Accept: application/json' http://localhost:3000/pessoas/1

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 25
    ETag: W/"19-03a+iFXElACaraLPXUBmeqTXPR0"
    Date: Sat, 21 Oct 2023 22:52:24 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"id":1,"nome":"Marcelo"}

### Request com id inexistente

    curl -i -H 'Accept: application/json' http://localhost:3000/pessoas/42

### Response

    HTTP/1.1 404 Not Found
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 47
    ETag: W/"2f-ny1+eF43aDdo0XnZW7XCGaSjnXI"
    Date: Sat, 21 Oct 2023 22:53:46 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"error":{"message":"Recurso não encontrado"}}%

## Criando um novo recurso Pessoa

Utilizando um POST e enviando um body do tipo {id: number, nome: string} é criado um novo objeto pessoa e a api retorna o objeto criado e código de status 201. Se o id já estiver em uso a api retorna código de status 409. Caso o objeto enviado falte alguma das propriedades a api retorna código de status 409.

### Request criação de recurso.

    curl -d '{"id":"4", "nome": "Thiago"}' -i -H 'Accept: application/json' -H 'Content-Type: application/json' -X POST http://localhost:3000/pessoas/

### Response

    HTTP/1.1 201 Created
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 26
    ETag: W/"1a-jWo83cWnaFSjIP777ZCljWUcHiA"
    Date: Sat, 21 Oct 2023 23:13:10 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"id":"4","nome":"Thiago"}

### Request criação de recurso com id já existente.

    curl -d '{"id":"4", "nome": "Thiago"}' -i -H 'Accept: application/json' -H 'Content-Type: application/json' -X POST http://localhost:3000/pessoas/

### Response

    HTTP/1.1 409 Conflict
    X-Powered-By: Express
    ontent-Type: application/json; charset=utf-8
    Content-Length: 65
    ETag: W/"41-+D3JEmS6xgxaaTEXnYLB4RHzPU0"
    Date: Sat, 21 Oct 2023 23:14:31 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"error":{"message":"Já existe um recurso com o id solicitado"}}

### Request criação de recurso mal formado.

    curl -d '{"id":"4"}' -i -H 'Accept: application/json' -H 'Content-Type: application/json' -X POST http://localhost:3000/pessoas/

### Response

    HTTP/1.1 400 Bad Request
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 71
    ETag: W/"47-CTd5Ugzie0NXfApfgiZ2PZ9SN1A"
    Date: Sat, 21 Oct 2023 23:15:49 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"error":{"message":"Os dados enviados malformados ou faltando dados"}}

## Rotas carros e rotas animais

As rotas carros e animais funcionam de forma análoga às rotas pessoas.
A única diferença é que os objetos inserido no recursos carro é da forma {id: number, modelo: string} enquanto as rotas pessoas e animais tem objetos do tipo {id: number, nome: string}
