const Category = require("../models/Category");
const Bank = require("../models/Bank");
const Item = require("../models/Item");
const Booking = require("../models/Booking");

module.exports = {
	// Dashboard
	viewDashboard: (req, res) => {
		res.render("admin/dashboard/view_dashboard", {
			title: "Geligeli - Dashboard",
		});
	},

	// Category
	viewCategory: async (req, res) => {
		try {
			const category = await Category.find();
			const alertMessage = req.flash("alertMessage");
			const alertStatus = req.flash("alertStatus");
			const alert = { message: alertMessage, status: alertStatus };
			res.render("admin/category/view_category", {
				category,
				alert,
				title: "Geligeli - Category",
			});
		} catch (error) {}
		req.flash("alertMessage", `${error.message}`);
		req.flash("alertStatus", `danger`);
		res.redirect("/admin/category");
	},
	addCategory: async (req, res) => {
		try {
			const { name } = req.body;
			await Category.create({ name });
			req.flash("alertMessage", "Success Add Category");
			req.flash("alertStatus", "success");
			res.redirect("/admin/category");
		} catch (error) {}
		req.flash("alertMessage", `${error.message}`);
		req.flash("alertStatus", `danger`);
		res.redirect("/admin/category");
	},
	editCategory: async (req, res) => {
		try {
			const { id, name } = req.body;
			const category = await Category.findOne({ _id: id });
			category.name = name;
			await category.save();
			req.flash("alertMessage", "Success Update Category");
			req.flash("alertStatus", "success");
			res.redirect("/admin/category");
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", `danger`);
			res.redirect("/admin/category");
		}
	},
	deleteCategory: async (req, res) => {
		try {
			const { id } = req.params;
			const category = await Category.findOne({ _id: id });
			await category.remove();
			req.flash("alertMessage", "Success Delete Category");
			req.flash("alertStatus", "success");
			res.redirect("/admin/category");
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", `danger`);
			res.redirect("/admin/category");
		}
	},

	// Bank
	viewBank: (req, res) => {
		try {
			const alertMessage = req.flash("alertMessage");
			const alertStatus = req.flash("alertStatus");
			const alert = { message: alertMessage, status: alertStatus };
			res.render("admin/bank/view_bank", {
				title: "Geligeli - Bank",
				alert,
			});
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", `danger`);
			res.redirect("/admin/category");
		}
	},
	addBank: async (req, res) => {
		try {
			const { name, bankName, bankNumber } = req.body;
			await Bank.create({ name });
			req.flash("alertMessage", "Success Add Category");
			req.flash("alertStatus", "success");
			res.redirect("/admin/category");
		} catch (error) {}
		req.flash("alertMessage", `${error.message}`);
		req.flash("alertStatus", `danger`);
		res.redirect("/admin/category");
	},

	// Item
	viewItem: (req, res) => {
		res.render("admin/item/view_item", {
			title: "Geligeli - Item",
		});
	},

	// Booking
	viewBooking: (req, res) => {
		res.render("admin/booking/view_booking", {
			title: "Geligeli - Booking",
		});
	},
};
