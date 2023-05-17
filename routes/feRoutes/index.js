const router = require('express').Router();

router.get('/', async (req, res) => {
    console.log('cming here0')
    res.render('homepage', {
      });


});

router.get('/users/:firstName/home', async (req, res) => {
  try {
    // Retrieve the user ID from the URL parameters
    const firstName = req.params.firstName;
    //const recipe = req.query.recipe;
   // console.log('recipes in Route',req.query.recipe)
    // Render the user-specific home page and pass the user data to the template
    res.render('homepage', { firstName});

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

router.get('/login', async (req, res) => {
     res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

module.exports = router;