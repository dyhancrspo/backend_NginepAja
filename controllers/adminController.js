const Category = require("../models/Category");
const Bank = require("../models/Bank");
const Item = require("../models/Item");
const Booking = require("../models/Booking");

const fs = require("fs-extra");
const path = require("path");

module.exports = {
	// Dashboard
	viewDashboard: (req, res) => {
		res.render("admin/dashboard/view_dashboard", {
			title: "Geligeli - Dashboard",
		});
	},

	// Category //
	// View Category
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
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", `danger`);
			res.redirect("/admin/category");
		}
	},
	// Create Category / Add
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
	// Update Category
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
	// Delete Category
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

	// Bank //
	viewBank: async (req, res) => {
		try {
			const bank = await Bank.find();
			const alertMessage = req.flash("alertMessage");
			const alertStatus = req.flash("alertStatus");
			const alert = { message: alertMessage, status: alertStatus };
			res.render("admin/bank/view_bank", {
				bank,
				title: "Geligeli - Bank",
				alert,
			});
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", `danger`);
			res.redirect("/admin/bank");
		}
	},
	// Create Bank / Add
	addBank: async (req, res) => {
		try {
			const { name, bankName, bankNumber } = req.body;
			// console.log(req.file);
			await Bank.create({
				name,
				bankName,
				bankNumber,
				imageUrl: `images/${req.file.filename}`,
			});
			req.flash("alertMessage", "Success Add Bank");
			req.flash("alertStatus", "success");
			res.redirect("/admin/bank");
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", `danger`);
			res.redirect("/admin/bank");
		}
	},
	// Update Bank
	editBank: async (req, res) => {
		try {
			const { id, name, bankName, bankNumber } = req.body;
			const bank = await Bank.findOne({ _id: id });
			if (req.file == undefined) {
				bank.bankName = bankName;
				bank.bankNumber = bankNumber;
				bank.name = name;
				await bank.save();
				req.flash("alertMessage", "Success Update Bank");
				req.flash("alertStatus", "success");
				res.redirect("/admin/bank");
			} else {
				await fs.unlink(path.join(`public/${bank.imageUrl}`));
				bank.bankName = bankName;
				bank.bankNumber = bankNumber;
				bank.name = name;
				bank.imageUrl = `images/${req.file.filename}`;
				await bank.save();
				req.flash("alertMessage", "Success Update Bank");
				req.flash("alertStatus", "success");
				res.redirect("/admin/bank");
			}
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", `danger`);
			res.redirect("/admin/bank");
		}
	},
	// Update Category
	deleteBank: async (req, res) => {
		try {
			const { id } = req.params;
			const bank = await Bank.findOne({ _id: id });
			await fs.unlink(path.join(`public/${bank.imageUrl}`));
			await bank.remove();
			req.flash("alertMessage", "Success Delete Data Bank");
			req.flash("alertStatus", "success");
			res.redirect("/admin/bank");
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", `danger`);
			res.redirect("/admin/bank");
		}
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
