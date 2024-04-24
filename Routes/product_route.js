const express=require('express')
const router= express.Router()

const ProductController=require('../Controller/product_controller')



//Fetch All Product 

router.get('/', ProductController.getAllProduct);

//Insert New Product 
router.post('/',ProductController.insertProduct)

router.get('/:id',ProductController.findProductById)

//updating route

router.patch('/:id',ProductController.updateProductById)


//for deleting route 

router.delete('/:id',ProductController.deleteProductById)
module.exports=router;