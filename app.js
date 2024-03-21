const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const yourRoutes = require('./routes/yourRoutes')
const fileUpload = require('express-fileupload')
// const Datalist = require("./Data")
const app = express()

app.use(express.json())
app.use(cors())
app.use(fileUpload())
app.get('/', yourRoutes, (req, res) => {
  res.send('Hello NODE API')
})

// app.get('/data', (req, res) => {
//   res.json({ Datalist })
// })

const PORT = process.env.PORT || 5000

mongoose
  .connect(
    'mongodb+srv://sidhususila:1234@cluster0.5an4owd.mongodb.net/user_data?retryWrites=true&w=majority',
    {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connected to db')
  })
  .catch((err) => {
    console.log(err.message)
  })

app.use('/api/v1', yourRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
