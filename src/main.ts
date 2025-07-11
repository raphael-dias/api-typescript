const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req: any, res: { send: (arg0: string) => void }) => {
  res.send('Hello!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
