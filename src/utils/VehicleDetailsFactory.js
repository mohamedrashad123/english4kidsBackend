const CarDetailsBuilder = require("../domain/vehicles/details/builders/CarDetailsBuilder");
const VehicleDetailsBuilder = require("../domain/vehicles/details/builders/VehicleDetailsBuilder");

class VehicleDetailsFactory {
	#type;
	constructor(vehicleType) {
		this.#type = vehicleType;
	}

	create() {
		switch (+this.#type) {
			case 1:
				return new CarDetailsBuilder();
				break;
			default:
				return new VehicleDetailsBuilder();
		}
	}
}

module.exports = VehicleDetailsFactory;
