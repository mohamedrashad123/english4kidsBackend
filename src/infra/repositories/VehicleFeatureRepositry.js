const sequelize = require("../orm/sequlize");
const VehicleFeatureRepositry = require("../../domain/vehicles/VehicleFeatureRepositry");

module.exports = class extends VehicleFeatureRepositry {
	#db;
	#model;
	constructor() {
		super();
		this.#db = sequelize;
		this.#model = this.#db.model("option");
	}

	persist = async (vehicleFeatureEntity) => {
		const { vehicle, user, optionId } = vehicleFeatureEntity;

		// create new vehicle
		const newVehicleFeature = await this.#model.create({
			vehicle,
			user,
			optionId,
		});

		// save vehicle to database
		newVehicleFeature.save();

		// return vehicle ID
		return newVehicleFeature.ID;
	};

	getOptionsIdsByVehicleId = async (vehicleId) => {
		const optionsIds = await this.#model.findAll({
			where: { vehicle: vehicleId, status: 1 },
			attributes: ["optionId"],
		});

		return optionsIds;
	};

	getByVehicleId = async (vehicleId, langId) => {
		const optionTitleSubQuery = `(SELECT title FROM vehicle_options_lang WHERE \`option\`=option.optionId AND language=${langId})`;
		const options = await this.#model.findAll({
			where: { vehicle: vehicleId, status: 1 },
			attributes: ["ID", ["optionId", "option"], [sequelize.literal(optionTitleSubQuery), "title"]],
		});

		return options.map((option) => option.dataValues);
	};
};
