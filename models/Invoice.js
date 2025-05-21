import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        unique: true
    },
    shopName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    shopAddress: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: Number,
        required: false
    },
    materialCost: {
        type: Number,
        required: false
    },
    labourCost: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    items: [
        {
            itemName: {
                type: String,
                required: false
            },
            quantity: {
                type: Number,
                required: false
            },
            price: {
                type: Number,
                required: false
            }
        }
    ],
    tax: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true
    },
    due: {
        type: Number,
        default: 0
    },
})

const invoice = mongoose.model("Invoice", invoiceSchema);

export default invoice;