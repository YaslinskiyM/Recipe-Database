const router = require('express').Router();

router.get('/', async (req, res) => {
    console.log('cming here0')
    res.render('users', {
      });


});

router.get('/users/:firstName/home', async (req, res) => {
  try {
    // Retrieve the user ID from the URL parameters
    const firstName = req.params.firstName;

    // Fetch the user data based on the user ID
   
  

    // Render the user-specific home page and pass the user data to the template
    res.render('homepage', { firstName });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

router.get('/signUp', async (req, res) => {
    console.log('cming here2')
    res.render('login', {
      });


});

module.exports = router;