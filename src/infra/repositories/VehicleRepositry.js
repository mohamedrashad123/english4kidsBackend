const sequelize = require("../orm/sequlize");
const VehicleRepositry = require("../../domain/vehicles/VehicleRepositry");

module.exports = class extends VehicleRepositry {
	#db;
	#model;
	#userModel;
	constructor() {
		super();
		this.#db = sequelize;
		this.#model = this.#db.model("vehicle");
		this.#userModel = this.#db.model("user");
	}

	persist = async (vehicleEntity) => {
		const {
			vehicle_type,
			modelTitle,
			vehicle_engine,
			vehicle_gear,
			location_city,
			vehicle_color,
			vehicle_kilo,
			hands_num,
			vehicle_license,
			license_expired: expirydate,
			priceVisibility,
			vehicle_price: price,
			vehicle_price_type,
			priceDiscount: discount,
			vehicleId,
			user,
		} = vehicleEntity;

		// set vehicle status
		let vehicle_status = null;
		const currentYear = new Date().getFullYear();
		const modelChecker = +modelTitle == currentYear || currentYear - +modelTitle == 1;

		if (vehicle_kilo == 0 && hands_num == 0 && modelChecker) vehicle_status = 1;
		else vehicle_status = 2;

		// set expirydate
		const license_expired = vehicle_license == 1 ? expirydate : null;

		// set price and price discount
		const vehicle_price = priceVisibility ? price : null;
		const priceDiscount = priceVisibility && discount ? discount : null;

		// create new vehicle
		const newVehicle = await this.#model.create({
			vehicle_type,
			vehicle_engine,
			vehicle_gear,
			location_city,
			vehicle_color,
			vehicle_kilo,
			hands_num,
			vehicle_status,
			vehicle_license,
			license_expired,
			priceVisibility,
			vehicle_price,
			vehicle_price_type,
			priceDiscount,
			vehicleId,
			user,
		});

		// save vehicle to database
		newVehicle.save();

		// return vehicle ID
		return newVehicle.ID;
	};

	async getById(vehicleId, langId = 1, userId) {
		const colorSubQuery = `(SELECT IFNULL(title, "") FROM vehicle_color WHERE ID=vehicle.vehicle_color)`;
		const engineSizeSubQuery = `(SELECT IFNULL(title, "") FROM vehicle_engine_size WHERE ID=vehicle.vehicle_engine)`;
		const isOwnerSubQuery = `(SELECT COUNT(ID) FROM vehicle WHERE vehicle.ID=${vehicleId} AND vehicle.user=${userId})`;
		const vehicleTypeSubQuery = `(SELECT title FROM vehicle_type_lang WHERE language=${langId} AND type=vehicle.vehicle_type)`;
		const colorCodeSubQuery = `(SELECT IFNULL(REPLACE(colorCode, '#', ''), "") FROM vehicle_color WHERE ID=vehicle.vehicle_color)`;
		const isFavouriteSubQuery = `(SELECT COUNT(ID) FROM bookmarks WHERE bookmarks.vehicle=${vehicleId} AND bookmarks.user=${userId})`;
		const gearTypeSubQuery = `(SELECT IFNULL(title, "") FROM vehicle_gear_lang WHERE gear=vehicle.vehicle_gear AND language=${langId})`;
		const locationSubQuery = `(SELECT IFNULL(title, "") FROM location_city_lang WHERE city=vehicle.location_city AND language=${langId})`;
		const vehicleStatusSubQuery = `(SELECT title FROM vehicle_status_lang WHERE language=${langId} AND vehicle_status=vehicle.vehicle_status)`;
		const licenseSubQuery = `(SELECT IFNULL(title, "") FROM vehicle_license_lang WHERE vehicle_license=vehicle.vehicle_license AND language=${langId})`;
		const priceTypeSubQuery = `(SELECT IFNULL(title, "") FROM vehicle_price_type_lang WHERE language=${langId} AND price_type=vehicle.vehicle_price_type)`;
		const engineTypeSubQuery = `(SELECT IFNULL(title, '') FROM vehicle_engine_type_lang WHERE language=${langId} AND engine_type=vehicle.vehicle_engine_type)`;

		const vehicleDetails = await this.#model.findByPk(vehicleId, {
			attributes: [
				"ID",
				"vehicleId",
				"priceDiscount",
				"priceVisibility",
				"enabled",
				["vehicle_price", "price"],
				["vehicle_type", "vehicleTypeId"],
				["hands_num", "handsCount"],
				["vehicle_kilo", "distance"],
				["IFNULL(vehicle.license_expired, '')", "expiryDate"],
				[sequelize.literal(vehicleTypeSubQuery), "vehicleType"],
				[sequelize.literal(colorSubQuery), "color"],
				[sequelize.literal(colorCodeSubQuery), "colorCode"],
				[sequelize.literal(priceTypeSubQuery), "priceType"],
				[sequelize.literal(gearTypeSubQuery), "gearType"],
				[sequelize.literal(locationSubQuery), "location"],
				[sequelize.literal(vehicleStatusSubQuery), "vehicleStatus"],
				[sequelize.literal(isOwnerSubQuery), "owner"],
				[sequelize.literal(isFavouriteSubQuery), "favourite"],
				[sequelize.literal(engineSizeSubQuery), "engineSize"],
				[sequelize.literal(engineTypeSubQuery), "engineType"],
				[sequelize.literal(licenseSubQuery), "license"],
			],
			include: {
				model: this.#userModel,
				as: "users",
				attributes: ["phone"],
			},
		});

		return vehicleDetails;
	}
};
