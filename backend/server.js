import express from 'express';
import  Mongoose  from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productsRouter.js';
import userRouter from './routers/userRouter.js';
import path from 'path';
import multer from 'multer';
import expressAsyncHandler from 'express-async-handler';
import Product from './models/productModel.js';


const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://BOOKS-ORGANISATION:Books@123@cluster0.y7zz6.mongodb.net/Books?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

var storage =multer.diskStorage({
  destination:function (req,file,cb){
    cb(null,'frontend/public')
  },
  filename:(req,file,cb)=>{

        cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
    }
});
const upload =multer({
  storage:storage
});
app.post('/api/products/uploadProducts',upload.single('image'),expressAsyncHandler(async(req,res)=>{
  try{
    const createProducts=new Product({
      name:req.body.name,
      publisher:req.body.publisher,
      image:`/${req.file.filename}`,
      price:req.body.price,
      description:req.body.description,
      sellerName:req.body.sellerName,
      sellerEmail:req.body.sellerEmail,
      phNumber:req.body.phNumber,
      pincode:req.body.pinCode,
    });
    const uploadProduct = await createProducts.save();
    res.status(200).send({message: 'Product Uploaded.', product: uploadProduct});
  }
  catch(error){
    res.status(404).send({message:'Product Upload Failed.'});
  }
}));
app.use('/api/users', userRouter);
app.use('/api/products',productRouter);
app.get('/', (req, res) => {
  res.send('Server is ready');
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});