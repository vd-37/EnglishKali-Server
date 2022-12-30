import mongoose from 'mongoose'

const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@ac-vdn7pbp-shard-00-00.cw3ynu8.mongodb.net:27017,ac-vdn7pbp-shard-00-01.cw3ynu8.mongodb.net:27017,ac-vdn7pbp-shard-00-02.cw3ynu8.mongodb.net:27017/?ssl=true&replicaSet=atlas-k188v8-shard-0&authSource=admin&retryWrites=true&w=majority`;
    mongoose.set('strictQuery', false);
    try{
        await mongoose.connect(URL, {useNewUrlParser: true});
        console.log("Database connected succesfully");
    }catch(error){
        console.log("Error while connection", error);
    }
}
    
export default Connection;