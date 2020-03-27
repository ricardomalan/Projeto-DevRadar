const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server();

setupWebsocket(server);

mongoose.connect('mongodb+srv://ricardo:Meikai1@cluster0-ykbxd.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors()); //origin: 'http://localhost:3000'
app.use(express.json());
app.use(routes);

app.listen(3333);
server.listen(3334)

// Métodos HTTP: get, post, put, delete

// Tipos de parâmetros

// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)