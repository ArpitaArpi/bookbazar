import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    coverImageUrl: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0, 
    },
    sales: {
        type: Number,
        default: 0, 
    },
    trending: {
        type: Boolean,
        default: false,
    },
    specialOffer: {
        type: Boolean,
        default: false, 
    },
    reviewCount: {
        type: Number,
        default: 0, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
