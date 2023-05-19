const router = require("express").Router();
const { User, Favorite, Saved } = require("../../models");
const bcrypt = require('bcrypt');

router.get("/", (req, res) => {
	User.findAll({
		order: ["last_name"],
	})
		.then((dbUserData) => res.json(dbUserData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get("/:id", (req, res) => {
	User.findOne({
		where: { id: req.params.id },
		include: [
		    {
		        model: Favorite,
		        attributes: ['id', 'recipe_id', 'user_id'],
		        include: {
		            model: Saved,
		            attributes: ['id', 'recipe_id', 'user_id']
		        }
		    }
		]
	})
		.then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({ message: "No user found with that id" });
				return;
			}
			res.json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post("/", (req, res) => {
	User.create({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		login_id: req.body.login_id,
		password: req.body.password,
	})
		.then((dbUserData) => {
			bcrypt
				.hash(req.body.password, 10)
				.then(() => {		
					req.session.save(() => {
						req.session.logged_in = true;
					  });
				  	res.json({ user: dbUserData, message: 'You are now logged in!' });
				})
				.catch((err) => {
					console.log("Password hashing error:", err);
					res.status(500).json(err);
				});
		})
		.catch((err) => {
			console.log("User creation error:", err);
			res.status(500).json(err);
		});
});



router.post('/login', async (req, res) => {
    try {
        console.log(req.body);
      const userData = await User.findOne({ where: { login_id: req.body.login_id } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.value = userData.id
        req.session.logged_in = true;
        console.log('userData in login',userData)
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  

router.post("/logout", (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(200).end();
		});
	} else {
		res.status(404).end();
	}
});

router.put("/:id", (req, res) => {
	User.update(req.body, {
		individualHooks: true,
		where: { id: req.params.id },
	})
		.then((dbUserData) => {
			if (!dbUserData[0]) {
				res.status(404).json({ message: "No user found with that id" });
				return;
			}
			res.json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.delete("/:id", (req, res) => {
	User.destroy({
		where: { id: req.params.id },
	})
		.then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({ message: "No user found with that id" });
				return;
			}
			res.json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});


module.exports = router;
