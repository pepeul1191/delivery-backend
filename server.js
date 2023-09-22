const express = require('express');
const http = require('http');
const logger = require('morgan');
const cors = require('cors');
 
const userRoutes = require('./routes/user_routes');
const app = express();
app.use(logger());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.disable('x-powered-by');
const server = http.createServer(app);

const port = process.env.PORT || 3000;
app.set('port', port);
// routes
userRoutes(app);
server.listen(port, '0.0.0.0', () => {
  console.log(`Aplicación NodeJS ${process.pid} Iniciada`)
});

app.get('/', (req, res) => {
  res.send('Ruta raíz del backend');
});

app.get('/test', (req, res) => {
  res.send('Esta es  la ruta TEST');
});

// error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});