const router = require('express').Router();
const { User, Recipe } = require("../../models");
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    console.log('cming here0')
    res.render('login', {
      });


});

router.get("/users/home", withAuth, async (req, res) => {

  console.log('cming users/home',req.body)
	try {
		/*
    using req.session.id to grab the user id from the session
    then using that id to find the user in the database
    */
   console.log('req.session.id',req.session.value)
		const data = await User.findByPk(req.session.value, {
			attributes: { exclude: ["password"] },

		});
    // Serialize data so the template can read it
    const user = data.get({ plain: true }); 

    const recipeData = await Recipe.findAll({
      where: {
        user_id: req.session.value
      }
    })
 // Serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    console.log(user)
    console.log('recipeData',recipes)
		// Retrieve the user ID from the URL parameters

		//const recipe = req.query.recipe;
		// console.log('recipes in Route',req.query.recipe)
		// Render the user-specific home page and pass the user data to the template
		res.render("homepage", { user,recipes, logged_in: req.session.logged_in});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

router.get("/users/addRecipe", withAuth, async (req,res)=>{
  console.log('cming for add recipe route')
  res.render('addRecipe')
})

router.get('/login', async (req, res) => {
     res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

module.exports = router;