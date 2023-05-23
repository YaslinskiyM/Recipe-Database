const {Recipe, Category, User,Recipe_steps} = require("../../models");
const router =  require("express").Router();


router.get("/", (req, res) => {
    Recipe.findAll({
        attributes: ["id", "recipe_name", "recipe_description", "comment", "keywords"],
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
                attributes: ["id", "step"],
                order: ["id", "ASC"]
            }

        ]
    })
    .then(dbRecipeData => res.json(dbRecipeData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

//get one recipe that matches the recipename and descirptio
// and return its id

router.get("/:recipe_name/:recipe_description", (req, res) => {
    Recipe.findOne({
        where: {
            recipe_name: req.params.recipe_name,
            recipe_description: req.params.recipe_description
        },
        attributes: ["id", "recipe_name", "recipe_description", "comment", "keywords"],
        include: [
            {
                model: Category,
                attributes: ["id", "category_name"]
            },
            {
                model: User,
                attributes: ["id",  "first_name", "last_name"]
            }, {
                model: Recipe_steps,
                attributes: ["id", "step"],
                order: ["id", "ASC"]
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

router.get("/:id", (req, res) => {
    Recipe.findOne({
        where: {
            id: req.params.id
        },
        attributes: ["id", "recipe_name", "recipe_description", "comment", "keywords"],
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
                attributes: ["id", "step"],
                order: ["id", "ASC"]
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
    console.log('req recipe in API endpoint',req.body, req.session.value)
    Recipe.create({
        ...req.body,
      user_id: req.session.value,
    })
    .then(dbRecipeData => {res.json(dbRecipeData),
    console.log(dbRecipeData)})
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