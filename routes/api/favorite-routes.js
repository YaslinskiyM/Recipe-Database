const router = require('express').Router();
const { User, Recipe, Category, Favorite } = require('../../models');


router.get('/', (req, res) => {
    Favorite.findAll({
        attributes: ['id', 'recipe_id', 'user_id'],
        include: [
            {
                model: User,
                attributes: ['id', 'first_name', 'last_name']
            },
            {
                model: Recipe,
                attributes: ['id', 'recipe_name', 'recipe_description', 'recipe_steps', 'comment', 'keywords'],
                include: {
                    model: Category,
                    attributes: ['id', 'category_name']
                }
            }
        ]
    })
    .then(dbFavoriteData => res.json(dbFavoriteData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}
);

router.get('/:id', (req, res) => {
    Favorite.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'recipe_id', 'user_id'],
        include: [
            {
                model: User,
                attributes: ['id', 'first_name', 'last_name']
            },
            {
                model: Recipe,
                attributes: ['id', 'recipe_name', 'recipe_description', 'recipe_steps', 'comment', 'keywords'],
                include: {
                    model: Category,
                    attributes: ['id', 'category_name']
                }
            }
        ]
    })
    .then(dbFavoriteData => {
        if (!dbFavoriteData) {
            res.status(404).json({ message: 'No favorite found with this id' });
            return;
        }
        res.json(dbFavoriteData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}
);

router.post('/', (req, res) => {
    Favorite.create({
        recipe_id: req.body.recipe_id,
        user_id: req.body.user_id
    })
    .then(dbFavoriteData => res.json(dbFavoriteData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}
);

router.put('/:id', (req, res) => {
    Favorite.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbFavoriteData => {
        if (!dbFavoriteData) {
            res.status(404).json({ message: 'No favorite found with this id' });
            return;
        }
        res.json(dbFavoriteData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}
);

router.delete("/", (req, res) => {
	console.log(req.session.value);
	Favorite.destroy({
		where: {
			recipe_user_id: req.session.value,
			recipe_id: req.body.id,
		},
	})
		.then((dbSavedData) => {
			if (!dbSavedData) {
				res.status(404).json({
					message: "No saved recipe found with this id",
				});
				return;
			}
			res.json(dbSavedData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
