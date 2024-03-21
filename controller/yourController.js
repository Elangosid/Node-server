const YourModel = require('../models/yourModel')
const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')
//uploadc

const uploadCSV = async (req, res) => {
  const { date, selectedOption } = req.body

  // Check if the file is included in the request
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'No files were uploaded.' })
  }

  const csvFile = req.files.file

  const csvData = []
  // Process the CSV file
  const fileName = `temp_${Date.now()}_${csvFile.name}`
  const filePath = path.join(__dirname, fileName)
  try {
    await csvFile.mv(filePath)
    // Assuming the CSV file has headers
    const stream = fs
      .createReadStream(filePath)
      .pipe(csv())
      .on('data', async (row) => {
        // Create a new product document in MongoDB for each row of the CSV data
        const product = new ProductModel({
          isrc: row.isrc,
          month: row.month,
          song_name: row.song_name,
          album_name: row.album_name,
          artist_name: row.artist_name,
          streams: row.streams,
          income: row.income,
          asset_title: row.asset_title,
          asset_labels: row.asset_labels,
          artist: row.artist,
          item_artist: row.item_artist,
          date: date,
          selectedOption: selectedOption,
          // Add more fields as needed
        })
        try {
          await product.save()
          csvData.push(row)
        } catch (error) {
          console.error('Error saving product to MongoDB:', error.message)
          // Handle the error as needed
        }
      })
      .on('end', async () => {
        // Cleanup: Remove the uploaded CSV file
        fs.unlinkSync(filePath)
        // Respond with the extracted CSV data
        res.status(StatusCodes.OK).json({ csvData })
      })
    // Wait for the stream to finish before sending the response
    await new Promise((resolve) => {
      stream.on('close', resolve)
    })
  } catch (error) {
    console.error('Error processing uploaded file:', error.message)
    throw new CustomError.InternalServerError(
      'Error processing the uploaded file'
    )
  }
}

// fetch data
const fetchYourModelData = async (req, res) => {
  try {
    const queryResult = await YourModel.find({}).exec()
    res.json(queryResult)
  } catch (error) {
    console.error('Error fetching YourModel data:', error)
    res
      .status(500)
      .json({ success: false, message: 'Error fetching YourModel data' })
  }
}

module.exports = {
  uploadCSV,
  fetchYourModelData,
}
