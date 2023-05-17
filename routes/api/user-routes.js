const router = require("express").Router();
const { User, Favorite, Saved } = require("../../models");

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
				.then((hashedPassword) => {
					console.log("Hashed password:", hashedPassword);
					res.json(dbUserData);
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

//fix the login issue
router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		login_id = username;
		console.log("login_id", login_id);
		// Find the user based on the login_id
		const user = await User.findOne({
			where: { login_id: login_id },
			attributes: [
				"id",
				"first_name",
				"last_name",
				"login_id",
				"password",
			],
		})
        if (!user) {
            res.status(400).json({ message: "No user with that login id!" });
            return;
        }
        //console.log(user.id, ' user_id')
        req.session.save(() => {
            req.session.value = user.id;
            //console.log(req.session.value, 'session_id')
            req.session.loggedIn = true;
            res.json({ user, message: "You are now logged in!" });
        });
			// .then((dbUserData) => {
            //     if (!dbUserData) {
            //         res.status(400).json({ message: "No user with that login id!" });
            //         return;
            //     } else {
            //         res.json(dbUserData)
            //         console.log(dbUserData.id)
            //         req.session.save(() => {
            //             req.session.user_id = dbUserData.id;
            //             req.session.loggedIn = true;})
            //         res.json({ user, message: "You are now logged in!" });
            //     }
            // })
			// .then((data) => {
			// 	if (!data) {
			// 		// If user doesn't exist, return an error response
			// 		return res
			// 			.status(400)
			// 			.json({ message: "No user with that login id!" });
			// 	} else {
			// 		console.log(data);
			// 		req.session.id = data.id;
			// 		req.session.loggedIn = true;
			// 		req.session.save();
            //         
			// 	}
			// });
		// const userData= dbUserDatajson()
		//console.log('user',user)

		// Check if the password is correct- we have to add here

		// we should fix the session issue

		// Set the session properties and save

		//req.session.login_id = user.login_id;

		// Return a success response
		
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

router.post("/logout", (req, res) => {
	if (req.session.loggedIn) {
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
