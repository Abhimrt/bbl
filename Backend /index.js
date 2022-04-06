const express = require('express');
const cors =require('cors')
const connect = require('./db')
connect();
const app = express()
const port = 5001
app.use(cors())
app.use(express.json())
// Available Routes
app.use('/api/user',require('./routes/user'))
app.use('/api/admin',require('./routes/admin'))
app.use('/api/driver',require('./routes/driver'))
app.use('/api/requests',require('./routes/requests'))
app.listen(port,()=>{
    console.log(`We are listening at the localhost:${port}`);
})