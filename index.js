const express = require("express")
const app = express()
const cors = require("cors")
const db = require('./models')

const dotenv = require("dotenv")
const router = require("./routes/index")
dotenv.config()

app.use(cors({
  origin: ['http://localhost:3000', 'https://musikin-id.netlify.app/'],
  credentials: true
}))
app.use(express.json())
// app.use(express.urlencoded())

// db.sequelize.sync()
//   .then(() => {
//     console.log('Synced db.');
//   })
//   .catch((error) => {
//     console.log('Failed to sync db: ' + error.message);
//   })
app.use('/', router)

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