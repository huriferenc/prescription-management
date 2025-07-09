import Prescription from '../models/Prescription.js';

export async function getAllPrescriptions(req, res) {
    try {
        const prescriptions = await Prescription.find().sort({ createdAt: -1 });
        res.status(200).json(prescriptions);
    } catch (error) {
        console.error('Error in getting prescriptions', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getPrescriptionById(req, res) {
    try {
        const prescription = await Prescription.findById(req.params.id);

        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        res.status(200).json(prescription);
    } catch (error) {
        console.error('Error in getting prescription', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function createPrescription(req, res) {
    try {
        const { title, content } = req.body;
        const newPrescription = new Prescription({ title, content });

        await newPrescription.save();
        res.status(201).json({ message: 'Prescription created successfully!' });
    } catch (error) {
        console.error('Error in creating prescription', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function updatePrescription(req, res) {
    try {
        const { title, content } = req.body;

        const updatedPrescription = await Prescription.findByIdAndUpdate(
            req.params.id,
            { title, content },
            {
                new: true, // return the updated prescription after applying changes
            }
        );

        if (!updatedPrescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        res.status(201).json({ message: 'Prescription updated successfully!' });
    } catch (error) {
        console.error('Error in updating prescription', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function deletePrescription(req, res) {
    try {
        const deletedPrescription = await Prescription.findByIdAndDelete(req.params.id);

        if (!deletedPrescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        res.status(200).json({ message: 'Prescription deleted successfully!' });
    } catch (error) {
        console.error('Error in deleting prescription', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
