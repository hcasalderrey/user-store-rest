import mongoose, { Schema }  from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    available: {
        type: Boolean,
        default: false,
    },
    price: {
        type:Number,
        default: 0

    },
    description: {
        type: String,
    },


     user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
     },
     category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
     }
});

productSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    }
})

export const ProductModel = mongoose.model('product', productSchema)
