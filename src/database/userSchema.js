import mongoose from "mongoose"

const logModel = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    userID: {
        type: String,
        require: true,
        unique: true
    },
    country: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },

    HashPassword: {
        type: String,
        require: true,
    },
});
export const Log = mongoose.models.userdatas || mongoose.model('userdatas', logModel);






const sensorlogModel = new mongoose.Schema({

    Humidity: {
        type: String,
    },
    Temperature: {
        type: String,
    },
    Ph: {
        type: String,
    },

    H2s: {
        type: String,
    },
    Ammonia: {
        type: String,
    },
    Methane: {
        type: String,
    },
    Co2: {
        type: String,
    },

    time: {
        type: String,
    },
    other
        : {
        type: String,
    },
});
export const Sensor = mongoose.models.sensorCollections || mongoose.model('sensorCollections', sensorlogModel);



const sensortestlogModel = new mongoose.Schema({

    Humidity: {
        type: String,
    },
    Temperature: {
        type: String,
    },
    Ph: {
        type: String,
    },

    H2s: {
        type: String,
    },
    Ammonia: {
        type: String,
    },
    Methane: {
        type: String,
    },
    Co2: {
        type: String,
    },

    time: {
        type: String,
    },
    other
        : {
        type: String,
    },
});
export const Sensortest = mongoose.models.sensorcollectiontests || mongoose.model('sensorcollectiontests', sensortestlogModel);
