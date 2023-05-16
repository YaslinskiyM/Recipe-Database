const router = require('express').Router();

router.get('/users', async (req, res) => {
    console.log('cming here')
    res.render('users', {
      });


});

module.exports = router;