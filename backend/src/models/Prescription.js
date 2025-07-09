import mongoose from 'mongoose';

// 1st step: You need to create a schema
// 2nd step: You would create a model based off of that schema

const prescriptionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } // createdAt, updatedAt
);

const Prescription = mongoose.model('Prescription', prescriptionSchema);

export default Prescription;
