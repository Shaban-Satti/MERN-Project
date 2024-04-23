const express=require('express')
const router= express.Router()
const createError=require('http-errors')



const Product=require('../Models/Product_Model')
const { default: mongoose } = require('mongoose')


router.get('/', async (req,res,next)=>{
   //next(new Error("cannot get lits"))
    try{
  //for query thing ....

     const result=await Product.find({},{__v:0})
    // const result=await Product.find({},{name:1,_id:0})
   
    //const result=await Product.find({price:200000},{name:1,_id:0})
    res.send(result)
    }
    catch(error){
        console.log(error.message)

    }
})
router.post('/',async (req,res,next)=>{
    try{

        const product=new Product(req.body)
        const result=await product.save();
        res.send(result);
    }
    catch(error){
        console.log(error.message)
        if(error.name==='ValidationError')
        {
            next(createError(422,error.message))
            return
        }
        next(error)

    }

    //2nd method
    // console.log(req.body)
    // const product=new Product({
    //     name:req.body.name,
    //     price:req.body.price
    // })
    // product.save().then(result=>{
    //     console.log(result);
    //     res.send(result)
    // }).catch(err=>{
    //     console.log(err.message);
    // })
})

router.get('/:id',async(req,res,next)=>{

   // res.send('Getting a single Product')
   const id=req.params.id;
   console.log(id)

    try{
        //best method
 const product=await Product.findById(id)
//another method
//const product=await Product.findOne({_id:id})
if(!product)
{
  throw createError(404,'Product does not exist')
}
res.send(product);
    }
    catch(error)
{
    console.log(error.message)
    if(error instanceof mongoose.CastError){
next(createError(400,'Invalid Product id'))
return;
    }
    next(error)
}

})

//updating route

router.patch('/:id',async(req,res,next)=>{
    const id=req.params.id;
    const update=req.body;
    const option={new:true}
    try{
        const result=await Product.findByIdAndUpdate(
            id,update,option
        )

        if(!result)
{
  throw createError(404,'Product does not exist')
}
        res.send(result);
    }
    catch(error)
    {
        console.log(error.message)
      
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid Product id'))
            return;
                }
                next(error)

        
    }
    
})


//for deleting route 

router.delete('/:id',async(req,res,next)=>{
    // res.send('deleting a single product')
    const id=req.params.id;
    try{
    const result=await Product.findByIdAndDelete(id)
    if(!product)
    {
        throw createError(404,'Product does not exist')
    }
    res.send(result);  
        }
        catch(error)
    {
        console.log(error.message)
        if(error instanceof mongoose.CastError){
    next(createError(400,'Invalid Product id'))
    return;
        }
        next(error)
    }
})
module.exports=router;