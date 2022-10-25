const express = require("express")
const app = express()
const cors = require("cors")

const dotenv = require("dotenv")
dotenv.config()


// import routes
// --imports go here

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))
app.use(express.json())

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