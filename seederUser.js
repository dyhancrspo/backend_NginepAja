var seeder = require("mongoose-seed");
var mongoose = require("mongoose");

// Connect to MongoDB via Mongoose
seeder.connect(
	"mongodb://localhost/db_nginepaja",
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true,
		useUnifiedTopology: true,
	},
	function () {
		// Load Mongoose models
		seeder.loadModels(["./models/Users"]);

		// Clear specified collections
		seeder.clearModels(["Users"], function () {
			// Callback to populate DB once collections have been cleared
			seeder.populateModels(data, function () {
				seeder.disconnect();
			});
		});
	},
);

var data = [
	// start category

	{
		model: "Users",
		documents: [
			{
				_id: mongoose.Types.ObjectId("5e96cbe292b97300fc909952"),
				username: "geligeli",
				password: "rahasia",
			},
			{
				_id: mongoose.Types.ObjectId("5e96cbe292b97300fc904463"),
				username: "admin",
				password: "rahasia",
			},
		],
	},
];
