const express = require('express');

const app = express();
const port = 8000;

app.get('/', (_, res) => {
  res.send('Hello World');
});

app.get('/name', (_, res) => {
  const data = {
    name: 'Tyron',
    email: 'tyronjc23@gmail.com',
  };

  res.json(data);
});

app.listen(port, () => {
  console.log(`Server berjalan pada http://localhost:${port}`);
});
