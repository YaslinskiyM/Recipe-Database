const router = require('express').Router();
const{ User, Favorite, Saved } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        order: ['last_name'],
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    }
    );
});

router.get('/:id', (req, res) => {
    User.findOne({
        where: { id: req.params.id },
        // include: [
        //     {
        //         model: Favorite,
        //         attributes: ['id', 'recipe_id', 'user_id'],
        //         include: {
        //             model: Saved,
        //             attributes: ['id', 'recipe_id', 'user_id']
        //         }
        //     }
        // ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with that id'});
            return;
        }
        res.json(dbUserData);
    }
    )
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }
    );
});

router.post('/', (req, res) => { 
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        login_id: req.body.login_id,
        password: req.body.password
    })
    .then(dbUserData => {
        bcrypt.hash(req.body.password, 10)
            .then(hashedPassword => {
                console.log('Hashed password:', hashedPassword);
                res.json(dbUserData);
            })
            .catch(err => {
                console.log('Password hashing error:', err);
                res.status(500).json(err);
            });
    })
    .catch(err => {
        console.log('User creation error:', err);
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: { login_id: req.body.login_id }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that login id!' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id,
            req.session.login_id = dbUserData.login_id,
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    }
    );
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).end();
        }
        );
    }
    else {
        res.status(404).end();
    }
});

router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: { id: req.params.id }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with that id'});
            return;
        }
        res.json(dbUserData);
    }
    )
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }
    );
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: { id: req.params.id }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with that id'});
            return;
        }
        res.json(dbUserData);
    }
    )
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }
    );
});

module.exports = router;