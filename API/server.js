
const express = require('express')
const app = express()
const port = 8080
const results = require('./api/routes/sendResults')
const sendEmail = require('./api/routes/sendEmail')
var cors = require('cors');

app.use(cors());
app.use('/sendResults', results)
app.use('/sendemail', sendEmail)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})