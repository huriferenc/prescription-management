import express from 'express';
import {
    createPrescription,
    deletePrescription,
    getAllPrescriptions,
    getPrescriptionById,
    updatePrescription,
} from '../controllers/prescriptionsController.js';

const router = express.Router();

router.get('/', getAllPrescriptions);
router.get('/:id', getPrescriptionById);
router.post('/', createPrescription);
router.put('/:id', updatePrescription);
router.delete('/:id', deletePrescription);

export default router;
