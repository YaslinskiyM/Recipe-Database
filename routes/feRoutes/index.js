const router = require('express').Router();

router.get('/', async (req, res) => {
    console.log('cming here0')
    res.render('users', {
      });


});


router.get('/home', async (req, res) => {
    console.log('cming here0')
    res.render('homepage', {
      });


});


router.get('/signUp', async (req, res) => {
    console.log('cming here0')
    res.render('login', {
      });


});

module.exports = router;