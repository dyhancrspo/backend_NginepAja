const Item = require("../models/Item");
const Treasure = require("../models/Activity");
const Traveler = require("../models/Booking");
const Category = require("../models/Category");
const Bank = require("../models/Bank");
const Booking = require("../models/Booking");
const Member = require("../models/Member");

module.exports = {
	landingPage: async (req, res) => {
		try {
			// MostPicked
			const mostPicked = await Item.find()
				.select("_id title price unit city country imageId")
				.limit(5)
				.populate({
					path: "imageId",
					select: "_id imageUrl",
				});

			// Hero
			const traveler = await Traveler.find();
			const treasure = await Treasure.find();
			const city = await Item.find();

			// Categories
			const categories = await Category.find()
				.select("_id name")
				.limit(3)
				.populate({
					path: "itemId",
					select: "_id tittle imageId country city isPopular",
					perDocumentLimit: 4,
					option: { sort: { sumBooking: -1 } },
					populate: {
						path: "imageId",
						select: "_id imageUrl",
						perDocumentLimit: 1,
					},
				});
			// isPopular Function
			for (let i = 0; i < categories.length; i++) {
				for (let x = 0; x < categories[i].itemId.length; x++) {
					const item = await Item.findOne({ _id: categories[i].itemId[x]._id });
					item.isPopular = false;
					await item.save();
					if (categories[i].itemId[0] === categories[i].itemId[x]) {
						item.isPopular = true;
						await item.save();
					}
				}
			}

			// Testimonials
			const testimonial = {
				_id: "asd1293uasdads1",
				imageUrl: "images/testimonial1.jpg",
				name: "Happy Couple",
				rate: 4.55,
				content:
					"What a great trip with my lover and I should try again next time soon ...",
				familyName: "Dyhan Haqnas",
				familyOccupation: "Product Designer",
			};

			// JSON
			res.status(200).json({
				hero: {
					travelers: traveler.length,
					treasures: treasure.length,
					cities: city.length,
				},
				mostPicked,
				categories,
				testimonial,
			});
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error!" });
		}
	},
	detailPage: async (req, res) => {
		try {
			// Item
			const { id } = req.params;
			const item = await Item.findOne({ _id: id })
				.populate({ path: "featureId", select: "id name qty imageUrl" })
				.populate({ path: "activityId", select: "id name type imageUrl" })
				.populate({ path: "imageId", select: "id imageUrl" });

			// Bank
			const bank = await Bank.find();

			// Testimonials
			const testimonial = {
				_id: "asd1293uasdads1",
				imageUrl: "images/testimonial2.jpg",
				name: "Super Family",
				rate: 4.35,
				content:
					"What a great trip with my lover and I should try again next time soon ...",
				familyName: "Ismail bin Mail",
				familyOccupation: "CEO Ayam Goreng Si Mail",
			};

			//
			res.status(200).json({
				...item._doc,
				bank,
				testimonial,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Internal Server Error!" });
		}
	},

	bookingPage: async (req, res) => {
		const {
			idItem,
			duration,
			// price,
			bookingStartDate,
			bookingEndDate,
			firstName,
			lastName,
			email,
			phoneNumber,
			accountHolder,
			bankFrom,
		} = req.body;

		if (!req.file) {
			return res.status(404).json({ message: "Image not Found!" });
		}

		console.log(idItem);

		if (
			idItem === undefined ||
			duration === undefined ||
			// price === undefined ||
			bookingStartDate === undefined ||
			bookingEndDate === undefined ||
			firstName === undefined ||
			lastName === undefined ||
			email === undefined ||
			phoneNumber === undefined ||
			accountHolder === undefined ||
			bankFrom === undefined
		) {
			res.status(404).json({ message: "Plesea fill all field!" });
		}

		const item = await Item.findOne({ _id: idItem });

		if (!item) {
			return res.status(404).json({ message: "Item not Found!" });
		}

		item.sumBooking += 1;

		await item.save();

		let total = item.price * duration;
		let tax = total * 0.1;

		const invoice = Math.floor(1000000 + Math.random() * 9000000);

		const member = await Member.create({
			firstName,
			lastName,
			email,
			phoneNumber,
		});

		const newBooking = {
			invoice,
			bookingStartDate,
			bookingEndDate,
			total: (total += tax),
			itemId: {
				_id: item.id,
				title: item.title,
				price: item.price,
				duration: duration,
			},
			memberId: member.id,
			payments: {
				proofPayment: `images/${req.file.filename}`,
				bankFrom: bankFrom,
				accountHolder: accountHolder,
			},
		};

		const booking = await Booking.create(newBooking);

		res.status(201).json({ message: "Success Booking", booking });
	},
};
