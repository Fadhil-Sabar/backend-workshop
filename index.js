const express = require('express')
const app = express()
const routes = require('./routes')
const db = require('./database')
const cors = require('cors')

const port = 8000

app.use(express.json())
app.use(cors())

for (const idx in routes) {
    app.use('/api', routes[idx])
}

try {
    db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.listen(port, () => {
    console.log(`App Listening to ${port}`)
})