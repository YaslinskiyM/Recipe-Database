const router = require('express').Router();

router.get('/', async (req, res) => {
    console.log('cming here0')
    res.render('homepage', {
      });


});

router.get("/users/home", async (req, res) => {
	try {
		/*
    using req.session.id to grab the user id from the session
    then using that id to find the user in the database
    */
   console.log('req.session.id',req.session.value)
		const data = await User.findByPk(req.session.value, {
			attributes: { exclude: ["password"] },

		});
    //find all recipes create by user
    const recipeData = await Recipe.findAll({
      where: {
        user_id: req.session.value
      }
    })
    console.log(data)
    console.log('recipeData',recipeData[0])
		// Retrieve the user ID from the URL parameters

		//const recipe = req.query.recipe;
		// console.log('recipes in Route',req.query.recipe)
		// Render the user-specific home page and pass the user data to the template
		res.render("homepage", { data , recipeData});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
});
router.get('/login', async (req, res) => {
     res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

module.exports = router;