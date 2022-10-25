const express = require("express")
const app = express()
const cors = require("cors")
const db = require('./src/models')

const dotenv = require("dotenv")
dotenv.config()


// import routes
// --imports go here

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))
app.use(express.json())

db.sequelize.sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((error) => {
    console.log('Failed to sync db: ' + error.message);
  })

// initialize routes
// --routes go here

const appStart = () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log('Server running at', process.env.SERVER_URL);
    })
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}


appStart();