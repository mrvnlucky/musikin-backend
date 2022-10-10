const express = require("express")
const app = express()
const cors = require("cors")
const { PORT, SERVER_URL, CLIENT_URL } = require('./constants')

// import routes
// --imports go here

app.use(cors({
  credentials: true,
  origin: CLIENT_URL
}))
app.use(express.json())

// initialize routes
// --routes go here

const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running at ${SERVER_URL}`);
    })
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}


appStart();