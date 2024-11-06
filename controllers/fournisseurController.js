
const express = require('express')
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator')
const router = express.Router()
const Fournisseur = require('../models/Fournisseur')

router.post('/addSupplier', async (req, res) => {
    try {
        const newFournisseur = new Fournisseur({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            adresse: req.body.adresse,
            phone: req.body.phone,
            naissance: req.body.naissance
        });

        await newFournisseur.save();

        res.status(201).json({ message: 'Supplier added successfully', fournisseur: newFournisseur });
    } catch (error) {
        res.status(500).json({ message: 'Error adding supplier', error: error.message });
    }
});


router.put('/changeStatus/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedSupplier = await Fournisseur.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedSupplier) return res.status(404).json({ message: 'Supplier not found' });
        res.status(200).json(updatedSupplier);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.put('/modifySupplier/:id', async (req, res) => {
    try {
        const updatedFournisseur = await Fournisseur.findByIdAndUpdate(
            req.params.id,
            {
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                adresse: req.body.adresse,
                phone: req.body.phone,
                naissance: req.body.naissance
            },
            { new: true }
        );

        if (!updatedFournisseur) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.status(200).json({ message: 'Supplier updated successfully', fournisseur: updatedFournisseur });
    } catch (error) {
        res.status(500).json({ message: 'Error updating supplier', error: error.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedFournisseur = await Fournisseur.findByIdAndDelete(req.params.id);

        if (!deletedFournisseur) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.status(200).json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting supplier', error: error.message });
    }
});

router.get('/allfournisseurs', async (req, res) => {
    try {
        const fournisseurs = await Fournisseur.find();
        res.status(200).json(fournisseurs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/oneFournisseur/:id', async (req, res) => {
    try {
        const fournisseur = await Fournisseur.findById(req.params.id);
        if (!fournisseur) return res.status(404).json({ message: 'Fournisseur not found' });
        res.status(200).json(fournisseur);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




module.exports = router;