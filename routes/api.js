const router = require("express").Router();
const apiController = require("../controllers/apiController");
const { uploadSingle } = require("../middlewares/multer");

// Endpoint Landing Page
router.get("/landing-page", apiController.landingPage);
// Endpoint Detail Pge
router.get("/detail-page/:id", apiController.detailPage);
// Endpoint Detail Pge
router.post("/booking-page", uploadSingle, apiController.bookingPage);

module.exports = router;
