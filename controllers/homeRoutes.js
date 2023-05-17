const router = require("express").Router();
router.get('/', function (req, res){
    res.render("featuredRecipes")
})

module.exports = router;