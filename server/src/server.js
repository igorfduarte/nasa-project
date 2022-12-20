const http = require('http')
const app = require("./app") 
const mongoose = require('mongoose')

const {loadPlanetsData} = require('./models/planets.model')
const { loadLaunchData } = require('./models/launches.model');

const server = http.createServer(app)
const PORT = process.env.PORT || 8000

const MONGO_URL = 'mongodb+srv://asa-api:3426827@nasacluster.takcsti.mongodb.net/nasa?retryWrites=true&w=majority'

mongoose.connection.once('open',()=>{
    console.log('mongoDB connected')
})
mongoose.connection.on('error',(err)=>{
    console.error(err)
})

async function startServer(){
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData()
    await loadLaunchData();
}

server.listen(PORT,() =>{
    console.log('listening on port: ' + PORT)
})

startServer()