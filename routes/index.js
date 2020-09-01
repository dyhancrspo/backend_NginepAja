var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	// res.render("index", { title: "Geli-geli" });
	res.redirect("/admin/signin");
});

module.exports = router;
