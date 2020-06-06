import express from 'express';

const app = express()

app.get('/users', (request, response) => {
    console.log('Olá mundo');

    response.json([
        'Daniel',
        'Cleiton',
        'Robson'
    ]);
});

app.listen(3333);