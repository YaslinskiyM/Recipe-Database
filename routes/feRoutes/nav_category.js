//router get all categories
const router = require('express').Router();
const { Category } = require("../../models");
const withAuth = require('../../utils/auth');

router.get('/users/listCategory',withAuth,async (req, res) => {
    try {
        const categoryData = await Category.findAll();
        const categories = categoryData.map((category) => category.get({ plain: true }));
        res.render('listCategory', { categories });
    } catch (err) {
        res.status(500).json(err);
        
    }
})

module.exports = router;