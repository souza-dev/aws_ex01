const request = require('supertest');
const { app, resultados } = require('./index');

describe('GET / ', () => {
    test('Deve retornar o título do trabalho (Status 200).', async () => {
        const response = await request(app).get('/');
        expect(response.text).toEqual('Trabalho prático 1 - Implentação de API - PUC MG');
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /pessoas ', () => {
    test('Deve retornar o array de pessoas (Status 200).', async () => {
        const response = await request(app).get('/pessoas');
        expect(response.body).toEqual(resultados.pessoas);
        expect(response.statusCode).toBe(200);
    });
    test('Se os recursos não foram modificado, deve retornar Status 304.', async () => {
        const firstRes = await request(app).get('/pessoas');
        const secondRes = await request(app).get('/pessoas').set('If-None-Match', firstRes.headers.etag.toString());
        expect(secondRes.statusCode).toBe(304);
     });
    test('Se os recurso foram modificados deve retornar o novo array (Status 200).', async () => {
        const firstRes = await request(app).get('/pessoas');
        const data = { id: 4, nome: 'Thiago' };
        const response = await request(app)
            .post('/pessoas', data)
            .send(data);
        const secondRes = await request(app).get('/pessoas').set('If-None-Match', firstRes.headers.etag.toString());
        expect(secondRes.statusCode).toBe(200);
        expect(secondRes.body).toEqual(resultados.pessoas);
    });
});

describe('GET /pessoas/:id ', () => {
    const expectedUser = resultados.pessoas[0];
    test(`Deve retornar a pessoa com id ${expectedUser.id} (Status 200).`, async () => {
        const response = await request(app).get(`/pessoas/${expectedUser.id}`);
        expect(response.body).toEqual(expectedUser);
        expect(response.statusCode).toBe(200);
    });

    test('Deve retornar erro caso o recurso não seja encontrado (Status 404).', async () => {
        const unexpectedId = 42;
        const response = await request(app).get(`/pessoas/${unexpectedId}`);
        expect(response.body).toEqual({ error: { message: 'Recurso não encontrado' } });
        expect(response.statusCode).toBe(404);
    });
});

describe('POST /pessoas ', () => {
    test('Deve inserir uma pessoa nos dados e retornar o dado inserido (Status 201).', async () => {
        const data = { id: 5, nome: 'Souza' };
        const response = await request(app)
            .post('/pessoas', data)
            .send(data);
        expect(response.body).toEqual(data);
        expect(response.statusCode).toBe(201);
    });
    test('Deve retornar um erro quando o json está faltando dados (Status 400).', async () => {
        const data = { nome: 'Thiago' };
        const response = await request(app)
            .post('/pessoas', data)
            .send(data);
        expect(response.body).toEqual({ error: { message: 'Os dados enviados malformados ou faltando dados' } });
        expect(response.statusCode).toBe(400);
    });
    test('Deve avisar que o recurso já existe caso tente inserir com um id existente (Status 409).', async () => {
        const data = { id: 1, nome: 'Thiago' };
        const response = await request(app)
            .post('/pessoas', data)
            .send(data);
        expect(response.body).toEqual({ error: { message: 'Já existe um recurso com o id solicitado' } });
        expect(response.statusCode).toBe(409);
    });
});

describe('GET /carros ', () => {
    test('Deve retornar o array de carros', async () => {
        const response = await request(app).get('/carros');
        expect(response.body).toEqual(resultados.carros);
        expect(response.statusCode).toBe(200);
    });
    test('Se os recursos não foram modificado, deve retornar Status 304.', async () => {
        const firstRes = await request(app).get('/carros');
        const secondRes = await request(app).get('/carros').set('If-None-Match', firstRes.headers.etag.toString());
        expect(secondRes.statusCode).toBe(304);
    });
    test('Se os recursos foram modificados deve retornar o novo array (Status 200).', async () => {
        const firstRes = await request(app).get('/carros');
        const data = { id: 4, modelo: 'Ferrari' };
        const response = await request(app)
            .post('/carros', data)
            .send(data);
        const secondRes = await request(app).get('/carros').set('If-None-Match', firstRes.headers.etag.toString());
        expect(secondRes.statusCode).toBe(200);
        expect(secondRes.body).toEqual(resultados.carros);
    });
});

describe('GET /carros/:id ', () => {
    const expectedUser = resultados.carros[0];
    test(`Deve retornar o carro com id ${expectedUser.id}`, async () => {
        const response = await request(app).get(`/carros/${expectedUser.id}`);
        expect(response.body).toEqual(expectedUser);
        expect(response.statusCode).toBe(200);
    });

    test('Deve retornar erro caso o recurso não seja encontrado', async () => {
        const unexpectedId = 42;
        const response = await request(app).get(`/carros/${unexpectedId}`);
        expect(response.body).toEqual({ error: { message: 'Recurso não encontrado' } });
        expect(response.statusCode).toBe(404);
    });
});

describe('POST /carros ', () => {
    test('Deve inserir um carro nos dados e retornar o dado inserido', async () => {
        const data = { id: 5, modelo: 'Porsche' };
        const response = await request(app)
            .post('/carros', data)
            .send(data);
        expect(response.body).toEqual(data);
        expect(response.statusCode).toBe(201);
    });
    test('Deve retornar um erro quando o json está faltando dados', async () => {
        const data = { modelo: 'Ferrari' };
        const response = await request(app)
            .post('/carros', data)
            .send(data);
        expect(response.body).toEqual({ error: { message: 'Os dados enviados malformados ou faltando dados' } });
        expect(response.statusCode).toBe(400);
    });
    test('Deve avisar que o recurso já existe caso tente inserir com um id existente', async () => {
        const data = { id: 1, modelo: 'Ferrari' };
        const response = await request(app)
            .post('/carros', data)
            .send(data);
        expect(response.body).toEqual({ error: { message: 'Já existe um recurso com o id solicitado' } });
        expect(response.statusCode).toBe(409);
    });
});

describe('GET /animais ', () => {
    test('Deve retornar o array de animais', async () => {
        const response = await request(app).get('/animais');
        expect(response.body).toEqual(resultados.animais);
        expect(response.statusCode).toBe(200);
    });
    test('Se os recursos não foram modificados, deve retornar 304.', async () => {
        const firstRes = await request(app).get('/animais');
        const secondRes = await request(app).get('/animais').set('If-None-Match', firstRes.headers.etag.toString());
        expect(secondRes.statusCode).toBe(304);
    });
    test('Se os recurso foram modificados deve retornar o novo array (Status 200).', async () => {
      const firstRes = await request(app).get('/animais');
      const data = { id: 4, nome: 'Leão' };
      const response = await request(app)
          .post('/animais', data)
          .send(data);
      const secondRes = await request(app).get('/animais').set('If-None-Match', firstRes.headers.etag.toString());
      expect(secondRes.statusCode).toBe(200);
      expect(secondRes.body).toEqual(resultados.animais);
    });
});

describe('GET /animais/:id ', () => {
    const expectedUser = resultados.animais[0];
    test(`Deve retornar o animal com id ${expectedUser.id}`, async () => {
        const response = await request(app).get(`/animais/${expectedUser.id}`);
        expect(response.body).toEqual(expectedUser);
        expect(response.statusCode).toBe(200);
    });

    test('Deve retornar erro caso o recurso não seja encontrado', async () => {
        const unexpectedId = 42;
        const response = await request(app).get(`/animais/${unexpectedId}`);
        expect(response.body).toEqual({ error: { message: 'Recurso não encontrado' } });
        expect(response.statusCode).toBe(404);
    });
});

describe('POST /animais ', () => {
    test('Deve inserir um animal nos dados e retornar o dado inserido', async () => {
        const data = { id: 5, nome: 'Onça' };
        const response = await request(app)
            .post('/animais', data)
        .send(data);
        expect(response.body).toEqual(data);
        expect(response.statusCode).toBe(201);
    });
    test('Deve retornar um erro quando o json está faltando dados', async () => {
        const data = { nome: 'Leão' };
        const response = await request(app)
            .post('/animais', data)
            .send(data);
        expect(response.body).toEqual({ error: { message: 'Os dados enviados malformados ou faltando dados' } });
        expect(response.statusCode).toBe(400);
    });
    test('Deve avisar que o recurso já existe caso tente inserir com um id existente', async () => {
        const data = { id: 1, nome: 'Leão' };
        const response = await request(app)
            .post('/pessoas', data)
        .send(data);
        expect(response.body).toEqual({ error: { message: 'Já existe um recurso com o id solicitado' } });
        expect(response.statusCode).toBe(409);
    });
});
