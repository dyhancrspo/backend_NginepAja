const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.get("/dashboard", adminController.viewDashboard);

// Category
router.get("/category", adminController.viewCategory);
router.post("/category", adminController.addCategory);
router.put("/category", adminController.editCategory);
router.delete("/category/:id", adminController.deleteCategory);

// Bank
router.get("/bank", adminController.viewBank);

// Item
router.get("/item", adminController.viewItem);

// Booking
router.get("/booking", adminController.viewBooking);

module.exports = router;
