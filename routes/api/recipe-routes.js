const {Recipe, Category, User} = require("../../models");
const router =  require("express").Router();


router.get("/recipe", (req, res) => {
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
            }
        ]
    })
    .then(dbRecipeData => res.json(dbRecipeData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.get("/recipe/:id", (req, res) => {
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

router.post("/recipe", (req, res) => {
    Recipe.create(req.body)
    .then(dbRecipeData => res.json(dbRecipeData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.put("/recipe/:id", (req, res) => {
    Recipe.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbRecipeData => {
        /*
        check if any rows were updated
        if no rows were updated, then the ID must not exist, so 404
        then try to match the data provided in the req.body to the model
        then update the different fields with the new info
        also check if the category name have been change
        if so, then we need to get the new category name or send a 404
        also check the valid entry of the fields within the data
        */
        if(!dbRecipeData) {
            res.status(404).json({message: "No recipe found with this id"});
            return;
        } else {
            Recipe.findOne({
                where: {
                    id: req.params.id
                },
                attributes: ["id", "recipe_name", "recipe_description", "recipe_steps", "comment", "keywords", "category_id"],
                include: [
                    {
                        model: Category,
                        attributes: ["id", "category_name"]
                    }
                ]
            })
            .then(dbRecipeData => {
                if(dbRecipeData.tags[0].category_name === req.body.category_name) {
                    res.json(dbRecipeData);
                } else {
                    res.status(404).json({message: "No category found with this category_name"});
                }
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

