
import mongoose from "mongoose";

async function connectToDb() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Authnetication');
}

connectToDb()
    .then(() => {console.log("Database Connected Successfully")})
    .catch((err) => {console.log(err)});

export {connectToDb};