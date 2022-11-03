const express = require('express')
const app = express()
const port = 3000


const {MongoClient} = require("mongodb")
const url = "mongodb+srv://davidmichaelwilson:wXRRbRVzvKRcspHw@dmwcluster0.vrpyb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(url)

// const ObjectId = require(“mongodb”).ObjectId

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// ***** Add your routes here *****

app.post("/update", (req, res) => {

  const searchBy = req.query.searchBy
  const searchValue = req.query.searchValue
  const updatedDoc = {} 
    
    if (req.body.firstName !== "") {
      updatedDoc["firstName"] = req.body.firstName
    }
    if (req.body.lastName !== "") {
          updatedDoc["lastName"] = req.body.lastName
        }
    if (req.body.email !== "") {
          updatedDoc["email"] = req.body.email
        }
    if (req.body.phone !== "") {
          updatedDoc["phone"] = req.body.phone
        }
  
  async function updateDoc() {
    try {
      await client.connect()
      const collection = client.db("test_db").collection("users")
  
      await collection.updateOne(
        {[searchBy]: searchValue}, { $set: updatedDoc})

      await client.close()
        res.sendStatus(200)
    
    } catch(err) {
        console.log(err)
        res.sendStatus(400)
    }
  }
  updateDoc()
})

app.delete("/delete", (req, res) => {
  const searchBy = req.query.searchBy
  const searchValue = req.query.searchValue

  async function deleteDoc() {
    try {
      await client.connect()
      const collection = client.db("test_db").collection("users")
  
      await collection.deleteOne(
        {[searchBy]: searchValue})

      await client.close()
        res.sendStatus(200)
    
    } catch(err) {
        console.log(err)
        res.sendStatus(400)
    }
  }
  deleteDoc()
})


app.listen(port)