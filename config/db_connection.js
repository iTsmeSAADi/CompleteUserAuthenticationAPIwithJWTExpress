import mongoose from "mongoose";

const db_connection = async (DB_URL) => {
    
    const DB_OPTIONS = {
        dbName: 'userDb'
    }

    try {
        await mongoose.connect(DB_URL, DB_OPTIONS)
        console.log("SUCCESS: CONNECED TO DATABASE SUCCESSFULLY")
    } catch (error) {
        console.log("ERROR CONNECTING TO DATABASE", error)
    }

}

export default db_connection