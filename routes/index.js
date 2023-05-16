const router = require('express').Router();
const apiRoutes = require('./api');
const feRoutes=require('./feRoutes')

router.use('/api', apiRoutes);

router.use(feRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;