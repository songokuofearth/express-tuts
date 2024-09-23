const express = require('express');
const app = express();
const post = require('./routes/posts')
const logger = require('./middleware/logger')
const errorHandler = require('./middleware/error')
const path = require('path');

 app.use(express.static(path.join(__dirname,'public')))

app.use(express.json());

app.use(logger);

app.use('/api/posts',post)
app.use(errorHandler);

app.listen(8000)