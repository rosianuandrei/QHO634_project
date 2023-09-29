const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3001;

const basePath = path.join(__dirname, './public')

app.use(express.static(basePath));

app.listen(port, () => {
    console.log(`App is running on port ${port}.`)
    console.log(`Acces it here: localhost:${port}`)
})