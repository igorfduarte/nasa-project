const launchesDB = require('./launches.mongo')
const planets = require('./planets.mongo')
const launches = new Map()

const DEFAULT_FLIGHT_NUMBER = 100 


const launch ={
    flightNumber: 100,
    mission: "kepler exploration x",
    rocket: "explorer ship",
    launchDate: new Date('December 27,2030'),
    target: "kepler-442 b",
    costumers: ['420fps','nasa'],
    upcoming: true,
    success: true,
}

if(!planets.find({}, { array: { $slice: 1 } }).flightNumber == 100 || !planets.find({}, { array: { $slice: -1 } }).flightNumber == 100)
saveLaunch(launch)


async function existsLaunchWithId(launchId){
    return await launchesDB.findOne({         
        flightNumber: launchId, 
    })
}

async function getLatestFlightNumber(){
    const latestLaunch = await launchesDB.findOne()
    .sort('-flightNumber')

    if(!latestLaunch) return DEFAULT_FLIGHT_NUMBER
    
    return latestLaunch.flightNumber
}


// para nao aparecer o id e a versao, usar: launchesDB.find({},{'_id': 0,'__v':0})
async function getAllLaunches(){
    return await launchesDB.find({},{'_id': 0,'__v':0})
}

async function saveLaunch(launch){
    const planet = await planets.findOne({
        keplerName: launch.target
    })
    if(!planet)
        console.log('sem planeta')

    await launchesDB.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch,{
        upsert: true
    })
}

async function createNewLaunch(launch){
    const newFlightNumber = await getLatestFlightNumber() +1
    const newLaunch = Object.assign(launch,{
        success: true,
        upcoming: true,
        costumers: ['420fps','nasa'],
        flightNumber: newFlightNumber
    })

    await saveLaunch(newLaunch)
}



async function abortLaunchById(launchId){
    const aborted = await launchesDB.updateOne({
        flightNumber: launchId,
    },{
        upcoming: false,
        success: false
    })
    return aborted.ok === 1 && aborted.nModified ===1;
}


module.exports = {
    launches,
    getAllLaunches,
    existsLaunchWithId,
    abortLaunchById,
    createNewLaunch
}