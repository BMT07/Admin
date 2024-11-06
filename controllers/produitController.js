
const express = require('express')
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator')
const router = express.Router()
const multer = require('multer');
const fs = require('fs');
const path = require('path');



const Produit = require('../models/Produit')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


router.post('/addProduit', upload.single('photo'), async (req, res) => {
    try {
        const photoPath = req.file ? req.file.path : null;

        const produitData = {
            ...req.body,
            photo: photoPath,
        };

        const produit = new Produit(produitData);
        const savedProduit = await produit.save();
        res.status(201).json(savedProduit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/getAllProduit', async (req, res) => {
    try {
        const produits = await Produit.find().populate('fournisseur');
        res.status(200).json(produits);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/updateStatusProduit/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedProduct = await Produit.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get a single product by ID
router.get('/getOneProduit/:id', async (req, res) => {
    try {
        const produit = await Produit.findById(req.params.id).populate('fournisseur');
        if (!produit) return res.status(404).json({ message: 'Produit not found' });
        res.status(200).json(produit);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a product by ID
router.put('/updatrProduit/:id', async (req, res) => {
    try {
        const updatedProduit = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('fournisseur');
        if (!updatedProduit) return res.status(404).json({ message: 'Produit not found' });
        res.status(200).json(updatedProduit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a product by ID
router.delete('/deleteProduit/:id', async (req, res) => {
    try {
        const deletedProduit = await Produit.findByIdAndDelete(req.params.id);
        if (!deletedProduit) return res.status(404).json({ message: 'Produit not found' });
        res.status(200).json({ message: 'Produit deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
