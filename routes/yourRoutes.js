const express = require('express')
const multer = require('multer')
const {
  fetchYourModelData,
  uploadCSV,
  submitForm,
} = require('../controller/yourController')

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ dest: 'uploads/' })

router.get('/fetch-your-model-data', fetchYourModelData)

router.post('/upload', upload.single('file'), uploadCSV)

module.exports = router
