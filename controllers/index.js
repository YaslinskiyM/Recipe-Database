const router = require('express').Router();
const homeRoutes = require('./homeRoutes.js');
const signUpRoutes = require('./signUpRoutes.js');


router.use('/', homeRoutes);
// router.use('/api', apiRoutes);
router.use('/signup', signUpRoutes);

module.exports = router;