import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import placesDAO from "./dao/placesDAO.js"
import reviewsDAO from "./dao/reviewsDAO.js"
dotenv.config()
//require('dotenv').config();
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 5000
const url = process.env.TOURREVIEWS_DB_URI || 'mongodb+srv://user-123:user-123@mini-mern-tut.9ap4n.mongodb.net/historical_places?retryWrites=true&w=majority'

MongoClient.connect(
     url,
    {
      poolSize: 50,
      wtimeout: 2500,
      useNewUrlParse: true }
    )
    .catch(err => {
      console.error(err.stack)
      process.exit(1)
    })
    .then(async client => {
       await placesDAO.injectDB(client)
       await reviewsDAO.injectDB(client)
      app.listen(port, () => {
        console.log(`listening on port ${port}`)
      })
    })