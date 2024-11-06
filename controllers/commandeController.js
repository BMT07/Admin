
    const express = require('express')
    const mongoose = require('mongoose');
    const { check, validationResult } = require('express-validator')
    const router = express.Router()
    const Commande = require('../models/Commande')



    router.post('/addOrder', async (req, res) => {
        try {
            const newOrder = new Commande(req.body);
            const savedOrder = await newOrder.save();
            res.status(201).json(savedOrder);
        } catch (err) {
            res.status(500).json({ error: 'Failed to create order', details: err });
        }
    });

    // Get all orders
    router.get('/getAllOrders', async (req, res) => {
        try {
            const orders = await Commande.find().populate('fournisseur').populate('produit').populate('user');
            res.status(200).json(orders);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch orders', details: err });
        }
    });

    // Get a single order by ID
    router.get('/getOneOrder/:id', async (req, res) => {
        try {
            const order = await Commande.findById(req.params.id).populate('fournisseur').populate('produit').populate('user');
            if (!order) return res.status(404).json({ error: 'Order not found' });
            res.status(200).json(order);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch order', details: err });
        }
    });

    // Update an order's status
    router.put('/updateOrderStatus/:id/status', async (req, res) => {
        try {
            const updatedOrder = await Commande.findByIdAndUpdate(
                req.params.id,
                { status: req.body.status },
                { new: true }
            );
            if (!updatedOrder) return res.status(404).json({ error: 'Order not found' });
            res.status(200).json(updatedOrder);
        } catch (err) {
            res.status(500).json({ error: 'Failed to update order', details: err });
        }
    });

    // Delete an order
    router.delete('/deleteOrder/:id', async (req, res) => {
        try {
            const deletedOrder = await Commande.findByIdAndDelete(req.params.id);
            if (!deletedOrder) return res.status(404).json({ error: 'Order not found' });
            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete order', details: err });
        }
    });
    module.exports = router