const sequelize = require("sequelize");
const { Category, Recipe, User } = require("../../models");
const router = require("express").Router();

router.get("/categories", (req, res) => {
	Category.findAll({
		attributes: ["id", "category_name"],
		include: [
			{
				model: Recipe,
				attributes: [
					"id",
					"recipe_name",
					"recipe_description",
					"recipe_steps",
					"comment",
					"keywords",
					"category_id",
				],
				include: {
					model: User,
					attributes: [
						sequelize.fn(
							"CONCAT",
							sequelize.col("first_name"),
							" ",
							sequelize.col("last_name")
						),
					],
				},
			},
		],
	});
});




router.get("/categories/:id", (req, res) => {
    Category.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ["id", "category_name"],
        include: [
			{
				model: Recipe,
				attributes: [
					"id",
					"recipe_name",
					"recipe_description",
					"recipe_steps",
					"comment",
					"keywords",
					"category_id",
				],
				include: {
					model: User,
					attributes: [
						sequelize.fn(
							"CONCAT",
							sequelize.col("first_name"),
							" ",
							sequelize.col("last_name")
						),
					],
				},
			}
            .then((dbCategoryData) => {
                if (!dbCategoryData) {
                    res.status(404).json({ message: "No category found with this id" });
                    return;
                } else {
                    res.json(dbCategoryData);
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            }),

		],
    })
})

router.post("/categories", (req, res) => {
    Category.create({
        category_name: req.body.category_name,
    })
        .then((dbCategoryData) => res.json(dbCategoryData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put("/categories/:id", (req, res) => {
    Category.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((dbCategoryData) => {
            if (!dbCategoryData) {
                res.status(404).json({ message: "No category found with this id" });
                return;
            } else {
                res.json(dbCategoryData);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
}
);

router.delete("/categories/:id", (req, res) => {
    Category.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbCategoryData) => {
            if (!dbCategoryData) {
                res.status(404).json({ message: "No category found with this id" });
                return;
            } else {
                res.json(dbCategoryData);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
}
);

module.exports = router;
