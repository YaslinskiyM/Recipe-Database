const router = require("express").Router();
const sequelize = require("../../config/connection");
const {
	User,
	Recipe,
	Category,
	Recipe_steps,
	Saved,
	Favorite,
} = require("../../models");
const { increment } = require("../../models/categorys");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
	console.log("cming here0");
	res.render("login", {});
});

router.get("/users/profile",withAuth, async (req, res) => {
	try {
    const data = await User.findByPk(req.session.value);
		// Serialize data 
		const user = data.get({ plain: true });
    req.session.password = user.password;
		res.render("userProfile", { user });
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/users/home", withAuth, async (req, res) => {
	console.log("cming users/home", req.body);
	try {
		/*
    using req.session.id to grab the user id from the session
    then using that id to find the user in the database
    */
		const data = await User.findByPk(req.session.value, {
			attributes: { exclude: ["password"] },
		});
		// Serialize data so the template can read it
		const user = data.get({ plain: true });

		const recipeData = await Recipe.findAll({
			where: {
				user_id: req.session.value,
			},
		});
		// Serialize data so the template can read it
		const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
		console.log(user);
		console.log("recipeData", recipes);
		// Retrieve the user ID from the URL parameters

		//const recipe = req.query.recipe;
		// console.log('recipes in Route',req.query.recipe)
		// Render the user-specific home page and pass the user data to the template
		res.render("homepage", {
			user,
			recipes,
			logged_in: req.session.logged_in,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

router.get("/users/addRecipe", withAuth, async (req, res) => {
	console.log("cming for add recipe route");
	res.render("addRecipe");
});

router.get("/login", async (req, res) => {
	res.render("login");
});

router.get("/signup", async (req, res) => {
	res.render("signup");
});

router.get("/users/listCategory",withAuth, async (req, res) => {
	try {
		const categoryData = await Category.findAll();
		const category = categoryData.map((category) =>
			category.get({ plain: true })
		);
		// category.push({ id: 0, category_name: "All" });
		const categories = [{ id: 0, category_name: "All" }, ...category]
		console.log(categories);
	

		res.render("category", { categories });
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/users/listCategory/:id", withAuth, async (req, res) => {
	try {
		
			

			let recipeData = await Recipe.findAll({
				where: {
					category_id: req.params.id,
				},
			});
			let recipes = recipeData.map((recipe) =>
				recipe.get({ plain: true })
			);
			console.log(recipes, 'test');

			if (recipes.length === 0 && req.params.id <= 0) {
				console.log('idnull');
			 	recipeData = await Recipe.findAll();
				 recipes = recipeData.map((recipe) =>
					recipe.get({ plain: true })
				);
				console.log(recipes);
				
			}

			res.render("recipes", { recipes });

			
			
			
			// res.render("recipes", { recipes });
		

		
	} catch (err) {
		res.status(500).json(err);
		console.log(err);

	}
});

router.get("/users/listCategory/getRecipe/:id", withAuth, async (req, res) => {
	try {
		const recipeData = await Recipe.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ["id", "first_name", "last_name"],
				},
				{
					model: Category,
					attributes: ["id", "category_name"],
				},
				{
					model: Recipe_steps,
					attributes: ["id", "step"],
					order: ["id", "ASC"],
				},
			],
		});

		//find the if the user have saved or favorite the recipe

		const recipe = recipeData.get({ plain: true });
		//console.log(recipe, "recipe");
		// check if user have saved or favorite the recipe
		const savedData = await Saved.findOne({
			where: {
				recipe_id: req.params.id,
				recipe_user_id: req.session.value,
			},
		});
		const favoriteData = await Favorite.findOne({
			where: {
				recipe_id: req.params.id,
				recipe_user_id: req.session.value,
			},
		});
		//console.log(savedData, "savedData");
		//console.log(favoriteData, "favoriteData");
		if (savedData) {
			recipe.saved = true;
		} else {
			recipe.saved = false;
		}
		if (favoriteData) {
			recipe.favorite = true;
		} else {
			recipe.favorite = false;
		}
		console.log(recipe, "recipe");

		res.render("thisrecipe", recipe);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/users/saveFavorite", withAuth, async (req, res) => {
	try {
		const recipeData = await Saved.findAll({
			where: {
				recipe_user_id: req.session.value,
			},
			include: {
				model: Recipe,
			},
		});
		const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
		//console.log(recipes);
		//combine the recipes into a single array
		//console.log(recipes[0].saveds)
		const savedRecipe = recipes.map((recipe) => recipe.recipe);
		console.log(savedRecipe);

		//======================================================================================================
		const favData = await Favorite.findAll({
			where: {
				recipe_user_id: req.session.value,
			},
			include: {
				model: Recipe,
			},
		});

		const fav = favData.map((recipe) => recipe.get({ plain: true }));
		//console.log(recipes);
		//combine the recipes into a single array
		//console.log(recipes[0].saveds)
		const favRecipe = fav.map((recipe) => recipe.recipe);
		console.log(favRecipe);
		res.render("save_fav", { savedRecipe, favRecipe });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get("/users/saveFavorite/:id", withAuth, async (req, res) => {
	try {
		const recipeData = await Recipe.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ["id", "first_name", "last_name"],
				},
				{
					model: Category,
					attributes: ["id", "category_name"],
				},
				{
					model: Recipe_steps,
					attributes: ["id", "step"],
					order: ["id", "ASC"],
				},
			],
		});
		const recipe = recipeData.get({ plain: true });
		console.log(recipe, "recipe");
		res.render("savedRecipeDetail", recipe);
	} catch (err) {
		res.status(500).json(err);
	}
});




module.exports = router;
