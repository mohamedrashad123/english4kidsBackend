const sequelize = require("../orm/sequlize");
const VehicleImageRepositry = require("../../domain/vehicles/VehicleImageRepositry");

module.exports = class extends VehicleImageRepositry {
	#db;
	#model;
	constructor() {
		super();
		this.#db = sequelize;
		this.#model = this.#db.model("vehicleImage");
	}

	persist = async (vehicleImageEntity) => {
		const { vehicle, user, title } = vehicleImageEntity;

		// create new vehicle
		const newVehicleImage = await this.#model.create({
			title,
			vehicle,
			user,
		});

		// save vehicle to database
		newVehicleImage.save();

		// return vehicle ID
		return newVehicleImage.ID;
	};

	getByVehicleId = async (vehicleId) => {
		const images = await this.#model.findAll({
			where: { vehicle: vehicleId },
			attributes: ["ID", "title"],
		});

		return images.map((image) => image.dataValues) || [];
	};
};
