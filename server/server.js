const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Deployment (Has to be after app.use(routes))
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send("API is running...")
  })
}

db.once('open', () => {
  const clientbuildpath = path.resolve('client', 'build', 'index.html')
  app.listen(PORT, () => {
    console.log(`API server for mocart running on port ${PORT}! with path ${clientbuildpath}`);
  });
});
