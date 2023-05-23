const {Recipe_steps}= require('../../models');
const router = require('express').Router();

router.post('/', async (req, res) => {
    try {
        const recipeStepsData = await Recipe_steps.create({
            recipe_id: req.body.recipe_id,
            step: req.body.step
        });
        res.status(200).json(recipeStepsData);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
}   );

module.exports = router;

