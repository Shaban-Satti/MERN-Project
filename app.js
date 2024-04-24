//Use Express

const express=require('express')
const mongoose=require('mongoose')
const createError=require('http-errors')
const app = express()

//mongodb+srv://<username>:<password>@cluster0.gd94kzs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//WsugIfv9aFSOOkVT
app.use(express.json());
app.use(express.urlencoded({extended:true}));
mongoose.connect('mongodb+srv://cluster0.gd94kzs.mongodb.net/',{
  dbName:'ShabanTest',
  user:'shaban',
  pass:'WsugIfv9aFSOOkVT'  
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

app.all('/test',(req,res)=>{

    //for query........................
    // console.log(req.query);
    // console.log(req.query.name);
    // res.send(req.query);

    ///for params.......................
    // console.log(req.params);
    //res.send(req.params)
console.log(req.body);
res.send(req.body)

})

const ProductRoute=require('./Routes/product_route')
app.use('/products',ProductRoute)

app.use((req,res,next)=>{
    // res.status(404)
    // res.send({
    //       error:'Not found'
    // })
    ///////////////////////////////////////////////
    // const err=new Error("Not found")
    // err.status=404
    // next(err)
    next(createError(404,"Not found"));
});

//Error Handler
app.use((err,req,res,next)=>{
res.status(err.status || 500)
res.send({
    error:{
        status:err.status || 500,
        message:err.message
    }
})

})
app.listen(3000,()=>{
    console.log('sever started on port 3000')
})














//////////////////////////////////////////////////////////////////////////
// const http = require('http')

// const server=http.createServer((req,res)=>{
//     if(req.url=='/'){
//         if(req.method==='GET'){
//             console.log('its a get method')
//         }
//         res.write('Hy Shaban')
//         res.end()
//     }
//     else if(
//         req.url==='/another'
//     )
//     {
//         res.write('Hy Shaban this is another')
//         res.end()
//     }
// })

// server.listen(3000,()=>{
//     console.log('server started at port 3000')
// })

