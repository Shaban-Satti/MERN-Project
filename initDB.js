const mongoose=require('mongoose')


module.exports=()=>{
    mongoose.connect(process.env.MONGODB_URI,{
  dbName:process.env.DB_NAME,
  user:process.env.DB_USER,
  pass:process.env.DB_PASS  
}).then(()=>{

    console.log("mongoose db commected.....")
}
).catch(err=>console.log(err.message));

mongoose.connection.on('connected',()=>{
    console.log('Mongoose connected to db...')
})


mongoose.connection.on('error',(err)=>{
    console.log(err.message)
})

mongoose.connection.on('disconnected',()=>{
    console.log('Mongoose Disconnected to db...')
})

process.on('SIGINT',()=>{
    mongoose.connection.close(()=>{
        console.log('Mongoose  connection is Disconnected due to app termination...')
    })
    process.exit(0);
})
// mongoose.connect('mongodb://localhost:27017/ShabanDB').then(()=>{

//     console.log("mongoose db commected.....")
// }
// );

}