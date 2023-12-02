const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require("cors")
require("dotenv").config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const { query } = require('express');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hey dev! How are you?')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xazyemr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const projectDetails = client.db("portfolio").collection("projectsCollection")
        const dataCollection = client.db("portfolio").collection("AllData")
        // ..projects_collections..
        app.get('/projects', async (req, res) => {
            const query = {}
            const allProjects = await projectDetails.find(query).toArray()

            res.send(allProjects)
        })
        app.get('/allData', async (req, res) => {
            const query = {}
            const allData = await dataCollection.find(query).toArray()
            res.send(allData)
        })

    }
    finally {

    }
}
run().catch(console.log)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})