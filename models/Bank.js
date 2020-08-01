const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
	bankName: {
		type: String,
		required: true,
	},
	bankNumber: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
	},
});

module.exports = mongoose.model("Bank", bankSchema);
