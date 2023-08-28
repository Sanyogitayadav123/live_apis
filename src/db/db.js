import mongoose from 'mongoose'

const connectionDB= async()=>{
try{
    await mongoose.connect(process.env.DB_URL)
    console.log("Data Base connection in succes full")}
catch(err){
    console.log('err', err)
}
}

export default connectionDB


// import mongoose from "mongoose";


// const connectionDB = () => {
//   mongoose.set("strictQuery", true);
//   mongoose
//     .connect(process.env.DB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then((db) => console.log("DB is connected"))
//     .catch((err) => console.log(err));
// };

// export default connectionDB;
