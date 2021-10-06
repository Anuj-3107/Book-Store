import  mongoose  from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {type: String,required:true },
        publisher: {type: String,required:true },
        image: {type: String,required:true },
        price: {type: String, required: true },
        description: {type: String },
        pincode: {type: String,required:true },
        sellerName:{type:String ,required:true},
        phNumber:{type:String,required:true},
    },
    {
        timestamp:true,
    }
);

const Product = mongoose.model('Product',productSchema);
export default Product;