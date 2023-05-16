import express from 'express';
import morgan from 'morgan';
import cartRoutes from './routes/cart.js'

const app = express();

const server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
})

app.get('/', (req, res) => {
  res.send('Hello Worl3')
})

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/cart', cartRoutes)

app.get('/hello', (req, res) => {
  res.send('world')
})
