const {Recipe, Category, User,Recipe_steps} = require("../../models");
const router =  require("express").Router();


router.get("/", (req, res) => {
    Recipe.findAll({
        attributes: ["id", "recipe_name", "recipe_description", "recipe_steps", "comment", "keywords"],
        include: [
            {
                model: Category,
                attributes: ["id", "category_name"]
            },
            {
                model: User,
                attributes: ["id",  "first_name", "last_name"]
            },
            {
                model: Recipe_steps,
                attributes: ["id", "step"]
            }

        ]
    })
    .then(dbRecipeData => res.json(dbRecipeData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.get("/:id", (req, res) => {
    Recipe.findOne({
        where: {
            id: req.params.id
        },
        attributes: ["id", "recipe_name", "recipe_description", "recipe_steps", "comment", "keywords"],
        include: [
            {
                model: Category,
                attributes: ["id", "category_name"]
            },
            {
                model: User,
                attributes: ["id",  "first_name", "last_name"]
            },{
                model: Recipe_steps,
                attributes: ["id", "step"]
            }
        ]
    })
    .then(dbRecipeData => {
        if(!dbRecipeData) {
            res.status(404).json({message: "No recipe found with this id"});
            return;
        }
        res.json(dbRecipeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.post("/", (req, res) => {
    Recipe.create(req.body)
    .then(dbRecipeData => res.json(dbRecipeData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.put("/:id", (req, res) => {
    Recipe.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbRecipeData => {
        if(!dbRecipeData) {
            res.status(404).json({message: "No recipe found with this id"});
            return;
        }
        res.json(dbRecipeData);})
        
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.delete("/:id", (req, res) => {
    Recipe.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbRecipeData => {
        if(!dbRecipeData) {
            res.status(404).json({message: "No recipe found with this id"});
            return;
        }
        res.json(dbRecipeData);})
    })
module.exports = router;